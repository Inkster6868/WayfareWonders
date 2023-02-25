import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router=express.Router();
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

//update user
router.put('/:id',verifyUser,updateUser);   /* the post request on the base url will go for the creation of the database */

//delete user
router.delete('/:id',verifyUser,deleteUser);   /* the post request on the base url will go for the creation of the database */

//get single user
router.get('/:id',verifyUser, getSingleUser);   /* the post request on the base url will go for the creation of the database */

//getAll user
router.get('/', verifyAdmin ,getAllUser); 

export default router;