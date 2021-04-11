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
			relations: ['user', 'store'],
			where: {
				user: {
					id,
				},
				status: 'active',
			},
		});

		return order;
	} catch (err) {
		console.error(err);
	}
}

async function calculateTotalPrice(order: Order): Promise<Order> {
	const orderRepository = getRepository(Order);

	try {
		order.totalPrice = order.products.reduce((totalPrice, { subtotal }: {
			subtotal: number;
		}) => totalPrice + subtotal, 0);

		const updatedOrder = await orderRepository.save({
			...order,
		});

		return updatedOrder;
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
			throw new AppError('Invalid data.');
		}

		let order = await checkIfUserHasOrder(userId);
		console.log(order);

		if (!order) {
			order = orderRepository.create({
				user,
				store,
			});

			await orderRepository.save(order);
		}

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}

export async function insertProductIntoOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
	const orderRepository = getRepository(Order);
	const productRepository = getRepository(Product);

	try {
		const {
			orderId,
			productId,
			userId,
			qty,
		} = req.body;

		let order = await orderRepository.findOne({
			relations: ['user', 'store'],
			where: {
				id: orderId,
			},
		});

		const product = await productRepository.findOne({
			where: {
				id: productId,
			},
		});

		if (!order || !product) {
			throw new AppError('Invalid data.');
		}

		if (order.user.id !== userId) {
			throw new AppError('User does not own this order.');
		}

		if (qty > product.stockQuantity) {
			throw new AppError('Stock insufficient.');
		}

		order.products.push({
			product,
			qty,
			subtotal: (qty * product.price),
		});

		order = await calculateTotalPrice(order);

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}
