import express from 'express';
const router = express.Router();


import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { createBook, deleteBook, getBook, getBookById, updateBook } from '../controllers/bookController.js';

router.use(isAuthenticatedUser, authorizeRoles('admin', 'user'));

router.route('/books').get(getBook);
router.route('/book/:id').get(getBookById);
router.route('/books').post(createBook);
router.route('/book/:id').put(updateBook);
router.route('/book/:id').delete(deleteBook);

export default router;