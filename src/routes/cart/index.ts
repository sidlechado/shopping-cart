import { Router } from 'express';
import {
	createOrder,
	updateProductsOnOrder,
	removeItemFromOrder,
	getOrder,
	clearOrderProducts,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.get('/:id', getOrder);
	router.post('/create', createOrder);
	router.post('/update', updateProductsOnOrder);
	router.post('/remove', removeItemFromOrder);
	router.delete('/clear', clearOrderProducts);

	return router;
}
