import Express from "express";
import {createAdmin} from "../controller/admin";

const router = Express.Router();
router.post("/admin", createAdmin);

export default router