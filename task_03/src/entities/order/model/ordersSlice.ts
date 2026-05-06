import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { ordersApi } from 'entities/order/api';
import { type Order } from 'entities/order/model/types';

// Старые заказы сверху — повар сначала берёт то, что пришло раньше
export const ordersAdapter = createEntityAdapter<Order>({
	sortComparer: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
});

const ordersSlice = createSlice({
	name: 'orders',
	initialState: ordersAdapter.getInitialState(),
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(ordersApi.endpoints.getOrders.matchFulfilled, (state, { payload }) => {
			for (const incoming of payload) {
				const existing: Order | undefined = state.entities[incoming.id];

				if (
					// eslint-disable-next-line
					existing === undefined ||
					existing.status !== incoming.status ||
					existing.updatedAt !== incoming.updatedAt
				) {
					ordersAdapter.upsertOne(state, incoming);
				}
			}
		});
	},
});

export const ordersReducer = ordersSlice.reducer;
