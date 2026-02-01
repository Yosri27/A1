import { DataTypes} from "sequelize";
import { sequelize } from '../Config/database.js';
import { type } from "os";


export const UserModel = sequelize.define('Users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:
    {
        type:DataTypes.STRING,
    allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:
        {
            isEmail: true
        }

    },
    password:
    {
        type:DataTypes.STRING,
        allowNull:false,

    },
   

})