import Joi from 'joi';

//custom middleware to validate data on the server side
export const bookSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required().min(0),
    pages: Joi.number().required(),
    goodreadsScore: Joi.number().required(),
    description: Joi.string().required()
  }).required()
});


export const noteSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
  }).required()
});
