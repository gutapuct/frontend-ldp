import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from 'react';

const TIMER_INTERVAL_MS = 30_000;

const TimeContext = createContext<Date | undefined>(undefined);

interface Props {
	children: ReactNode;
}

export const TimeProvider: FC<Props> = ({ children }) => {
	const [now, setNow] = useState<Date>(new Date());

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), TIMER_INTERVAL_MS);

		return () => clearInterval(id);
	}, []);

	return <TimeContext.Provider value={now}>{children}</TimeContext.Provider>;
};

export const useNow = (): Date => {
	const context = useContext(TimeContext);
	if (context === undefined) {
		throw new Error('useNow must be used within a TimeProvider');
	}

	return context;
};
