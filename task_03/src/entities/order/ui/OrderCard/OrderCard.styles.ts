import styled from 'styled-components';

type UrgencyLevel = 'low' | 'medium' | 'high';

const urgencyBorder: Record<UrgencyLevel, string> = {
	low: '#22c55e',
	medium: '#eab308',
	high: '#ef4444',
};

const urgencyBg: Record<UrgencyLevel, string> = {
	low: '#f0fdf4',
	medium: '#fefce8',
	high: '#fff1f2',
};

const waitTimeColor: Record<UrgencyLevel, string> = {
	low: '#16a34a',
	medium: '#ca8a04',
	high: '#dc2626',
};

export const CardStyled = styled.div<{ $urgency: UrgencyLevel }>`
	gap: 8px;
	display: flex;
	flex-direction: column;
	padding: 12px 14px;
	border-left: 5px solid ${({ $urgency }) => urgencyBorder[$urgency]};
	border-radius: 10px;
	background: ${({ $urgency }) => urgencyBg[$urgency]};
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

export const CardHeaderStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const OrderNumberStyled = styled.span`
	font-weight: 700;
	font-size: 16px;
`;

export const StationBadgeStyled = styled.span`
	color: #555;
	font-size: 12px;
`;

export const ItemsListStyled = styled.ul`
	gap: 3px;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const ItemStyled = styled.li`
	display: flex;
	justify-content: space-between;
	color: #333;
	font-size: 13px;
`;

export const QtyStyled = styled.span`
	color: #666;
	font-weight: 600;
`;

export const CardFooterStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 4px;
`;

export const WaitTimeStyled = styled.span<{ $urgency: UrgencyLevel }>`
	color: ${({ $urgency }) => waitTimeColor[$urgency]};
	font-weight: 600;
	font-size: 13px;
`;

export const ActionButtonStyled = styled.button`
	padding: 5px 12px;
	border: none;
	border-radius: 6px;
	background: #1d4ed8;
	color: #fff;
	font-weight: 600;
	font-size: 12px;
	cursor: pointer;
	transition: opacity 0.15s;

	&:hover:not(:disabled) {
		opacity: 0.85;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;
