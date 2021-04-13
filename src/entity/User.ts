import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Order from './Order';
@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	cpf: string;

	@OneToMany((type) => Order, (order) => order.user)
	orders: Order[];
}
