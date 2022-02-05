import Book from '../models/books.js'


const bookLogic = {
  index: async (req, res) => {
    const booksIndex = await Book.find({})
    res.render('books/index', { booksIndex })
  },
  renderNewForm: async (req, res) => {
    res.render('books/new')
  },
  createBook: async (req, res) => {
    const book = new Book(req.body.book)
    await book.save();
    req.flash('success', 'Successfully created a new book!');
    res.redirect('books')
  },
  showBook: async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate('notes')
    res.render('books/book', { book })
  }, 
  renderEditForm: async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id)
    res.render('books/edit', { book })
  }, 
  updateBook: async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book })
    req.flash('success', 'Successfully updated the book!');
    res.redirect(`/books/${book._id}`)
  },
  deleteBook: async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id)
    req.flash('atention', 'Book Deleted');
    res.redirect('/books')
  }
  
} 
export default bookLogic;