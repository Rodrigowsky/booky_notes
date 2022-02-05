import express from "express";
import mongoose from "mongoose";
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import ejsMate from 'ejs-mate';
import { ExpressError } from './utils/ExpressError.js';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'req-flash';

//routes import
import books from './routes/books.js';
import notes from './routes/notes.js';

const app = express();

const sessionOptions = { secret: 'justatestfordemoapptouseflashmessages', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));


//General Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());


app.use((req, res, next) =>
{ 
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.atention = req.flash('atention');
  next();
})


//View Engine Stuff
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//middleware para express router
app.use('/books', books)
app.use('/books/:id', notes)


//Errors
app.all('*', (req, res, next) => {
  next(new ExpressError('PageNot Found',404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', {err});
})


// Database Setup
mongoose.connect('mongodb://localhost:27017/booky-notes');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Database connected")
})



app.listen(3000, () => {
  console.log("App Server Running");
});





