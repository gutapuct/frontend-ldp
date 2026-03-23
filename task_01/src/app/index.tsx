import { createRoot } from 'react-dom/client';

import { App } from './App';

const element = document.getElementById('app:task_01');

if (element) {
	const root = createRoot(element);

	root.render(<App />);
}
