import { Router } from 'express';
import { createUser } from './createUser';

export default function (): Router {
	const router = Router();

	router.get('/create', createUser);

	return router;
}
