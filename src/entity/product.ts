import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import Store from './Store';

// Will be used as our stock
@Entity()
export default class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	price: number;

	@Column()
	stockQuantity: number;

	@Column()
	isCouponAppliable: boolean;

	@ManyToOne((type) => Store, (store) => store.products)
	store: Store;
}
