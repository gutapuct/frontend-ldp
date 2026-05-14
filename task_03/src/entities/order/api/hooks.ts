import { useGetOrdersQuery } from 'entities/order/api';

const ORDERS_POLLING_INTERVAL_MS = 10_000;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useOrders = () =>
	useGetOrdersQuery(undefined, {
		pollingInterval: ORDERS_POLLING_INTERVAL_MS,
		skipPollingIfUnfocused: true,
	});
