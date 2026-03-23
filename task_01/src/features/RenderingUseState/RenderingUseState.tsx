import { useState } from 'react';

export const RenderingUseState = (): JSX.Element => {
	const [count, setCount] = useState(0);

	const handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log('rerender, count = ', count);
		// setCount(count + 1); // bad way
		// setCount(count + 1); // bad way
		setCount(prev => prev + 1);
		setCount(prev => prev + 1);
	};

	return (
		<>
			<div>{count}</div>
			<input type='button' onClick={handleClick} value='increase' />
		</>
	);
};
