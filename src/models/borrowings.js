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
          // Pastikan tanggal pengembalian lebih besar dari tanggal peminjaman
          return value > this.borrowDate;
        },
        message: 'Return date must be after borrow date',
      },
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
