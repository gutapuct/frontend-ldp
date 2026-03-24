import { useRef, useState } from 'react';

import { ButtonStyled, ContainerStyled, InfoDisplayStyled } from './UseRefPractice1.styles';

export const UseRefPractice1 = (): JSX.Element => {
	console.log('Render component');

	const refCount = useRef(0);
	const [count, setCount] = useState(0);

	const refTimer = useRef(0);
	if (refTimer.current === 0) {
		setInterval(() => {
			refTimer.current++;
		}, 1000);
	}

	const handleClick = (): void => {
		refCount.current++;
	};

	const showAlert = (): void => {
		// eslint-disable-next-line no-alert
		alert(
			`Count: ${count}, Ref count: ${refCount.current}, Sum: ${count + refCount.current}, Timer: ${refTimer.current} seconds`,
		);
	};

	return (
		<ContainerStyled>
			<ButtonStyled type='button' value='click me to increase ref' onClick={handleClick} />
			<InfoDisplayStyled>Count: {count}</InfoDisplayStyled>
			<ButtonStyled type='button' value='increase count' onClick={() => setCount(prev => prev + 1)} />
			<ButtonStyled type='button' value='show alert' onClick={showAlert} />
		</ContainerStyled>
	);
};
