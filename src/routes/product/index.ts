import { Router } from 'express';
import {
	createProduct,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.post('/create', createProduct);

	return router;
}
