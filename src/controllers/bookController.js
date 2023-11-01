import catchAsyncErrors from '../middlewares/catchAsyncError.js';
import Book from '../models/books.js';
import APIFilters from '../utils/apiFilters.js';
import ErrorHandler from '../utils/errorHandler.js';

// Get all books   =>    /api/v1/books
export const getBook = catchAsyncErrors(async (req, res, next) => {
  const apiFilters = new APIFilters(Book.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination();

  const book = await apiFilters.query;

  res.status(200).json({
    success: true,
    length: book.length,
    data: book
  });
});

// Create books   =>   /api/v1/books
export const createBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(200).json({
    success: true,
    message: 'book Created.',
    data: book
  });
});

// Get a single book with id    =>  /api/v1/book/:id
export const getBookById = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.find({ $and: [{ _id: req.params.id }] });

  if (!book || book.length === 0) {
    return next(new ErrorHandler('Job not found', 404));
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

// Update a book  =>  /api/v1/book/:id
export const updateBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler('book not found', 404));
  }
  // Check if the user is owner
  if (req.user.role !== 'admin') {
    return next(
      new ErrorHandler(
        `User(${req.user.id}) is not allowed to update this book.`
      )
    );
  }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: 'Book is updated.',
    data: book
  });
});

// Delete a book   =>  /api/v1/book/:id
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
      return next(new ErrorHandler('book not found', 404));
  }

  // Check if the user is owner
  if (req.user.role !== 'admin') {
      return next(new ErrorHandler(`User(${req.user.id}) is not allowed to delete this book.`))
  }

  book = await Book.findByIdAndDelete(req.params.id);

  res.status(200).json({
      success: true,
      message: 'Book is deleted.'
  });

})