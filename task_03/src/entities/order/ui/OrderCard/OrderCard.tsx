import { type FC, memo, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useUpdateOrderStatusMutation } from 'entities/order/api';
import { type Order } from 'entities/order/model/types';
import { OrderStatus, StationType } from 'shared/types/domain';
import {
	ActionButtonStyled,
	CardFooterStyled,
	CardHeaderStyled,
	CardStyled,
	ItemsListStyled,
	ItemStyled,
	OrderNumberStyled,
	QtyStyled,
	StationBadgeStyled,
	WaitTimeStyled,
} from './OrderCard.styles';

interface Props {
	order: Order;
}

type UrgencyLevel = 'low' | 'medium' | 'high';

export const MILLISECONDS_PER_MINUTE = 60_000;
const TIMER_REFRESH_INTERVAL_MS = 30_000;
const WARN_THRESHOLD_MINUTES = 5;
const ALERT_THRESHOLD_MINUTES = 10;

const STATION_LABELS: Record<StationType, string> = {
	[StationType.Pizza]: '🍕 Пицца',
	[StationType.Drinks]: '🥤 Напитки',
	[StationType.Desserts]: '🍰 Десерты',
};

const STATUS_NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
	[OrderStatus.New]: OrderStatus.InProgress,
	[OrderStatus.InProgress]: OrderStatus.Ready,
};

const STATUS_NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
	[OrderStatus.New]: 'Взять в работу',
	[OrderStatus.InProgress]: 'Готово',
};

const TOAST_ERROR_PREFIX = 'Не удалось обновить статус заказа';

const getWaitMinutes = (createdAt: string): number =>
	(Date.now() - new Date(createdAt).getTime()) / MILLISECONDS_PER_MINUTE;

const getUrgency = (minutes: number): UrgencyLevel => {
	if (minutes < WARN_THRESHOLD_MINUTES) {
		return 'low';
	}
	if (minutes < ALERT_THRESHOLD_MINUTES) {
		return 'medium';
	}

	return 'high';
};

const formatWaitTime = (minutes: number): string => `⏱ ${minutes} мин`;
const formatQuantity = (quantity: number): string => `×${quantity}`;

export const OrderCard: FC<Props> = memo(({ order }) => {
	// eslint-disable-next-line no-console
	console.log(`[OrderCard] render — order=${order.orderNumber} status=${order.status}`);

	const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();
	const [waitMinutes, setWaitMinutes] = useState(getWaitMinutes(order.createdAt));

	useEffect(() => {
		const id = setInterval(() => setWaitMinutes(getWaitMinutes(order.createdAt)), TIMER_REFRESH_INTERVAL_MS);

		return () => clearInterval(id);
	}, [order.createdAt]);

	const nextStatus = STATUS_NEXT[order.status];
	const nextLabel = STATUS_NEXT_LABEL[order.status];

	const handleAction = async (): Promise<void> => {
		if (nextStatus === undefined) {
			return;
		}
		try {
			await updateStatus({ id: order.id, status: nextStatus }).unwrap();
		} catch {
			toast.error(`${TOAST_ERROR_PREFIX} ${order.orderNumber}`);
		}
	};

	const urgency = getUrgency(waitMinutes);
	const displayMinutes = Math.floor(waitMinutes);

	return (
		<CardStyled $urgency={urgency}>
			<CardHeaderStyled>
				<OrderNumberStyled>{order.orderNumber}</OrderNumberStyled>
				<StationBadgeStyled>{STATION_LABELS[order.station]}</StationBadgeStyled>
			</CardHeaderStyled>

			<ItemsListStyled>
				{order.items.map(item => (
					<ItemStyled key={item.name}>
						<span>{item.name}</span>
						<QtyStyled>{formatQuantity(item.quantity)}</QtyStyled>
					</ItemStyled>
				))}
			</ItemsListStyled>

			<CardFooterStyled>
				<WaitTimeStyled $urgency={urgency}>{formatWaitTime(displayMinutes)}</WaitTimeStyled>
				{nextStatus !== undefined && (
					<ActionButtonStyled onClick={handleAction} disabled={isLoading}>
						{isLoading ? '...' : nextLabel}
					</ActionButtonStyled>
				)}
			</CardFooterStyled>
		</CardStyled>
	);
});
