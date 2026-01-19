const fs = require('fs');
const path = require('path');
const Mypath = path.resolve('data.json');
const http = require('http');

/////// part One ///////

function One(){
const stream = fs.createReadStream(Mypath,
   {
      encoding : 'utf-8',
      highWaterMark : 64

   })
stream.on('data',(chunk)=>
   {
      console.log(chunk);
      console.log(chunk.length);
      
   })


   stream.on('end',()=>
      {
         console.log("Success");
      })
    }
    function two(){
        const stream = fs.createReadStream(Mypath,
   {
      encoding : 'utf-8',
      highWaterMark : 64

   })
stream.on('data',(chunk)=>
   {
      console.log(chunk);
      console.log(chunk.length);
      
   })

   const Write = fs.createWriteStream(path.resolve('output.txt'),{encoding : 'utf-8'});
   stream.pipe(Write);


   stream.on('end',()=>
      {
         console.log("Success");
      })
    }

/////// part Two ///////
   

const users = [
  { id: 1, name: "Ahmed Ali", email: "ahmed1@mail.com", age: 22 },
  { id: 2, name: "Mohamed Hassan", email: "mohamed2@mail.com", age: 25 },
  { id: 3, name: "Sara Mahmoud", email: "sara3@mail.com", age: 21 },
  { id: 4, name: "Youssef Adel", email: "youssef4@mail.com", age: 28 },
  { id: 5, name: "Mona Ibrahim", email: "mona5@mail.com", age: 24 },
  { id: 6, name: "Omar Khaled", email: "omar6@mail.com", age: 30 },
  { id: 7, name: "Nour Ahmed", email: "nour7@mail.com", age: 19 },
  { id: 8, name: "Hassan Mostafa", email: "hassan8@mail.com", age: 27 },
  { id: 9, name: "Aya Samir", email: "aya9@mail.com", age: 23 },
  { id: 10, name: "Karim Nabil", email: "karim10@mail.com", age: 26 },
  { id: 11, name: "Reem Fathy", email: "reem11@mail.com", age: 20 },
  { id: 12, name: "Mahmoud Tarek", email: "mahmoud12@mail.com", age: 32 },
  { id: 13, name: "Salma Yasser", email: "salma13@mail.com", age: 22 },
  { id: 14, name: "Mostafa Saeed", email: "mostafa14@mail.com", age: 29 },
  { id: 15, name: "Dina Ashraf", email: "dina15@mail.com", age: 24 },
  { id: 16, name: "Ali Reda", email: "ali16@mail.com", age: 27 },
  { id: 17, name: "Farah Hany", email: "farah17@mail.com", age: 21 },
  { id: 18, name: "Islam Magdy", email: "islam18@mail.com", age: 34 },
  { id: 19, name: "Heba Lotfy", email: "heba19@mail.com", age: 23 },
  { id: 20, name: "Ziad Sameh", email: "ziad20@mail.com", age: 18 }
];
function one()

{
let server = http.createServer(req, res) => {
let {url , method}= req;

}
if(url == "/add-user" && method == "POST")
         {
            let UserData;
            req.on("data",(chunk)=>
               {
                  UserData = JSON.parse(chunk) 
                  
               })
               req.on("end",()=>
                  {
                     if (!UserData.email) {
                           res.write("Email is required");
                           res.end();
                           return;
                     }
                     else if(UserData.email && users.find(user => user.email == UserData.email))
                        
                     {     
                        res.write("Email already exists");
                        res.end();

                     }
                        else
                        {
                            users.push(UserData);
                     res.write(JSON.stringify(users))
                     res.end();
                     

                     }
                     

                    
                     
                  })
             
         }

         server.listen(3000, () => {
   console.log('Server is running on port 3000');
});

};


function two(){
let server = http.createServer((req, res) => {
let {url , method}= req; 
 if(url == "/update-user" && method == "PATCH")
            {
               let id;
               let data;
               req.on("data",(chunk)=>
                  {
                     data = JSON.parse(chunk);
                    
                  })

                  req.on("end",()=>
                     {
                        let UserData = users.find(x => x.id == data.id)
                        UserData.name = data.name
                        res.write(JSON.stringify(users))
                        res.end(); 
                     })

            }

});

server.listen(3000, () => {
   console.log('Server is running on port 3000');
});   
}
function three()

{

    let server = http.createServer((req, res) => {
let {url , method}= req;
 if(url == "/delete-user" && method == "DELETE")
              {

                   let id;
                   let data;
                   req.on("data",(chunk)=>
                      {
                         data = JSON.parse(chunk);

              });
              req.on("end",()=>{
               let UserData = users.splice(users.findIndex(x => x.id ==data.id),1)
               res.write(JSON.stringify(users))
               res.end();

              })
            }

});

server.listen(3000, () => {
   console.log('Server is running on port 3000');
});

}

function four(){
let server = http.createServer((req, res) => {
let {url , method}= req;
if(url == "/get-users" && method == "GET")
   {
      fs.readFile("data.json","utf8",(err, data)=> {
         if (err)
         {
            console.log(err);
            
         }
         else
            {
               res.end(data);
            }

      })
   }

});

server.listen(3000, () => {
   console.log('Server is running on port 3000');
});
}

function five(){

    let server = http.createServer((req, res) => {
let {url , method}= req;
 if(url == "/get-user-by-id" && method == "POST")

      {  
         req.on("data",(x)=>{
           
             id = JSON.parse(x).id; 
            
            
         })
         req.on("end",()=>{

            let UserData = users.find(user =>
               {
                  return user.id == id;
               })

               if (UserData) {
                   res.write(JSON.stringify(UserData));
               res.end();
               
               }else{
                  res.write("No User Found");
                  res.end();
               }
             


         })


      }

});

server.listen(3000, () => {
   console.log('Server is running on port 3000');
});
}

///////////// part Three /////////////

    /*
    1- event loop hya el tare2a elly bt3ml run l code bta3 JS 3la 7sb kol 7aga lw set timeout aw fs aw http aw crypto by5ls 7aga w y4of eh elb3dha y5ls asr3 w y5lso
    2- libuv a5r 7aga fe steps el code b3d m3 code js bykon c++
    3-??
    4-?
    5- blocking code : hwa el code elly by7sl feh 7aga bet5aly el program yestana 7aga t5las zy settimeout
    non-blocking code : hwa el code elly by5als el program ye4te8el 3ady w yestana 7aga t5las fe background w lma t5las ykml
    
    
    
    */