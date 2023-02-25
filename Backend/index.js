import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/booking.js";


dotenv.config();
const app=express(); 
const port=process.env.PORT || 8000;
const corsOptions={
        origin:true,
        credentials:true
}

//database connection
mongoose.set("strictQuery",false);     /* in the next release it will be by default set to false, so we are manually setting it to the false so that the codebase remains compatible with the next update */
const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,              /* prevents the deprecation warning of the 'newstringparser' introduced by mongodb recently, settng this to 'true' takes us to the old stringparser without any issue of deprecation being raised */
            useUnifiedTopology:true        /* this removes the support for several connection options that are no longer relevant, we use the unifiedTopology to use the new unified engine */
        })
        console.log("MongoDB database connected")
    } catch (error) {
            console.log(error.message);
    }
}

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions));
app.use('/api/v1/auth' ,authRoute);    /* all auth req go here */
app.use('/api/v1/tours' ,tourRoute);    /* all tours req go here */ 
app.use('/api/v1/users' ,userRoute);     /* all users req go here */
app.use('/api/v1/review' ,reviewRoute);     /* all review entering req go here */
app.use('/api/v1/booking' ,bookingRoute);     /* all review entering req go here */


app.listen(port, ()=>{
    connect();
    console.log('server is listening on', port);     
});