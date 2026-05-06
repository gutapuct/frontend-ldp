import { type FC } from 'react';

import { setSelectedStation, toggleShowReadyOrders } from 'features/stationFilter/model/slice';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { StationType } from 'shared/types/domain';
import { ButtonGroupStyled, FilterButtonStyled, ToggleButtonStyled, WrapperStyled } from './StationFilter.styles';

type FilterOption = StationType | 'all';

const OPTIONS: Array<{ value: FilterOption; label: string }> = [
	{ value: 'all', label: 'Все' },
	{ value: StationType.Pizza, label: '🍕 Пицца' },
	{ value: StationType.Drinks, label: '🥤 Напитки' },
	{ value: StationType.Desserts, label: '🍰 Десерты' },
];

const TOGGLE_LABELS = {
	shown: '✅ Готовые видны',
	hidden: '🙈 Готовые скрыты',
};

export const StationFilter: FC = () => {
	const dispatch = useAppDispatch();
	const selectedStation = useAppSelector(state => state.stationFilter.selectedStation);
	const showReadyOrders = useAppSelector(state => state.stationFilter.showReadyOrders);

	// eslint-disable-next-line no-console
	console.log(`[StationFilter] render — station=${String(selectedStation)} showReady=${String(showReadyOrders)}`);

	return (
		<WrapperStyled>
			<ButtonGroupStyled>
				{OPTIONS.map(({ value, label }) => (
					<FilterButtonStyled
						key={String(value)}
						$active={selectedStation === value}
						onClick={() => dispatch(setSelectedStation(value))}
					>
						{label}
					</FilterButtonStyled>
				))}
			</ButtonGroupStyled>

			<ToggleButtonStyled $active={showReadyOrders} onClick={() => dispatch(toggleShowReadyOrders())}>
				{showReadyOrders ? TOGGLE_LABELS.shown : TOGGLE_LABELS.hidden}
			</ToggleButtonStyled>
		</WrapperStyled>
	);
};
