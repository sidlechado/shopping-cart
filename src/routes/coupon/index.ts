import { Router } from 'express';
import {
	createCoupon,
} from './useCases';

export default function (): Router {
	const router = Router();

	router.post('/create', createCoupon);

	return router;
}
