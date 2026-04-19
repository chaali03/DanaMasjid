import { Router } from 'express';
import * as supplyChainController from '../controllers/supplyChainController';

const router = Router();

router.post('/items', supplyChainController.createItem);
router.patch('/items/:id/status', supplyChainController.updateItemStatus);
router.get('/items/:id', supplyChainController.getItem);

export default router;
