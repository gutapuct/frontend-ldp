import { configureStore } from '@reduxjs/toolkit';

import { ordersApi } from 'entities/order/api';
import { ordersReducer } from 'entities/order/model/ordersSlice';
import { stationFilterReducer } from 'features/stationFilter/model/slice';

export const store = configureStore({
	reducer: {
		[ordersApi.reducerPath]: ordersApi.reducer,
		orders: ordersReducer,
		stationFilter: stationFilterReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
