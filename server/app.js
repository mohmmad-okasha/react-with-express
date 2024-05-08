
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const port = 3001


//start express app
const app = express()
app.use(cors())// for db connection
app.use(express.json())//to receive json data

//connect to DB
const
    user_name = "swpl",
    password = "123456sw",
    db_name = "test"
mongoose.connect(`mongodb+srv://${user_name}:${password}@cluster0.nljjhtw.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`)

global.db = mongoose;//to access db connection from other files

//Import routes
import usersRouter from './routes/users.js';

//use routes
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`running on ${port}`);
});


//MongoDB swpl 123456sw