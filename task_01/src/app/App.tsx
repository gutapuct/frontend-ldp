import { type FC, StrictMode } from 'react';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { RenderingUseState } from 'features/RenderingUseState/RenderingUseState';
import { logger } from 'shared/lib/logger/logger';

export const App: FC = () => (
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			{/* Task 1.1 */}
			<RenderingUseState />
		</LoggerContextProvider>
	</StrictMode>
);
