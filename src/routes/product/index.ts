import { Router } from 'express';
import {
	createProduct,
	updateStock,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.post('/create', createProduct);
	router.post('/update', updateStock);

	return router;
}
