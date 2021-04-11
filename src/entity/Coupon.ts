import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import Store from './Store';

@Entity()
export default class Coupon {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	tag: string;

	@Column({
		type: 'float',
	})
	value: number;

	@ManyToOne((type) => Store, (store) => store.coupons)
	store: Store;
}
