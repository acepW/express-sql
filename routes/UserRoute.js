import Express from "express";
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controller/Users.js";

import { verifyUser, superAdminOnly } from "../middleware/AuthUser.js";

const router = Express.Router();

router.get('/users', verifyUser, superAdminOnly, getUsers);
router.get('/users/:id', verifyUser, superAdminOnly, getUsersById);
router.post('/users', verifyUser, superAdminOnly, createUsers);
router.patch('/users/:id', verifyUser, superAdminOnly, updateUsers);
router.delete('/users/:id', verifyUser, superAdminOnly, deleteUsers);


export default router