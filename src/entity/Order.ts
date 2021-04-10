import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

interface OrderableItem {
	product_id: number;
	qty: number;
	subtotal: number;
}

@Entity()
export default class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: string;

	@Column()
	totalPrice: number;

	@Column({
		type: 'jsonb',
		array: false,
		default: () => "'[]'",
		nullable: false,
	})
	products: Array<OrderableItem>;

	@Column()
	isCouponApplied: boolean;

	@Column()
	couponValue: number;
}
