import { type FC } from 'react';

import { useGetOrdersQuery } from 'entities/order/api';
import { selectOrdersByStation } from 'entities/order/model/selectors';
import { type Order } from 'entities/order/model/types';
import { OrderCard } from 'entities/order/ui/OrderCard';
import { useAppSelector } from 'shared/store/hooks';
import { OrderStatus } from 'shared/types/domain';
import {
	BoardStyled,
	CardsListStyled,
	ColumnCountStyled,
	ColumnHeaderStyled,
	ColumnStyled,
	ColumnTitleStyled,
	EmptyHintStyled,
	ErrorMessageStyled,
	MessageStyled,
} from './KanbanBoard.styles';

const POLLING_INTERVAL_MS = 10_000;

const COLUMNS: Array<{ status: OrderStatus; label: string }> = [
	{ status: OrderStatus.New, label: '🆕 Новые' },
	{ status: OrderStatus.InProgress, label: '👨‍🍳 В работе' },
	{ status: OrderStatus.Ready, label: '✅ Готово' },
];

const LOADING_TEXT = 'Загрузка заказов...';
const ERROR_TEXT = '⚠️ Не удалось загрузить заказы. Проверьте соединение с сервером.';
const EMPTY_TEXT = 'Нет заказов';

export const KanbanBoard: FC = () => {
	// eslint-disable-next-line no-console
	console.log('[KanbanBoard] render');

	const { isLoading, isError } = useGetOrdersQuery(undefined, {
		pollingInterval: POLLING_INTERVAL_MS,
		skipPollingIfUnfocused: true,
	});

	const selectedStation = useAppSelector(state => state.stationFilter.selectedStation);
	const showReadyOrders = useAppSelector(state => state.stationFilter.showReadyOrders);

	const orders = useAppSelector(state => selectOrdersByStation(state, selectedStation));

	if (isLoading) {
		return <MessageStyled>{LOADING_TEXT}</MessageStyled>;
	}
	if (isError) {
		return <ErrorMessageStyled>{ERROR_TEXT}</ErrorMessageStyled>;
	}

	const visibleColumns = showReadyOrders ? COLUMNS : COLUMNS.filter(c => c.status !== OrderStatus.Ready);

	const getColumnOrders = (status: OrderStatus): Order[] => orders.filter(o => o.status === status);

	return (
		<BoardStyled>
			{visibleColumns.map(({ status, label }) => {
				const columnOrders = getColumnOrders(status);

				return (
					<ColumnStyled key={status}>
						<ColumnHeaderStyled>
							<ColumnTitleStyled>{label}</ColumnTitleStyled>
							<ColumnCountStyled>{columnOrders.length}</ColumnCountStyled>
						</ColumnHeaderStyled>
						<CardsListStyled>
							{columnOrders.length === 0 ? (
								<EmptyHintStyled>{EMPTY_TEXT}</EmptyHintStyled>
							) : (
								columnOrders.map(order => <OrderCard key={order.id} order={order} />)
							)}
						</CardsListStyled>
					</ColumnStyled>
				);
			})}
		</BoardStyled>
	);
};
