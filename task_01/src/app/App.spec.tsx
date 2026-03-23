import { render } from '@testing-library/react';

import { App } from './App';

describe('When App rendered', () => {
	it('should be shown "Hello World"', () => {
		const view = render(<App />);

		expect(view.container.textContent).toContain('Hello world');
	});
});
