import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import User from '../../entity/User';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	const userRepository = getRepository(User);

	try {
		const { cpf, name } = req.body;
		const user = userRepository.create({
			cpf,
			name,
		});

		await userRepository.save(user);

		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
}

export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
	const userRepository = getRepository(User);

	try {
		const users = await userRepository.find();

		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
}
