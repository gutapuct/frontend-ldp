import React from 'react';

interface Props {
	func: () => void;
}
export const ChildComponent = React.memo(({ func }: Props): JSX.Element => {
	console.log('rendering child');

	return (
		<div>
			<span>ChildComponent</span>
			<input type='button' value='func' onClick={func} />
		</div>
	);
});
