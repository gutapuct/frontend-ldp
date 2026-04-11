import { dodoAppPlugin } from '@dodopizza/vite-app-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 3003,
		origin: 'https://localhost:3003',
	},
	plugins: [
		dodoAppPlugin({
			enableReactCompiler: {
				target: '18',
			},
		}),
	],
});
