import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const returnDate = new Date(value);
          const borrowDate = new Date(this.borrowDate);

          return returnDate > borrowDate;
        },
        message: 'Return date must be after borrow date',
      },
    },
    dayDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['On Time', 'Late'],
      default: 'On Time',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model('Borrowing', borrowingSchema);
