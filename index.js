const express=require('express');
const userAuthRoute = require('./routers/userAuthRoute');
const { dbConnect } = require('./lib/dbConnect');

const app =express();
app.use(express.json());

app.use("/user",userAuthRoute);


dbConnect();
app.listen(3000,()=>{
    console.log("https://localhost:3000")
})  