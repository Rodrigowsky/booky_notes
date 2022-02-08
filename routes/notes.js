import express from 'express';
import catchAsync  from '../utils/catchAsync.js';
import { validateNote } from '../middleware.js'
const router = express.Router({mergeParams:true});
import noteLogic from '../controllers/notes.js'

router.post('/newnote', catchAsync(noteLogic.createNote))
router.delete('/:noteId/dnote', catchAsync(noteLogic.deleteNote))



export default router;



