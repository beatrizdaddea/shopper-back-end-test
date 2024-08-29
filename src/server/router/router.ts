import { Router } from 'express';
import { aiController } from '../controller/aiController';
import { validateRequestBody } from '../middleware/validation';

const router = Router();

router.post('/water-gas-reading', validateRequestBody, aiController);

export default router;
