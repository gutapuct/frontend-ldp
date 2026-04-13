import { createLoggerInstanceRef } from '@dodobrands/react-logger';

export const logger = createLoggerInstanceRef({
	applicationName: 'mfe',
	isProduction: import.meta.env.PROD,
	remoteUrl: window.initParams?.frontendLoggerUrl ?? 'https://frontlogger.d.yandex.dodois.dev',
	persistentQueue: false,
});
