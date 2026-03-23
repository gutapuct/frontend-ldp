import '@dodopizza/vite-app-plugin/client';
import 'vitest/globals';
import '@testing-library/jest-dom/vitest';

declare global {
	interface Window {
		initParams?: {
			frontendLoggerUrl: string;
		};
	}
}
