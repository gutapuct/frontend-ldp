import { createLoggerInstanceRef } from '@dodobrands/react-logger';

export const logger = createLoggerInstanceRef({
	applicationName: 'task_01',
	isProduction: import.meta.env.PROD,
	remoteUrl: window.initParams?.frontendLoggerUrl ?? 'https://frontlogger.d.yandex.dodois.dev',
	persistentQueue: false,
});
