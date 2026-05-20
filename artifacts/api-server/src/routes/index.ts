import { Router, type IRouter } from "express";
import contactRouter from "./contact";
import eventsRouter from "./events";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(eventsRouter);

export default router;
