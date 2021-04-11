import { Router } from 'express';

import user from './user';
import store from './store';
import product from './product';
import cart from './cart';
import coupon from './coupon';

export default function (): Router {
	const router = Router();

	router.use('/cart', cart());
	router.use('/coupon', coupon());
	router.use('/store', store());
	router.use('/product', product());
	router.use('/user', user());

	return router;
}
