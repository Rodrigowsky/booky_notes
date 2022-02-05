import Note from '../models/notes.js'
import Book from '../models/books.js'



const noteLogic = {
  createNote: async (req, res) => {
    const book = await Book.findById(req.params.id)
    const note = new Note(req.body.note)
    console.log(book)
    book.notes.push(note)
    await note.save()
    await book.save();
    req.flash('success', 'Successfully created a new note!');
    res.redirect(`/books/${req.params.id}`)
  },
  deleteNote: async (req, res) => {
    const { id, reviewId } = req.params
    await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Note.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/books/${id}`);
  }
  
} 
export default noteLogic;


