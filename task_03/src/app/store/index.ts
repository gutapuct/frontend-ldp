import { configureStore } from '@reduxjs/toolkit';

import { ordersReducer } from 'entities/order/model/ordersSlice';
import { stationFilterReducer } from 'features/stationFilter/model/slice';
import { baseApi } from 'shared/api/baseApi';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		orders: ordersReducer,
		stationFilter: stationFilterReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
