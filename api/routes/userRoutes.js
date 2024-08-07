import express from 'express';
import { getAllUsers, createUser, deleteUser, getAdmin, makeAdmin } from '../controllers/userControllers.js';
import  verifyToken  from '../middleware/verifyToken.js';
import  verifyAdmin  from '../middleware/verifyAdmin.js';

const router = express.Router();


router.get('/', verifyToken, verifyAdmin,  getAllUsers);
router.post('/', createUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);
router.get('/admin/:email',verifyToken,   getAdmin);
router.patch('/admin/:id', verifyToken, verifyAdmin,  makeAdmin);

export default router;