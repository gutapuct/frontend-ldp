import { type FC, StrictMode } from 'react';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { logger } from 'shared/lib/logger/logger';

export const App: FC = () => (
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			<div>Hello world</div>
		</LoggerContextProvider>
	</StrictMode>
);
