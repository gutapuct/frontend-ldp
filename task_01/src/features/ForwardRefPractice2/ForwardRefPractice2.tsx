import { useRef } from 'react';

import { ValidatedInput, type ValidatedInputProps } from './ValidatedInput';

export const ForwardRefPractice2 = (): JSX.Element => {
	const ref = useRef<ValidatedInputProps>(null);

	const handleFocus = (): void => {
		ref.current?.focus();
	};

	const handlePlus1 = (): void => {
		ref.current?.addPlus1();
		// can not use something else
	};

	return (
		<>
			<input type='button' value='focus' onClick={handleFocus} />
			<input type='button' value='+1' onClick={handlePlus1} />
			<ValidatedInput ref={ref} />
		</>
	);
};
