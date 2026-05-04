import { type FC, StrictMode } from 'react';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { StoreProvider } from 'app/providers/StoreProvider';
import { logger } from 'shared/lib/logger/logger';

export const App: FC = () => (
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			<StoreProvider>
				<div>Hello world</div>
			</StoreProvider>
		</LoggerContextProvider>
	</StrictMode>
);
