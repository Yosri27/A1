import { DataTypes} from "sequelize";
import { sequelize } from '../Config/database.js';


 export const BookModel = sequelize.define('Books',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:
    {
        type:DataTypes.STRING,
    allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false,
        

    },
    isbn:
    {
        type:DataTypes.STRING,
         unique:true

    },
    availableCopies:
    {
        type:DataTypes.INTEGER,
        default:"1"
    }
    

})