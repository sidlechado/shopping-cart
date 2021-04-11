import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../entity/Product';
import Store from '../../entity/Store';
import User from '../../entity/User';
import Order from '../../entity/Order';
import AppError from '../../errors/AppError';

async function checkIfUserHasOrder(id: number): Promise<Order> {
	const orderRepository = getRepository(Order);

	try {
		const order = await orderRepository.findOne({
			relations: ['users'],
			where: {
				status: 'active',
			},
		});

		return order;
	} catch (err) {
		console.error(err);
	}
}

export async function createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
	const orderRepository = getRepository(Order);
	const storeRepository = getRepository(Store);
	const userRepository = getRepository(User);

	try {
		const {
			userId,
			storeId,
		} = req.body;

		const user = await userRepository.findOne({
			where: {
				id: userId,
			},
		});

		const store = await storeRepository.findOne({
			where: {
				id: storeId,
			},
		});

		if (!store || !user) {
			throw new AppError('Invalid data.', 401);
		}

		let order = await checkIfUserHasOrder(userId);

		if (!order) {
			order = orderRepository.create({
				user,
				store,
			});
		}

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}
