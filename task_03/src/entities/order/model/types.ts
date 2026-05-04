import { type OrderStatus, type StationType } from 'shared/types/domain';

export interface OrderItem {
	name: string;
	quantity: number;
}

export interface Order {
	id: string;
	orderNumber: string;
	station: StationType;
	status: OrderStatus;
	items: OrderItem[];
	createdAt: string;
	updatedAt: string | null;
}
