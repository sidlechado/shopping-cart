import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Store from '../../entity/Store';

export async function createStore(req: Request, res: Response, next: NextFunction): Promise<void> {
	const storeRepository = getRepository(Store);

	try {
		const {
			name,
		} = req.body;

		const user = storeRepository.create({
			name,
		});

		await storeRepository.save(user);

		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
}

export async function listProductsInAStore(req: Request, res: Response, next: NextFunction): Promise<void> {
	const storeRepository = getRepository(Store);

	try {
		const { id } = req.query;
		const store = await storeRepository.findOne({
			where: {
				id,
			},
		});

		res.status(200).json(store.products);
	} catch (err) {
		next(err);
	}
}
