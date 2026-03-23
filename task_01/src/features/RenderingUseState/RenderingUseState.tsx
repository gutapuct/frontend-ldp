import { useState } from 'react';

export const RenderingUseState = (): JSX.Element => {
	const getInitialCount = (): number => {
		let a = 0;
		let b = 0;
		let accum = 0;
		for (let i = 0; i < 100_000_000; i++) {
			a = i;
			b = 100_000_000 - i;
			accum = accum + a + b;
		}

		console.log('rerender, accum: ', accum);

		return 0;
	};

	// bad way... or useMemo - это тоже не будет вызывать повтора вычисления
	// const [count, setCount] = useState(getInitialCount());
	const [count, setCount] = useState(() => getInitialCount());

	const handleClick = (): void => {
		console.log('rerender, count = ', count);

		// setCount(count + 1); // bad way
		// setCount(count + 1); // bad way
		// setTimeout(() => {
		// 	setCount(count + 1); // bad way
		// }, 1000);

		setCount(prev => prev + 1);
		setCount(prev => prev + 1);
		setTimeout(() => {
			setCount(prev => prev + 1);
		}, 1000);
	};

	return (
		<>
			<div>{count}</div>
			<input type='button' onClick={handleClick} value='increase' />
		</>
	);
};
