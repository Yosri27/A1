import {BookModel} from '../models/book.js'

export const addBook =async (data)=>
    {
        let {title, author,isbn,availableCopies} = data;
        let userData = await BookModel.create({title,author,isbn,availableCopies})
        return userData;
    }

export const getAllBooks = async ()=>
    {
        let books = await BookModel.findAll();
        return books;
    }
export const getBookbyID = async (id)=>
    {
        let Data = await BookModel.findOne({where:{id:id}})
        return Data;
    }