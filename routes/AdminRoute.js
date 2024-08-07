import Express from "express";
import { createAdmin } from "../controller/admin";
import router from "./AuthRoute";

const router = Express.Router();

router.post("/post",createAdmin)

export default router