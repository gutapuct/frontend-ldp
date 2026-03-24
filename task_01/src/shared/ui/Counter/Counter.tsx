import { useState } from 'react';

import { ButtonStyled, InfoDisplayStyled } from './Counter.styles';

export const Counter = (): JSX.Element => {
	console.log('Render Counter');

	const [count, setCount] = useState(0);

	return (
		<>
			<InfoDisplayStyled>Count: {count}</InfoDisplayStyled>
			<ButtonStyled type='button' value='increase count' onClick={() => setCount(prev => prev + 1)} />
		</>
	);
};
