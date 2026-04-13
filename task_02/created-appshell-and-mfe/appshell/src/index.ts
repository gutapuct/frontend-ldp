import { addErrorHandler, getAppStatus, LOAD_ERROR, registerApplication, start } from 'single-spa';

import rules from './rules.json';

interface IInitParams {
	business: string;
	countryId: number;
}

declare global {
	export interface Window {
		initParams: IInitParams;
	}
}

const { initParams } = window;

addErrorHandler(err => {
	// eslint-disable-next-line no-console
	console.error(err);

	if (getAppStatus(err.appOrParcelName) === LOAD_ERROR) {
		setTimeout(() => {
			window.location.reload();
		}, 60 * 1000);
	}
});

Object.entries(rules).forEach(([name, path]) => {
	registerApplication(
		name,
		() => import(name),
		location => location.pathname === path,
		initParams,
	);
});

start();
