const express = require('express');
const mongoose = require('mongoose');
const dotenv =require("dotenv")
const expressLayouts=require("express-ejs-layouts")
const userRoutes=require("./routes/user")
// const bodyParser = require('body-parser');
// const homeRoutes = require('./routers/home');

const app = express();
dotenv.config()

// Connection With MongoDB
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection;
db.on('eror',()=>{
    console.log("Err is ");
})
db.once('open',()=>{
    console.log("MongoDB Connected");
})

/*
EJS simplifies the process of generating HTML content dynamically on the server-side, 
making it a convenient choice for building web applications with Node.js and Express.js.*/

// View Engine...............................
app.use(expressLayouts)
app.set('view engine','ejs');
// public folder for css and js
app.use(express.static("public"))



//routes
app.get("/", (req,res)=>{
    res.render("index")
})

// user - routes
app.use("/article",userRoutes)



const PORT = process.env.PORT|| 8000;
app.listen(PORT, ()=>{
    console.log(`Node Server is Running on Port ${PORT}`)
})