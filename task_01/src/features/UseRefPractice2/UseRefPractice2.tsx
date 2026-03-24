import { useRef } from 'react';

import { Counter } from 'shared/ui/Counter/Counter';
import { ButtonInputContainerStyled, ButtonStyled, ContainerStyled, InputStyled } from './UseRefPractice2.styles';

export const UseRefPractice2 = (): JSX.Element => {
	console.log('Render component');

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const setFocus = (index: number): void => {
		if (inputRefs.current[index]) {
			inputRefs.current[index]?.focus();
		}
	};

	return (
		<ContainerStyled>
			<Counter />
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
