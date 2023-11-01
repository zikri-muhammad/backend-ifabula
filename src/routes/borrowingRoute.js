import express from 'express';
const router = express.Router();


import {isAuthenticatedUser, authorizeRoles} from '../middlewares/auth.js';
import { createBorrowing, deleteBorrowing, getBorrowing, getBorrowingById, getBorrowingByUser, returnBorrowing, updateBorrowing } from '../controllers/borrowingController.js';

router.use(isAuthenticatedUser);

router.route('/borrowings').get(getBorrowing);
// router.get('/borrowing', getBorrowing);

router.route('/borrowing/:id').get(getBorrowingById);
router.route('/borrowing-users').get(getBorrowingByUser);
router.route('/borrowings').post(createBorrowing);
router.route('/borrowing/:id').put(updateBorrowing);
router.route('/return-borrowing/:id').put(returnBorrowing);
router.route('/borrowing/:id').delete(deleteBorrowing);

export default router;