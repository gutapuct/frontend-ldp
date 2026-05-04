import { type Station } from 'entities/station/model/types';
import { baseApi } from 'shared/api/baseApi';

export const stationsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getStations: build.query<Station[], void>({
			query: () => '/api/stations',
			providesTags: [{ type: 'Station', id: 'LIST' }],
		}),
	}),
});

export const { useGetStationsQuery } = stationsApi;
