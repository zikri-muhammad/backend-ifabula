import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import catchAsyncErrors from '../middlewares/catchAsyncError.js';
import ErrorHandler from'../utils/errorHandler.js';

// Check if the user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});


// handling users roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role(${req.user.role}) is not allowed to access this resource.`, 403))
        }
        next();
    }
}