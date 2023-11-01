import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: [true, 'Please enter your name']
    },
    penulis: {
      type: String,
      required: [true, 'Please enter your email address'],
    },
    penerbit: {
      type: String,
      required: [true, 'Please enter your email address'],
    },
    tahun_terbit: {
      type: String,
      required: [true, 'Please enter tahun terbit']
    },
    jumlah_tersedia: {
      type: Number,
      required: [true, 'Please enter jumlah ketersedian']
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Book', userSchema);
