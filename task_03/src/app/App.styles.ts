import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f3f4f6;
    color: #111827;
  }
`;

export const LayoutStyled = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

export const HeaderStyled = styled.header`
	gap: 16px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	padding: 12px 24px;
	border-bottom: 1px solid #e5e7eb;
	background: #fff;
`;

export const LogoStyled = styled.h1`
	margin: 0;
	color: #1d4ed8;
	font-weight: 800;
	font-size: 20px;
`;

export const ToolbarStyled = styled.div`
	padding: 10px 24px;
	border-bottom: 1px solid #e5e7eb;
	background: #fff;
`;

export const MainStyled = styled.main`
	flex: 1;
	padding: 20px 24px;
`;
