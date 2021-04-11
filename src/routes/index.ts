import { Router } from 'express';

import user from './user';
import store from './store';
import product from './product';
import cart from './cart';

export default function (): Router {
	const router = Router();

	router.use('/user', user());
	router.use('/store', store());
	router.use('/product', product());
	router.use('/cart', cart());

	return router;
}
