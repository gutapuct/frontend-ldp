import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type Order } from 'entities/order/model/types';
import { type OrderStatus, type StationType } from 'shared/types/domain';

interface GetOrdersParams {
	station?: StationType;
	status?: OrderStatus;
}

interface UpdateOrderStatusParams {
	id: string;
	status: OrderStatus;
}

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5102' }),
	tagTypes: ['Order'],
	endpoints: build => ({
		getOrders: build.query<Order[], GetOrdersParams | undefined>({
			query: params => ({ url: '/api/orders', params }),
			providesTags: result =>
				result
					? [...result.map(({ id }) => ({ type: 'Order' as const, id })), { type: 'Order', id: 'LIST' }]
					: [{ type: 'Order', id: 'LIST' }],
		}),

		updateOrderStatus: build.mutation<Order, UpdateOrderStatusParams>({
			query: ({ id, status }) => ({
				url: `/api/orders/${id}/status`,
				method: 'PATCH',
				body: { status },
			}),
			invalidatesTags: (_result, _err, { id }) => [
				{ type: 'Order', id },
				{ type: 'Order', id: 'LIST' },
			],
		}),
	}),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation } = ordersApi;
