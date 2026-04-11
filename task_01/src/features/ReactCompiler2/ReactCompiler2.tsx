import { useState } from 'react';

import { ChildComponent2 } from './ChildComponent2';

export const ReactCompiler2 = (): JSX.Element => {
	console.log('rendering parent2');
	const [count, setCount] = useState(0);

	const func = (): void => {
		console.log('calling func2');
	};

	const increase = (): void => {
		setCount(prev => prev + 1);
	};

	return (
		<div>
			<span>{count}</span>
			<input type='button' value='increase' onClick={increase} />
			<ChildComponent2 func={func} />
		</div>
	);
};
