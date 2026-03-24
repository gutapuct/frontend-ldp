import { type FC, StrictMode } from 'react';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { RenderingUseState } from 'features/RenderingUseState/RenderingUseState';
import { UseRefPractice } from 'features/UseRefPractice/UseRefPractice';
import { logger } from 'shared/lib/logger/logger';
import { ContainerStyled, TaskBlockStyled, TaskTitleStyled } from './App.styles';

export const App: FC = () => (
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			<ContainerStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.1</TaskTitleStyled>
					<RenderingUseState />
				</TaskBlockStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.2</TaskTitleStyled>
					<UseRefPractice />
				</TaskBlockStyled>
			</ContainerStyled>
		</LoggerContextProvider>
	</StrictMode>
);
