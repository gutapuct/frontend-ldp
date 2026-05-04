import { type FC, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from 'app/store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => <Provider store={store}>{children}</Provider>;
