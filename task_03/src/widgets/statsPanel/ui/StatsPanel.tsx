import { type FC } from 'react';

import { selectAverageCookTimeToday, selectOrderCountsByStatus } from 'entities/order/model/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { DividerStyled, PanelStyled, StatLabelStyled, StatStyled, StatValueStyled } from './StatsPanel.styles';

const STAT_LABELS = {
	new: 'Новых',
	inProgress: 'В работе',
	ready: 'Готово',
	avgTime: 'Среднее время',
};

const formatCookTime = (minutes: number): string => (minutes > 0 ? `${minutes} мин` : '—');

export const StatsPanel: FC = () => {
	const counts = useAppSelector(selectOrderCountsByStatus);
	const avgCookTime = useAppSelector(selectAverageCookTimeToday);

	// eslint-disable-next-line no-console
	console.log(
		`[StatsPanel] render — new=${counts.new} inProgress=${counts.inProgress} ready=${counts.ready} avg=${avgCookTime}`,
	);

	return (
		<PanelStyled>
			<StatStyled>
				<StatValueStyled $color='#6b7280'>{counts.new}</StatValueStyled>
				<StatLabelStyled>{STAT_LABELS.new}</StatLabelStyled>
			</StatStyled>
			<DividerStyled />
			<StatStyled>
				<StatValueStyled $color='#f59e0b'>{counts.inProgress}</StatValueStyled>
				<StatLabelStyled>{STAT_LABELS.inProgress}</StatLabelStyled>
			</StatStyled>
			<DividerStyled />
			<StatStyled>
				<StatValueStyled $color='#22c55e'>{counts.ready}</StatValueStyled>
				<StatLabelStyled>{STAT_LABELS.ready}</StatLabelStyled>
			</StatStyled>
			<DividerStyled />
			<StatStyled>
				<StatValueStyled $color='#3b82f6'>{formatCookTime(avgCookTime)}</StatValueStyled>
				<StatLabelStyled>{STAT_LABELS.avgTime}</StatLabelStyled>
			</StatStyled>
		</PanelStyled>
	);
};
