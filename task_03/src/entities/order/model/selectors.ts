import { createSelector, type EntityState } from '@reduxjs/toolkit';

import { ordersAdapter } from 'entities/order/model/ordersSlice';
import { type Order } from 'entities/order/model/types';
import { MILLISECONDS_PER_MINUTE } from 'entities/order/ui/OrderCard/OrderCard';
import { OrderStatus, type StationType } from 'shared/types/domain';

type OrdersStateShape = { orders: EntityState<Order, string> };

const ordersSelectors = ordersAdapter.getSelectors((state: OrdersStateShape) => state.orders);

export const { selectAll: selectAllOrders, selectById: selectOrderById } = ordersSelectors;

/**
 * Заказы конкретной станции (или все, если 'all').
 * Принимает station параметром — entity не зависит от uiSlice.
 */
export const selectOrdersByStation = createSelector(
	[ordersSelectors.selectAll, (_state: OrdersStateShape, station: StationType | 'all') => station],
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

		return sum + (end - start) / MILLISECONDS_PER_MINUTE;
	}, 0);

	return Math.round(totalMinutes / readyToday.length);
});
