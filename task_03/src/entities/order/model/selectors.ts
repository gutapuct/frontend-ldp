import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from 'app/store';
import { ordersAdapter } from 'entities/order/model/ordersSlice';
import { OrderStatus, type StationType } from 'shared/types/domain';

const ordersSelectors = ordersAdapter.getSelectors((state: RootState) => state.orders);
const MINUTE = 60_000;

export const { selectAll: selectAllOrders, selectById: selectOrderById } = ordersSelectors;

/**
 * Заказы конкретной станции (или все, если 'all').
 * Принимает station параметром — entity не зависит от uiSlice.
 */
export const selectOrdersByStation = createSelector(
	[ordersSelectors.selectAll, (_state: RootState, station: StationType | 'all') => station],
	(orders, station) => (station === 'all' ? orders : orders.filter(o => o.station === station)),
);

/** Количество заказов по каждому статусу */
export const selectOrderCountsByStatus = createSelector(ordersSelectors.selectAll, orders => ({
	new: orders.filter(o => o.status === OrderStatus.New).length,
	inProgress: orders.filter(o => o.status === OrderStatus.InProgress).length,
	ready: orders.filter(o => o.status === OrderStatus.Ready).length,
}));

/**
 * Среднее время приготовления (в минутах) по заказам со статусом Ready,
 * созданным сегодня.
 */
export const selectAverageCookTimeToday = createSelector(ordersSelectors.selectAll, orders => {
	const todayStr = new Date().toDateString();

	const readyToday = orders.filter(
		o =>
			o.status === OrderStatus.Ready && o.updatedAt !== null && new Date(o.createdAt).toDateString() === todayStr,
	);

	if (readyToday.length === 0) {
		return 0;
	}

	const totalMinutes = readyToday.reduce((sum, o) => {
		const start = new Date(o.createdAt).getTime();
		const end = new Date(o.updatedAt!).getTime();

		return sum + (end - start) / MINUTE;
	}, 0);

	return Math.round(totalMinutes / readyToday.length);
});
