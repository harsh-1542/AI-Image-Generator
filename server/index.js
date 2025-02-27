import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import express from 'express'
import PostRouter from './routes/Posts.js';
import UserRouter from './routes/User.js';
import ganerateImageRouter from './routes/GenerateImage.js';
import { authMiddleware } from './middleware/auth.js';

// heeloo
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));


// error handlers
app.use((err,req, res, next) =>{
    const status = err.status || 500;
    const  message = err.message || "something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message});
});

app.use("/api",authMiddleware);

app.use('/api/post',PostRouter);
app.use('/', UserRouter);
app.use('/api/generateimage',ganerateImageRouter);


app.get('/api/home',(req, res) => {
    res.status(200).json({
        message : "hello this is AI image generation "
    })

});

app.get('/home',(req, res) => {
    res.status(200).json({
        message : "hello this is AI image generation "
    })

});


// function to connect to mongodb server
const connectDB = () =>{
    mongoose.set("strictQuery", true)
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log("MongoDB Connected"))
    .catch((err) =>{
        console.error("failed to connect to DB");
        // console.error(err);
    })
}

const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log("server is listening on 8080"));
    } catch (error) {
        console.log("internal server error at server starting ");
    }
}
 
startServer();