import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String,required: [true, 'Note title required']
},
  body: { type: String,required: [true, 'Note body required']
},
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }
})


export default mongoose.model('Note', NoteSchema);