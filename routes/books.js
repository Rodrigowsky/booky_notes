import express from 'express';
import axios from 'axios';
import Book from '../models/books.js';
import catchAsync  from '../utils/catchAsync.js';
import { validateBook } from '../middleware.js'
const router = express.Router();
import bookLogic from '../controllers/books.js'

router.get('/', catchAsync(bookLogic.index))

router.get('/new', catchAsync(bookLogic.renderNewForm))

router.post('/', validateBook, catchAsync(bookLogic.createBook))

router.get('/:id', catchAsync(bookLogic.showBook))

router.get('/:id/edit', catchAsync(bookLogic.renderEditForm))

router.put('/:id', validateBook, catchAsync(bookLogic.updateBook))

router.delete('/:id', catchAsync(bookLogic.deleteBook))

export default router;

// router.get('/', (req, res) => {
//   axios.get('https://www.boredapi.com/api/activity')
//   .then(function (response) {
//     res.send(response.data)
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
// })



/*
get /books
get /books/new
post /books
get /books/id
get /books/id/edit
put /books/id
delete /books/id
*/