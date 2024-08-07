import { createAdmin } from "../controller/admin";

const router = Express.Router();
router.get("/admin", createAdmin);

export default router