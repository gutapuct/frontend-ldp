import { type FC, StrictMode } from 'react';
import { LoggerContextProvider } from '@dodobrands/react-logger';

import { ForwardRefPractice1 } from 'features/ForwardRefPractice1/ForwardRefPractice1';
import { ForwardRefPractice2 } from 'features/ForwardRefPractice2/ForwardRefPractice2';
import { RenderingUseState } from 'features/RenderingUseState/RenderingUseState';
import { UseRefPractice1 } from 'features/UseRefPractice1/UseRefPractice1';
import { UseRefPractice2 } from 'features/UseRefPractice2/UseRefPractice2';
import { logger } from 'shared/lib/logger/logger';
import { ContainerStyled, TaskBlockStyled, TaskTitleStyled } from './App.styles';

export const App: FC = () => (
	<StrictMode>
		<LoggerContextProvider loggerInstanceRef={logger}>
			<ContainerStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.1 useState</TaskTitleStyled>
					<RenderingUseState />
				</TaskBlockStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.2 useRef for state</TaskTitleStyled>
					<UseRefPractice1 />
				</TaskBlockStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.3 useRef for html</TaskTitleStyled>
					<UseRefPractice2 />
				</TaskBlockStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.4 forwardRef</TaskTitleStyled>
					<ForwardRefPractice1 />
				</TaskBlockStyled>
				<TaskBlockStyled>
					<TaskTitleStyled>Task 1.5 useImperativeHandle</TaskTitleStyled>
					<ForwardRefPractice2 />
				</TaskBlockStyled>
			</ContainerStyled>
		</LoggerContextProvider>
	</StrictMode>
);
