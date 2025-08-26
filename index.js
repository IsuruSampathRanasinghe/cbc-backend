import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
// import { startTransition } from "react";
dotenv.config();

const app = express();
app.use(cors())

app.use(express.json());

app.use(
    (req,res,next)=>{
        let token = req.header("Authorization")
        
        if(token != null){
            token = token.replace("Bearer ","")
            console.log(token)
            jwt.verify(token,process.env.JWT_SECRET,
                (err, decoded)=>{
                    if(decoded == null){
                        res.json({
                            message: "Invalid token please login again"
                        });
                        return;
                    }else{
                        req.user = decoded;
                        next();
                    }
                }
            );
        }else{
            next();
        }
        
    }
);

/*
function success(){
    console.log("Server is started")
}

app.listen(5000, success)
*/

app.use("/api/users",userRouter)
app.use("/api/products", productRouter)


const connectionString = process.env.MONGO_URI
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
    res.status(500).json({success:false,message:"not connected Successfully"})
}


app.listen(5000, 
    ()=>{
        console.log("server is running on port 5000")
    }
)