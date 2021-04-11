import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import User from './User';
import Store from './Store';
import Product from './Product';

export interface OrderableItem {
	product: Product;
	qty: number;
	subtotal: number;
}

export enum orderStatus {
	active = 'active',
	completed = 'completed',
	canceled = 'canceled'
}

@Entity()
export default class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne((type) => User, (user) => user.orders)
	user: User;

	@ManyToOne((type) => Store, (store) => store.orders)
	store: Store;

	@Column({
		default: 0,
	})
	totalPrice: number;

	@Column({
		type: 'jsonb',
		array: false,
		default: () => "'[]'",
		nullable: false,
	})
	products: Array<OrderableItem>;

	@Column({
		default: 0,
		type: 'float',
	})
	couponValue: number;

	@Column({
		type: 'enum',
		enum: orderStatus,
		default: orderStatus.active,
	})
	status: orderStatus;
}
