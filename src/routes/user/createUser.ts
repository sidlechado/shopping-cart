import { Request, Response, NextFunction } from 'express';
import User from '../../entity/user';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		User.create({
			name: 'Sidnei',
			cpf: '123456789',
		});
		res.status(200).json({ message: 'oi' });
	} catch (err) {
		next(err);
	}
}
