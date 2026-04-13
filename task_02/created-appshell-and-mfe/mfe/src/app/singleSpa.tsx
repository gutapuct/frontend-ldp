import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

import { logger } from 'shared/lib/logger/logger';
import { App } from './App';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const { bootstrap, mount, unmount } = singleSpaReact({
	React,
	ReactDOMClient,
	rootComponent: App,
	errorBoundary: err => {
		logger.current.error(`Error boundary error ${err.message}`, err, { area: 'errorBoundary' });

		// eslint-disable-next-line i18next/no-literal-string
		return <div>Error</div>;
	},
});
