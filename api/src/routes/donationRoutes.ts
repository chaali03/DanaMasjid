import { Router } from 'express';
import * as donationController from '../controllers/donationController';

const router = Router();

router.post('/', donationController.createDonation);
router.patch('/:id/confirm', donationController.confirmDonation);
router.get('/:id/blockchain', donationController.getDonationBlockchainData);

export default router;
