
import express  from "express";
import { Server } from "socket.io";
import cors from "cors"

export const bootstrap = async () => {
  
        const app = express()
        const port = 3000
        app.use(express.json())
        app.use(cors({
            origin:"*"
        }))

        const io = new Server(port,{

            cors:{origin:"*" }

        })
        io.on("connection",()=>{
            console.log("backend socket connected");
            
        })


        app.listen(port,()=>{
            console.log("server is running on port 3000");
            
        })









        console.log("a7la msaaa");
        
}