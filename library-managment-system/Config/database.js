import Sequelize  from 'sequelize';



 export const sequelize = new Sequelize('library', 'root','',{

    host:'localhost',
    dialect:'mysql'
    
})

export const DatabaseAuth = async()=>
    {
        try {
  await sequelize.authenticate();
  console.log('Connection has been done');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

    }

export const DatabaseSync = async()=>
{
    try{
    await sequelize.sync({alter:true});
    console.log("All synced ");

}catch(error){
    console.error('Unable to connect to the database:', error);
}


}



