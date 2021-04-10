import { Router } from 'express';
import {
	createStore,
	listProductsInAStore,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.post('/create', createStore);
	router.get('/list/:id', listProductsInAStore);

	return router;
}
