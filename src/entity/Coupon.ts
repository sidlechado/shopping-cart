import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Coupon {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	tag: string;

	@Column()
	value: number;
}
