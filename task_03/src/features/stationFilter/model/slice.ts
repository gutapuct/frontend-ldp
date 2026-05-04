import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type StationType } from 'shared/types/domain';

interface StationFilterState {
	selectedStation: StationType | 'all';
	showReadyOrders: boolean;
}

const initialState: StationFilterState = {
	selectedStation: 'all',
	showReadyOrders: true,
};

const stationFilterSlice = createSlice({
	name: 'stationFilter',
	initialState,
	reducers: {
		setSelectedStation: (state, action: PayloadAction<StationType | 'all'>) => {
			state.selectedStation = action.payload;
		},
		toggleShowReadyOrders: state => {
			state.showReadyOrders = !state.showReadyOrders;
		},
	},
});

export const { setSelectedStation, toggleShowReadyOrders } = stationFilterSlice.actions;

export const stationFilterReducer = stationFilterSlice.reducer;
