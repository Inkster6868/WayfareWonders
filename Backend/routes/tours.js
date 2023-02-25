import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from "../controllers/tourController.js";
import express from 'express';

const router=express.Router();
import {verifyAdmin} from "../utils/verifyToken.js";

//create new tour
router.post('/', verifyAdmin, createTour);   /* the post request on the base url will go for the creation of the database */

//update tour
router.put('/:id',verifyAdmin, updateTour);   /* the post request on the base url will go for the creation of the database */

//delete tour
router.delete('/:id',verifyAdmin,deleteTour);   /* the post request on the base url will go for the creation of the database */

//get single tour
router.get('/:id', getSingleTour);   /* the post request on the base url will go for the creation of the database */

//getAll tour
router.get('/',getAllTour);   /* the post request on the base url will go for the creation of the database */

//getTour by search(query filters)
router.get('/search/getTourBySearch',getTourBySearch);   

//getfeatured tours, only those tours whose featured value will be set to true
router.get('/search/getFeaturedTours',getFeaturedTour); 

//get Tour count(total no of tours).
router.get('/search/getTourCount',getTourCount); 

// router.use("*","Invalid endpoint");

export default router;