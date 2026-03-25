import { forwardRef } from 'react';

export const VideoPlayer = forwardRef<HTMLVideoElement>((_, ref) => (
	<>
		{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
		<video src='https://www.w3schools.com/html/mov_bbb.mp4' controls ref={ref} />
	</>
));
