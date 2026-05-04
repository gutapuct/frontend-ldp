import { type FC, StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { StoreProvider } from 'app/providers/StoreProvider';
import { StationFilter } from 'features/stationFilter/ui/StationFilter';
import { logger } from 'shared/lib/logger/logger';
import { KanbanBoard } from 'widgets/kanbanBoard/ui/KanbanBoard';
import { StatsPanel } from 'widgets/statsPanel/ui/StatsPanel';
import { GlobalStyled, HeaderStyled, LayoutStyled, LogoStyled, MainStyled, ToolbarStyled } from './App.styles';

const APP_TITLE = '🍕 Dodo KDS';

export const App: FC = () => (
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			<StoreProvider>
				<GlobalStyled />
				<Toaster position='top-right' />
				<LayoutStyled>
					<HeaderStyled>
						<LogoStyled>{APP_TITLE}</LogoStyled>
						<StatsPanel />
					</HeaderStyled>
					<ToolbarStyled>
						<StationFilter />
					</ToolbarStyled>
					<MainStyled>
						<KanbanBoard />
					</MainStyled>
				</LayoutStyled>
			</StoreProvider>
		</LoggerContextProvider>
	</StrictMode>
);
