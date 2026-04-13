import { type FC, StrictMode } from 'react';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { logger } from 'shared/lib/logger/logger';

export const App: FC = () => (
	// https://react.dev/reference/react/StrictMode#:~:text=Strict%20Mode%20enables%20the%20following%20checks%20in%20development
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			<div>Hello world</div>
		</LoggerContextProvider>
	</StrictMode>
);
