import styled from 'styled-components';

export const WrapperStyled = styled.div`
	gap: 16px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

export const ButtonGroupStyled = styled.div`
	gap: 6px;
	display: flex;
`;

export const FilterButtonStyled = styled.button<{ $active: boolean }>`
	padding: 7px 16px;
	border: 2px solid ${({ $active }) => ($active ? '#1d4ed8' : '#d1d5db')};
	border-radius: 8px;
	background: ${({ $active }) => ($active ? '#1d4ed8' : '#fff')};
	color: ${({ $active }) => ($active ? '#fff' : '#374151')};
	font-weight: 600;
	font-size: 13px;
	cursor: pointer;
	transition: all 0.15s;
`;

export const ToggleButtonStyled = styled.button<{ $active: boolean }>`
	padding: 7px 14px;
	border: 2px solid ${({ $active }) => ($active ? '#16a34a' : '#9ca3af')};
	border-radius: 8px;
	background: transparent;
	color: ${({ $active }) => ($active ? '#16a34a' : '#9ca3af')};
	font-weight: 600;
	font-size: 12px;
	cursor: pointer;
	transition: all 0.15s;
`;
