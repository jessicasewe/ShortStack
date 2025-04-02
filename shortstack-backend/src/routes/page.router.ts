import { Router } from "express";
import {
  createPageHandler,
  getAllPagesHandler,
  getPageByIdHandler,
  updatePageHandler,
  deletePageHandler,
} from "../controllers/page.controller";

const pageRouter = Router();

pageRouter.post("/pages", createPageHandler as any);
pageRouter.get("/pages/:userId", getAllPagesHandler);
pageRouter.get("/page/:id", getPageByIdHandler as any);
pageRouter.put("/page/:id", updatePageHandler as any);
pageRouter.delete("/page/:id", deletePageHandler as any);

export default pageRouter;
