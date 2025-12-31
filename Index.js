const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const Mypath = path.resolve('data.json');
const app = express();
app.use(express.json());
getdata = fs.readFileSync(Mypath,'utf-8');

app. get('/get-all-users',(req , res)=>
   {
      
      res.json({message:"Welcome to the home page", x:JSON.parse(getdata)});
   })
app.post('/add-user',(req , res)=>{
   let UserData = req.body;
   console.log(UserData);
      
})

app.post('/add-user',(req , res)=>{
let {name, email, age} = req.body;
emailexist = getdata.find((user => user.email == email));
if (emailexist) {
    res.json({message:"User already exists"});
    console.log(emailexist);
    
}
else
{
    
    

}

   
})




app.listen(3000,()=>{
      console.log("Server is running on port 3000");
})