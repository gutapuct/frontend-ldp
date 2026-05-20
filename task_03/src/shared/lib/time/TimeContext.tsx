import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from 'react';

const TIMER_INTERVAL_MS = 30_000;

const TimeContext = createContext<Date>(new Date());

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

export const useNow = (): Date => useContext(TimeContext);
