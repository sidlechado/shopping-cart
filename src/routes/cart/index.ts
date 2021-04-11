import { Router } from 'express';
import {
	createOrder,
	insertProductIntoOrder,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.post('/create', createOrder);
	router.post('/insert', insertProductIntoOrder);

	return router;
}
