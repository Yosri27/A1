import {DatabaseAuth,DatabaseSync} from './Config/database.js'
import {UserModel} from './models/user.js'
import {BookModel} from './models/book.js'
import {BorrowedBookModel} from './models/BorrowedBook.js'
import userRouter from "./users/user.controller.js";
import bookRouter from "./books/books.controller.js";
import borrowRouter from "./borrowedBooks/bb.controller.js";
import express from 'express'
const app = express();
const Boot = async () =>
    {
        app.use(express.json())
        app.use('/users', userRouter);
        app.use('/books', bookRouter);
        app.use('/borrow', borrowRouter);
        await DatabaseAuth()
        await DatabaseSync()
        
 
    }
        app.get('/', (req , res)=>{
    res.json({message: "Hello from app.controller"});
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

  Boot()