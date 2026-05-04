import styled from 'styled-components';

export const PanelStyled = styled.div`
	gap: 4px;
	display: flex;
	align-items: center;
	padding: 10px 20px;
	border-radius: 10px;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

export const StatStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 16px;
`;

export const StatValueStyled = styled.span<{ $color: string }>`
	color: ${({ $color }) => $color};
	font-weight: 700;
	font-size: 22px;
	line-height: 1.2;
`;

export const StatLabelStyled = styled.span`
	margin-top: 2px;
	color: #9ca3af;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-size: 11px;
`;

export const DividerStyled = styled.div`
	width: 1px;
	height: 36px;
	background: #e5e7eb;
`;
