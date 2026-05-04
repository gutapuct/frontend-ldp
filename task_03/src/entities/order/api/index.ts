import { type Order } from 'entities/order/model/types';
import { baseApi } from 'shared/api/baseApi';
import { type OrderStatus, type StationType } from 'shared/types/domain';

interface GetOrdersParams {
	station?: StationType;
	status?: OrderStatus;
}

interface UpdateOrderStatusParams {
	id: string;
	status: OrderStatus;
}

interface CreateOrderParams {
	station: StationType;
	items: Array<{ name: string; quantity: number }>;
}

export const ordersApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getOrders: build.query<Order[], GetOrdersParams | void>({
			query: params => ({
				url: '/api/orders',
				params: params ?? {},
			}),
			providesTags: result =>
				result
					? [...result.map(({ id }) => ({ type: 'Order' as const, id })), { type: 'Order', id: 'LIST' }]
					: [{ type: 'Order', id: 'LIST' }],
		}),

		getOrderById: build.query<Order, string>({
			query: id => `/api/orders/${id}`,
			providesTags: (_result, _err, id) => [{ type: 'Order', id }],
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

		createOrder: build.mutation<Order, CreateOrderParams>({
			query: body => ({
				url: '/api/orders',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Order', id: 'LIST' }],
		}),

		deleteOrder: build.mutation<void, string>({
			query: id => ({
				url: `/api/orders/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_result, _err, id) => [
				{ type: 'Order', id },
				{ type: 'Order', id: 'LIST' },
			],
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useGetOrderByIdQuery,
	useUpdateOrderStatusMutation,
	useCreateOrderMutation,
	useDeleteOrderMutation,
} = ordersApi;
