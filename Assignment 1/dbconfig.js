const mongoose=require('mongoose');



async function connectDB(){
    try{
        const conn= await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("DB Connected Successfully");

    } catch (error) {
            console.log("Error",error);
    }
}

module.exports=connectDB;