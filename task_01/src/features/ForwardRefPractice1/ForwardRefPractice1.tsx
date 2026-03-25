import { useRef } from 'react';

import { VideoPlayer } from './VideoPlayer';

export const ForwardRefPractice1 = (): JSX.Element => {
	const ref = useRef<HTMLVideoElement>(null);

	const play = async (): Promise<void> => {
		await ref.current?.play();
	};

	const pause = (): void => {
		ref.current?.pause();
	};

	return (
		<>
			<input type='button' value='play' onClick={play} />
			<input type='button' value='stop' onClick={pause} />
			<VideoPlayer ref={ref} />
		</>
	);
};
