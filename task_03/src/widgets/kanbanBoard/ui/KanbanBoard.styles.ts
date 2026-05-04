import styled from 'styled-components';

export const BoardStyled = styled.div`
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	display: grid;
	align-items: start;
`;

export const ColumnStyled = styled.div`
	padding: 12px;
	min-height: 200px;
	border-radius: 12px;
	background: #f9fafb;
`;

export const ColumnHeaderStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

export const ColumnTitleStyled = styled.h3`
	margin: 0;
	color: #1f2937;
	font-weight: 700;
	font-size: 15px;
`;

export const ColumnCountStyled = styled.span`
	padding: 2px 9px;
	border-radius: 12px;
	background: #e5e7eb;
	color: #6b7280;
	font-weight: 700;
	font-size: 12px;
`;

export const CardsListStyled = styled.div`
	gap: 10px;
	display: flex;
	flex-direction: column;
`;

export const EmptyHintStyled = styled.p`
	margin: 20px 0;
	color: #d1d5db;
	text-align: center;
	font-size: 13px;
`;

export const MessageStyled = styled.p`
	padding: 40px;
	color: #6b7280;
	text-align: center;
`;

export const ErrorMessageStyled = styled.p`
	padding: 20px;
	border-radius: 10px;
	background: #fff1f2;
	color: #ef4444;
	text-align: center;
`;
