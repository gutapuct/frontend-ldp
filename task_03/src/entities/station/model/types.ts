import { type StationType } from 'shared/types/domain';

export interface Station {
	id: string;
	name: string;
	type: StationType;
}
