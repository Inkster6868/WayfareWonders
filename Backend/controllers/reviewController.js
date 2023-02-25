import Tour from "../models/Tour.js";
import Review from "../models/Review.js";


export const createReview=async(req,res)=>{
    const tourId = req.params.tourId;
    const newReview=new Review({...req.body});

    try {
        const savedReview= await newReview.save();

        //after creating a new review, now update the reviews array of the tour model.
        await Tour.findByIdAndUpdate(tourId,{
            $push:{reviews:savedReview._id}  /* linking review to the its specified tour, the push operation in mongodb, pushes the element in the array, with following syntax <field name>:[value to be inserted inside this array]  */
        })

        res.status(200).json({success:true, message:'Review Submitted', data:savedReview})
    } catch (error) {
        if(!req.body.rating) res.status(500).json({success:false, message:"please select the rating"})
        else res.status(500).json({success:false, message:error.message})
    }
}