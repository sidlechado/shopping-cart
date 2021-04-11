import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Coupon from '../../entity/Coupon';
import Store from '../../entity/Store';
import AppError from '../../errors/AppError';

export async function createCoupon(req: Request, res: Response, next: NextFunction): Promise<void> {
	const couponRepository = getRepository(Coupon);
	const storeRepository = getRepository(Store);

	try {
		const {
			tag,
			value,
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

		const coupon = couponRepository.create({
			tag,
			value,
			store,
		});

		await couponRepository.save(coupon);

		res.status(200).json(coupon);
	} catch (err) {
		next(err);
	}
}
