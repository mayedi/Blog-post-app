import BaseRoutes from "./base/BaseRouter";
import BlogpostController from "../controller/BlogpostController";
import validate from "../helper/validate";
import { createBlogPostSchema, updateBlogPostSchema } from "../schema/BlogpostSchema";
import express from "express";

class BlogpostRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("", validate(createBlogPostSchema), BlogpostController.create);
    this.router.patch(
      "/:id",
      validate(updateBlogPostSchema),
      BlogpostController.update
    );
    this.router.delete("/:id", BlogpostController.delete);
    this.router.get("", BlogpostController.findAll);
    this.router.get("/:id", BlogpostController.findById);
  }
}

export default new BlogpostRoutes().router as express.Router