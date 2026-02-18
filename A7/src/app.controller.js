
import express from 'express';
import { dbconnection } from './database/connection.js';
import userRouter from './modules/users/user.controller.js';
import BookRouter from './modules/books/books.controller.js';
import logRouter from './modules/logs/logs.controller.js';

const app = express();




export const bootstrap = async ()=>
    {

        app.use(express.json());
        app.use('/users', userRouter);
        app.use('/logs', logRouter);
        app.use('/books', BookRouter);
         await dbconnection();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

    }