import catchAsyncErrors from '../middlewares/catchAsyncError.js';
import Borrowing from '../models/borrowings.js';
import APIFilters from '../utils/apiFilters.js';
import ErrorHandler from '../utils/errorHandler.js';

// Get all borrowings   =>    /api/v1/borrowings
export const getBorrowing = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = new APIFilters(Borrowing.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination();

  const borrowing = await apiFilters.query;

  res.status(200).json({
    success: true,
    length: borrowing.length,
    data: borrowing
  });
});

// Create borrowings   =>   /api/v1/borrowings
export const createBorrowing = catchAsyncErrors(async (req, res, next) => {
  
  req.body.user = req.user.id;
  const borrowing = await Borrowing.create(req.body);

  res.status(200).json({
    success: true,
    message: 'Borrowing Created.',
    data: borrowing
  });
});

// Get a single borrowing with id    =>  /api/v1/borrowing/:id
export const getBorrowingById = catchAsyncErrors(async (req, res, next) => {
  const borrowing = await Borrowing.find({ $and: [{ _id: req.params.id }] });

  if (!borrowing || borrowing.length === 0) {
    return next(new ErrorHandler('Borrowing not found', 404));
  }

  res.status(200).json({
    success: true,
    data: borrowing
  });
});

// Update a book  =>  /api/v1/book/:id
export const updateBorrowing = catchAsyncErrors(async (req, res, next) => {
  let borrowing = await Borrowing.findById(req.params.id);

  if (!borrowing) {
    return next(new ErrorHandler('borrowing not found', 404));
  }

  borrowing = await Borrowing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: 'Borrowing is updated.',
    data: borrowing
  });
});

// Delete a borrowing   =>  /api/v1/borrowing/:id
export const deleteBorrowing = catchAsyncErrors(async (req, res, next) => {
  let borrowing = await Borrowing.findById(req.params.id);

  if (!borrowing) {
      return next(new ErrorHandler('borrowing not found', 404));
  }

  borrowing = await Borrowing.findByIdAndDelete(req.params.id);

  res.status(200).json({
      success: true,
      message: 'Borrowing is deleted.'
  });

})