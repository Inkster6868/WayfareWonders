// import { parse } from "dotenv";
import User from "../models/User.js";

//Create new User
export const createUser=async(req,res)=>{
        const newUser=new User(req.body);      /* passing the data for the newUser that has to be created to the schema */
        try {
            const savedUser=await newUser.save();        /* saving the User */
            res.status(200).json({
                success:true,
                message:"successfully created",
                data:savedUser
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Failed to create, Try again.",
            })
        }
}

//Update User
export const updateUser=async(req,res)=>{
    const id=req.params.id;
    try {
        const updatedUser= await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({
            success:true,
            message:"successfully updated",
            data:updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to update",
        })
    }
}

//Delete User
export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"successfully deleted",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to delete",
        })
    }
}

//getSingle User
export const getSingleUser=async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await User.findById(id)
        res.status(200).json({
            success:true,
            message:"fetched",
            data:user
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"User doesn't exist",
        })
    }
}

// getAll User
export const getAllUser=async(req,res)=>{
    try {
            const users=await User.find({})
            res.status(200).json({
                success:true,
                message:"fetched all",
                data:users
            })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"not found",
        })  
    }
}
