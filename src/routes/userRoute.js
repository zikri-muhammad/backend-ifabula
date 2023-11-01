import express from 'express';
const router = express.Router();

import { 
    getUserProfile, getUsers
 } from '../controllers/userController.js';

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

router.use(isAuthenticatedUser, authorizeRoles('admin'));

router.route('/me').get(getUserProfile);
router.route('/users').get(getUsers);

export default router;