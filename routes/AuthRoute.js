import Express from "express";
import {
    Login,
    Logout,
    Me,
} from "../controller/Auth.js"

const router = Express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', Logout);


export default router