import mongoose from "mongoose";
import { books } from "./books.js";
import Book from "../models/books.js";

mongoose.connect("mongodb://localhost:27017/booky-notes");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  //delete everything
  await Book.deleteMany({});

  for (let b of books) {
    const book = new Book({
      title: b.title,
      image: b.image,
      pages: b.pages,
      description: b.description,
      goodreadsScore: b.goodreadsScore,
    });
    await book.save();
  }
};

seedDB().then(() => {
  db.close();
});
