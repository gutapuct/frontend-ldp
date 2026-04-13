import { createRoot } from 'react-dom/client';

import { App } from './App';

const element = document.getElementById('app:mfe');

if (element) {
	const root = createRoot(element);

	root.render(<App />);
}
