import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface ValidatedInputProps {
	focus: () => void;
	addPlus1: () => void;
}

export const ValidatedInput = forwardRef<ValidatedInputProps>((props, ref): JSX.Element => {
	const localRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(ref, () => ({
		focus: () => {
			localRef.current?.focus();
		},
		addPlus1: () => {
			if (localRef.current) {
				localRef.current.value += '1';
			}
		},
	}));

	return <input {...props} ref={localRef} />;
});
