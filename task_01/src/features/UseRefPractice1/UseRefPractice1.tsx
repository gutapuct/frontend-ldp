import { useRef } from 'react';

import { Counter } from 'shared/ui/Counter/Counter';
import { ButtonStyled, ContainerStyled } from './UseRefPractice1.styles';

export const UseRefPractice1 = (): JSX.Element => {
	console.log('Render component');

	const refCount = useRef(0);

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
		alert(`Ref count: ${refCount.current}, Timer: ${refTimer.current} seconds`);
	};

	return (
		<ContainerStyled>
			<Counter />
			<ButtonStyled type='button' value='click me to increase ref' onClick={handleClick} />
			<ButtonStyled type='button' value='show alert' onClick={showAlert} />
		</ContainerStyled>
	);
};
