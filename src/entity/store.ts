import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Product from './Product';
import Order from './Order';
import Coupon from './Coupon';

@Entity()
export default class Store {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany((type) => Product, (product) => product.store)
	products: Product[];

	@OneToMany((type) => Order, (order) => order.store)
	orders: Order[];

	@OneToMany((type) => Coupon, (coupon) => coupon.store)
	coupons: Coupon[];
}
