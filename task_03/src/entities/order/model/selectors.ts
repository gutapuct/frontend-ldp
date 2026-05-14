import { createSelector } from '@reduxjs/toolkit';

import { type Order } from 'entities/order/model/types';
import { MILLISECONDS_PER_MINUTE } from 'entities/order/ui/OrderCard/OrderCard';
import { OrderStatus, type StationType } from 'shared/types/domain';

// Старые заказы сверху
export const selectSortedOrders = (orders: Order[]): Order[] =>
	[...orders].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

export const selectOrdersByStation = createSelector(
	(orders: Order[]) => orders,
	(_orders: Order[], station: StationType | 'all') => station,
	(orders, station) => (station === 'all' ? orders : orders.filter(o => o.station === station)),
);

export const selectOrderCountsByStatus = createSelector(
	(orders: Order[]) => orders,
	orders => ({
		new: orders.filter(o => o.status === OrderStatus.New).length,
		inProgress: orders.filter(o => o.status === OrderStatus.InProgress).length,
		ready: orders.filter(o => o.status === OrderStatus.Ready).length,
	}),
);

export const selectAverageCookTimeToday = createSelector(
	(orders: Order[]) => orders,
	orders => {
		const todayStr = new Date().toDateString();

		const readyToday = orders.filter(
			o =>
				o.status === OrderStatus.Ready &&
				o.updatedAt !== null &&
				new Date(o.createdAt).toDateString() === todayStr,
		);

		if (readyToday.length === 0) {
			return 0;
		}

		const totalMinutes = readyToday.reduce((sum, o) => {
			const start = new Date(o.createdAt).getTime();
			const end = new Date(o.updatedAt!).getTime();

			return sum + (end - start) / MILLISECONDS_PER_MINUTE;
		}, 0);

		return Math.round(totalMinutes / readyToday.length);
	},
);
