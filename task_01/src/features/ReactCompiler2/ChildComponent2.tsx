interface Props {
	func: () => void;
}

export const ChildComponent2 = ({ func }: Props): JSX.Element => {
	console.log('rendering child2');

	return (
		<div>
			<span>ChildComponent</span>
			<input type='button' value='func' onClick={func} />
		</div>
	);
};
