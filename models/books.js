import mongoose from 'mongoose';
import Note from './notes.js'
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title required']
  },
  image: String,
  pages: String, 
  description: String,
  goodreadsScore: Number,
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

BookSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Note.remove({
      _id: {
        $in: doc.notes
      }
    })
  }
})

export default mongoose.model('Book', BookSchema);