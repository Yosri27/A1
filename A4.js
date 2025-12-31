   const express = require('express');
   const fs = require('fs');
   const http = require('http');
   const path = require('path');
   const Mypath = path.resolve('data.json');
   const app = express();
   app.use(express.json());
   getdataparse = JSON.parse(fs.readFileSync(Mypath,'utf-8'));
   getdata = fs.readFileSync(Mypath,'utf-8');

   app. get('/get-all-users',(req , res)=>
      {
         
         res.json({message:"Welcome to the home page", users:getdataparse});
      })


   app.post('/add-user',(req , res)=>{
   let {name, email, age} = req.body;
   emailexist = getdataparse.find((user => user.email == email));
   if (emailexist) {
      res.json({message:"User already exists"});
      
   
   }
   else{
      const id = getdataparse.length + 1;
      getdataparse.push({id,name,email,age});
      fs.writeFileSync(Mypath,JSON.stringify(getdataparse));
      res.json({message:"User added successfully"});


   }

      
   })

   app.get('/get-user-byid/:id',(req , res)=>{
      let id = req.params.id;
     
      if (!id)
         {
            res.json({message:"User id not provided"});
         }
         else
            {
                let user = getdataparse.find(user => user.id == id);
            
               if (!user)
               {
                  res.json({message:"User not found"});
               }
               else
                  {
                 res.json({message:"User found", user:user});

                  }
            }

   })

  app.get('/get-user-byname',(req , res)=>{
      let {name} = req.body;
     
      if (!name)
         {
            res.json({message:"User name not provided"});
         }
         else
            {
                let user = getdataparse.find(user => user.name == name);
            
               if (!user)
               {
                  res.json({message:"User not found"});
               }
               else
                  {
                 res.json({message:"User found", user:user});

                  }
            }

   })

   app.patch('/update-user/:id',(req , res)=>{
      let {id} = req.params;
      let userindex = getdataparse.findIndex(user => user.id == id);
      if(userindex == -1)
      {
         res.json({message:"User not found"});
      }
      else
         {  
            let {name , email, age} = req.body;
            name ? getdataparse[userindex].name = name : null;
            email ? getdataparse[userindex].email = email : null;
            age ? getdataparse[userindex].age = age : null;
            fs.writeFileSync(Mypath,JSON.stringify(getdataparse));
            res.json({message:"User updated successfully", user:getdataparse[userindex]});

         }


      
   });

   app.delete('/delete-user/:id',(req , res)=>{

      let {id} = req.params;
      let userindex = getdataparse.findIndex(user => user.id == id);
      if(userindex == -1)
         {
            res.json({message:"User not found"});
         }
         else
            {
               getdataparse.splice(userindex,1);
               fs.writeFileSync(Mypath,JSON.stringify(getdataparse));
               res.json({message:"User deleted successfully", users:getdataparse});
            }

   })

   app.listen(3000,()=>{
         console.log("server is running on 3000");
         ;
   })