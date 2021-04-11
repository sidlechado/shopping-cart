import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../entity/Product';
import Store from '../../entity/Store';
import User from '../../entity/User';
import Order from '../../entity/Order';
import AppError from '../../errors/AppError';
import Coupon from '../../entity/Coupon';

function checkIfOrderHasProduct(order: Order, productId: number): number {
	return order.products.findIndex((element) => element.product.id === productId);
}

function stockChecker(qty: number, orderQty: number, stock: number): boolean {
	return ((qty + orderQty) > stock);
}

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

async function calculatePrice(order: Order): Promise<Order> {
	const orderRepository = getRepository(Order);

	try {
		order.products.forEach((priceCalculator): void => {
			const productPrice = priceCalculator.product.price;
			priceCalculator.subtotal = (
				priceCalculator.qty * (productPrice - productPrice * order.couponValue)
			);
		});

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

export async function updateProductsOnOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
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

		const productIndex = checkIfOrderHasProduct(order, product.id);
		if (productIndex >= 0) {
			if (stockChecker(qty, order.products[productIndex].qty, product.stockQuantity)) {
				throw new AppError('Stock insufficient.');
			}

			if (!(qty + order.products[productIndex].qty >= 0)) {
				throw new AppError('Invalid data');
			}

			order.products[productIndex].qty += qty;
		} else {
			order.products.push({
				product,
				qty,
				subtotal: (qty * product.price),
			});
		}

		order = await calculatePrice(order);

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}

export async function removeItemFromOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
	const orderRepository = getRepository(Order);

	try {
		const {
			userId,
			productId,
			orderId,
		} = req.body;

		let order = await orderRepository.findOne({
			relations: ['user', 'store'],
			where: {
				id: orderId,
			},
		});

		if (!order) {
			throw new AppError('Order does not exists.');
		}

		if (order.user.id !== userId) {
			throw new AppError('User does not own this order.');
		}

		const productIndex = checkIfOrderHasProduct(order, productId);
		if (productIndex >= 0) {
			order.products.splice(productIndex, 1);
			order = await calculatePrice(order);
		} else {
			throw new AppError('Order does not have this product');
		}

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}

export async function getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
	const orderRepository = getRepository(Order);

	try {
		const { id } = req.params;

		const order = await orderRepository.findOne({
			relations: ['user', 'store'],
			where: {
				id,
			},
		});

		if (!order) {
			throw new AppError('Order does not exists');
		}

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}

export async function clearOrderProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
	const orderRepository = getRepository(Order);

	try {
		const {
			userId,
			orderId,
		} = req.body;

		let order = await orderRepository.findOne({
			relations: ['user', 'store'],
			where: {
				id: orderId,
			},
		});

		if (!order) {
			throw new AppError('Order does not exists');
		}

		if (order.user.id !== userId) {
			throw new AppError('User does not own this order.');
		}

		order.products.splice(0, order.products.length);

		order = await calculatePrice(order);

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}

export async function applyCouponToOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
	const orderRepository = getRepository(Order);
	const couponRepository = getRepository(Coupon);

	try {
		const {
			tag,
			orderId,
			userId,
		} = req.body;

		let order = await orderRepository.findOne({
			relations: ['store', 'user'],
			where: {
				id: orderId,
			},
		});

		console.log();

		if (!order) {
			throw new AppError('Order does not exists');
		}

		if (order.user.id !== userId) {
			throw new AppError('User does not own this order.');
		}

		const coupon = await couponRepository.findOne({
			where: {
				tag,
				store: {
					id: order.store.id,
				},
			},
		});

		if (!coupon) {
			throw new AppError('Invalid data.');
		}

		order.couponValue = coupon.value;
		order = await calculatePrice(order);

		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
}
