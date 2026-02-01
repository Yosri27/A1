
import {BorrowedBookModel} from '../models/BorrowedBook.js'




export const borrow = async (data)=>
    {
        let {userId , bookID } = data
        let userData = await BorrowedBookModel.findOne({where:{BookID : bookID}})
        console.log(userData);
        
    }