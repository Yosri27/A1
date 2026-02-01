import { Router } from "express";
import { addBook , getAllBooks, getBookbyID } from "./book.service.js";
const router = Router();

router.post('/addbook',async(req, res )=>
    {
        let userData = await addBook(req.body)
        if (userData)
        {
              res.json({message: "Book added successfully", userData});
        }
        else
        {
            res.json({message: "Error"});
        }    
        
    })

 router.get('/getall', async (req , res)=>{
        
            let userData =  await getAllBooks();
            if(userData)
                {
                    res.json({message: "Books:", userData});
                }
                else
                    {
                        res.json({message: "No Books found"});
                    }
      })
 router.get('/getbyid/:id', async (req , res)=>{
        
            let {id} = req.params;
            let userData = await getBookbyID(id);
            if(userData)
                {
                    res.json({message: "Book found:", userData});
                }
                else
                    {
                        res.json({message: "no Book found:"});
                    }

      })








export default router;