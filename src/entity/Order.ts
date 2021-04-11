import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import User from './User';
import Store from './Store';
import Product from './Product';

interface OrderableItem {
	product: Product;
	qty: number;
	subtotal: number;
}

enum orderStatus {
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
		default: false,
	})
	isCouponApplied: boolean;

	@Column({
		default: 0,
	})
	couponValue: number;

	@Column({
		type: 'enum',
		enum: orderStatus,
		default: orderStatus.active,
	})
	status: orderStatus;
}
