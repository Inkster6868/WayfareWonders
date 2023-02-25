import { parse } from "dotenv";
import Tour from "../models/Tour.js";

//Create new Tour
export const createTour=async(req,res)=>{
        const newTour=new Tour(req.body);      /* passing the data for the newtour that has to be created to the schema */
        try {
            const savedTour=await newTour.save();        /* saving the tour */
            res.status(200).json({
                success:true,
                message:"successfully created",
                data:savedTour
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Failed to create, Try again.",
            })
        }
}

//Update tour
export const updateTour=async(req,res)=>{
    const id=req.params.id;
    try {
        const updatedTour= await Tour.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({
            success:true,
            message:"successfully updated",
            data:updatedTour
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to update",
        })
    }
}

//Delete tour
export const deleteTour=async(req,res)=>{
    const id=req.params.id;
    try {
        await Tour.findByIdAndDelete(id)
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

//getSingle tour
export const getSingleTour=async(req,res)=>{
    const id=req.params.id;
    try {
        const tour=await Tour.findById(id).populate("reviews");

        // console.log(id);
        res.status(200).json({
            success:true,
            message:"fetched",
            data:tour
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Tour doesn't exist",
        })
    }
}

// getAll tour
export const getAllTour=async(req,res)=>{

    //for pagination( suppose there are N no of tours on multiple pages in the frontend, so with the help of this page count, we will send the tours)
    const page=parseInt(req.query.page);
    // console.log(page);
    try {
            const tours=await Tour.find({}).populate("reviews").skip(page*8).limit(8); // now when the user clicks on 2nd page then we skip the "first 8 tours" and then limit(8) means only the next 8 will be displayed/sent to the frontend 

            res.status(200).json({
                success:true,
                count:tours.length,                 /* for 0th page(index wise) 8 tours will be dispalyed  */
                message:"fetched all",
                data:tours
            })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"not found",
        })  
    }
}

//get tour by search
export const getTourBySearch=async(req,res)=>{
    const city= new RegExp(req.query.city, 'i') //here i means case in-sensitive
    const distance=parseInt(req.query.distance)
    const maxGroupSize=parseInt(req.query.maxGroupSize);

    try {
        const tours= await Tour.find({city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}}).populate("reviews")
        res.status(200).json({
            success:true,
            message:"fetched",
            data:tours
        });

    } catch (error) {
        res.status(404).json({
            success:false,
            message:"not found",
        });
    }
}

// getFeatured tour
export const getFeaturedTour=async(req,res)=>{
    try {
            const tours=await Tour.find({featured:true}).populate("reviews").limit(8); // now when the user clicks on 2nd page then we skip the "first 8 tours" and then limit(8) means only the next 8 will be displayed/sent to the frontend 

            res.status(200).json({
                success:true,
                message:"fetched featured",
                data:tours  /* sending this data object to the frontend */
            })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"not found",
        })  
    }
}

//get tour counts 
export const getTourCount=async(req,res)=>{
    try {
        const tourCount=await Tour.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            data:tourCount
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"failed to fetch",
        })  
    }
}