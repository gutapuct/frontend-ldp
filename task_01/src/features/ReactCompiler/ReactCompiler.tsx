import { useCallback, useState } from 'react';

import { ChildComponent } from 'features/ReactCompiler/ChildComponent';

export const ReactCompiler = (): JSX.Element => {
	console.log('rendering parent');
	const [count, setCount] = useState(0);

	// без useCallback при увеличении count будет ререндериться дочерний элемент, хоть он мемоизирован, потому что ссылка
	// на функцию func будет пересоздаваться, а значит и пропс для Child будет передаваться другой
	const func = useCallback(() => {
		console.log('calling func');
	}, []);

	const increase = (): void => {
		setCount(prev => prev + 1);
	};

	return (
		<div>
			<span>{count}</span>
			<input type='button' value='increase' onClick={increase} />
			<ChildComponent func={func} />
		</div>
	);
};
