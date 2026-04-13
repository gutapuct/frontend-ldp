import { mergeConfig } from 'vite';
import { defineProject } from 'vitest/config';

import viteConfig from './vite.config';

export default defineProject(
	mergeConfig(viteConfig, {
		test: {
			setupFiles: ['src/shared/config/vitestSetup.ts'],
			environment: 'jsdom',
			globals: true,
		},
	}),
);
