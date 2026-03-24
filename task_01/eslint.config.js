import dodopizzaPlugin from '@dodopizza/eslint-plugin';

export default [
	...dodopizzaPlugin.configs.base,
	...dodopizzaPlugin.configs.vitest,
	...dodopizzaPlugin.configs.i18n,
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		rules: {
			'@typescript-eslint/no-magic-numbers': 'off',
			'no-console': 'off',
			'i18next/no-literal-string': 'off',
		},
	},
];
