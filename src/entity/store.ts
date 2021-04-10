import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Product from './Product';

@Entity()
export default class Store {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany((type) => Product, (product) => product.store)
	products: Product[];
}
