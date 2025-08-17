import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
// import { startTransition } from "react";

const app = express();

app.use(express.json());

app.use(
    (req,res,next)=>{
        let token = req.header("Authorization")
        
        if(token != null){
            token = token.replace("Bearer ","")
            console.log(token)
            jwt.verify(token,"jwt-secret",
                (err, decoded)=>{
                    if(decoded == null){
                        res.json({
                            message: "Invalid token please login again"
                        })
                        return
                    }else{
                        req.user = decoded
                    }
                }
            )
        }
        next()
    }
)

/*
function success(){
    console.log("Server is started")
}

app.listen(5000, success)
*/

app.use("/users",userRouter)
app.use("/products", productRouter)


const connectionString = "mongodb://localhost:27017/e-commerce"
// mongoose.connect(connectionString).then(
//     ()=>{
//         console.log("Database connected")
//     }
// ).catch(
//     ()=>{
//         console.log("Database connection failed")
//     }
// )
try {
    mongoose.connect(connectionString).then(()=>console.log("data base connected")
    )

} catch (error) {
    res.status(500).json({success:false,message:"not connected"})
}


app.listen(5000, 
    ()=>{
        console.log("server is running on port 5000")
    }
)