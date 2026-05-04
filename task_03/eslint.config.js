import dodopizzaPlugin from '@dodopizza/eslint-plugin';

export default [...dodopizzaPlugin.configs.base, ...dodopizzaPlugin.configs.vitest, ...dodopizzaPlugin.configs.i18n];
