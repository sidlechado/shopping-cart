import { Router } from 'express';

import user from './user';
import store from './store';
import product from './product';

export default function (): Router {
	const router = Router();

	router.use('/user', user());
	router.use('/store', store());
	router.use('/product', product());

	return router;
}
