import { useRef, useState } from 'react';

import {
	ButtonInputContainerStyled,
	ButtonStyled,
	ContainerStyled,
	InfoDisplayStyled,
	InputStyled,
} from './UseRefPractice2.styles';

export const UseRefPractice2 = (): JSX.Element => {
	console.log('Render component');

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const [count, setCount] = useState(0);

	const setFocus = (index: number): void => {
		if (inputRefs.current[index]) {
			inputRefs.current[index]?.focus();
		}
	};

	return (
		<ContainerStyled>
			<InfoDisplayStyled>Count: {count}</InfoDisplayStyled>
			<ButtonStyled type='button' value='increase count' onClick={() => setCount(prev => prev + 1)} />
			{Array.from({ length: 10 }).map((_, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<ButtonInputContainerStyled key={index}>
					<ButtonStyled
						type='button'
						value={`Добавить комментарий - ${index}`}
						onClick={() => setFocus(index)}
					/>
					<InputStyled
						type='text'
						ref={el => {
							inputRefs.current[index] = el;
						}}
					/>
				</ButtonInputContainerStyled>
			))}
		</ContainerStyled>
	);
};
