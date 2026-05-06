import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type Station } from 'entities/station/model/types';

export const stationsApi = createApi({
	reducerPath: 'stationsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5102' }),
	tagTypes: ['Station'],
	endpoints: build => ({
		getStations: build.query<Station[], void>({
			query: () => '/api/stations',
			providesTags: [{ type: 'Station', id: 'LIST' }],
		}),
	}),
});

export const { useGetStationsQuery } = stationsApi;
