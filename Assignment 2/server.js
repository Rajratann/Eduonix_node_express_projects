const express=require('express');
const connectDB=require('./dbconfig');
const dotenv=require('dotenv').config();
const PORT=process.env.PORT | 5000;
const app=express();

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api/auth",require('./routes/user_routes'));
app.use('/api/blog', require('./routes/Post_routes'));

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})