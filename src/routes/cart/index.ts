import { Router } from 'express';
import {
	createOrder,
	updateProductsOnOrder,
	removeItemFromOrder,
	getOrder,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.get('/:id', getOrder);
	router.post('/create', createOrder);
	router.post('/insert', updateProductsOnOrder);
	router.post('/remove', removeItemFromOrder);

	return router;
}
