import { DataTypes} from "sequelize";
import { sequelize } from '../Config/database.js';

export const BorrowedBookModel = sequelize.define('BorrowedBook',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    UserId:
    {   
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
                model: 'Users',
                key: 'id'
            }
        
    },
    BookId:
    {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
                model: 'Books',
                key: 'id'
            }

    },
    borrowDate:
    {
        type:DataTypes.DATE
        
    },
    returnDate:
    {
        type:DataTypes.DATE,
        allowNull:true
    },
   
})