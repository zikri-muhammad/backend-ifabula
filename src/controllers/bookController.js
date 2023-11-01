import catchAsyncErrors from '../middlewares/catchAsyncError.js';
import Book from '../models/books.js';

// Get current user profile   =>    /api/v1/books
export const getBook = catchAsyncErrors( async(req, res, next) => {

    const user = await Book.findById(req.user.id);

    res.status(200).json({
        success : true,
        data : user
    })
});
