import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../entity/Product';
import Store from '../../entity/Store';
import AppError from '../../errors/AppError';

export async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
	const productRepository = getRepository(Product);
	const storeRepository = getRepository(Store);

	try {
		const {
			name,
			price,
			stockQuantity,
			isCouponAppliable,
			storeId,
		} = req.body;

		const store = await storeRepository.findOne({
			where: {
				id: storeId,
			},
		});

		if (!store) {
			throw new AppError('Store not found.');
		}

		const user = productRepository.create({
			name,
			price,
			stockQuantity,
			isCouponAppliable,
			store,
		});

		await productRepository.save(user);

		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
}
