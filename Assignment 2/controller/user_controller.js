// const UserModel= require('../models/user_model')



// const addUser= async (req,res)=>{

//     const {name, email, username, password}=req.body;

//     if(!name || !email || !username || !password){
//         return res.status(400).json({
//             message:'Name, Email, Username, Password Fields are Madatory...!!'
//         })
//     }

//     const newUser=new UserModel({
//         name,email,username,password
//     });

//     try {
//         const resp=await newUser.save();
//         res.status(201).json({
//             message:'User Added Successfully',
//             data:resp
//         })

//     }  catch (error){
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }
// // to fetch all users
// const getAllUsers=async (req,res)=>{
//     try {
//         const users=await UserModel.find();//fethc the dat6a from Database
//         res.status(200).json({
//             message:'User Fetched Successfully',
//             data:users
//         })
//     } catch (error) {
        
//     }
// }
// //get user by id
// const getUserById=async (req,res)=>{
//     const {id}=req.params;
//     try {
//         const user=await UserModel.findById(id);
//         res.status(200).json({
//             message:'User Fetched Successfully',
//             data:user
//         })
        
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }

// const deleteUserById=async (req,res)=>{
//     const {id}=req.params;
//     try {
//         const user=await UserModel.findByIdAndDelete(id);
//         res.status(200).json({
//             message:'User Deleted Successfully',
//             data:user
//         })
        
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }

// const updateUserById=async (req,res)=>{
//     const {id}=req.params;
//     try {
//         const user=await UserModel.findByIdAndUpdate(id,req.body);
//         res.status(200).json({
//             message:'User Updated Successfully',
//             data:user
//         })
        
//     } catch (error) {
//         res.status(500).json({
//             message:error.message
//         })
//     }
// }
// module.exports={addUser,getAllUsers, getUserById, deleteUserById, updateUserById}