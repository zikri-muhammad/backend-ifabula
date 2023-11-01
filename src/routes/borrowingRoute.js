import express from 'express';
const router = express.Router();


import { isAuthenticatedUser} from '../middlewares/auth.js';
import { createBorrowing, deleteBorrowing, getBorrowing, getBorrowingById, updateBorrowing } from '../controllers/borrowingController.js';

router.use(isAuthenticatedUser);

router.route('/borrowings').get(getBorrowing);
router.route('/borrowing/:id').get(getBorrowingById);
router.route('/borrowings').post(createBorrowing);
router.route('/borrowing/:id').put(updateBorrowing);
router.route('/borrowing/:id').delete(deleteBorrowing);

export default router;