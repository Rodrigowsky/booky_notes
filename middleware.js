import {bookSchema, noteSchema} from './schemas.js'
import {ExpressError} from './utils/ExpressError.js'

export const validateBook = (req, res, next) => {
  //JOI. validates the data even before it reaches the database
  const { error } = bookSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400);
  } else {
    //next é necessário para passr ao próximo middleware
    next();
  }
} 


export const validateNote = (req, res, next) => {
  const { error } = noteSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400);
  } else {
    //next é necessário para passr ao próximo middleware
    next();
  }
}