import { Request, Response } from "express";
import { Blogpost } from "../model/Blogpost";
import { BlogpostRepository } from "../repository/Blogpost";

class BlogpostController {
  async create(req: Request, res: Response) {
    try {
    // creating a new Blogpost based on model and populating it with data from the payload
      const new_post = new Blogpost();
      new_post.title = req.body.title;
      new_post.body = req.body.body;

      await new BlogpostRepository().save(new_post);

      res.status(201).json({
        message: "Blog post created!",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
    // We convert the id from the api params into an integer and then use it to find the blog post and delete it
      const id = parseInt(req.params["id"]);
      await new BlogpostRepository().delete(id);

      res.status(200).json({
        message: "Blog post deleted",
      });
    } catch (err) {
        console.log(err)
      res.status(500).json({
        err,
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
    // We convert the id from the api params into an integer and then use it to find the blog post and send it back
      let id = parseInt(req.params["id"]);
      const post_found = await new BlogpostRepository().findById(id);

      res.status(200).json({
        data: post_found,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
    // We simply return the list of all blog posts
      const postsList = await new BlogpostRepository().findAll();

      res.status(200).json({
        data: postsList,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
    // We convert the id from the api params into an integer
      let id = parseInt(req.params["id"]);
      const post_to_update = new Blogpost();
    // We create a new blog post with the id that we got from param which will override the blog post with the same id from db
      post_to_update.id = id;
      post_to_update.title = req.body.title;
      post_to_update.body = req.body.body;

      await new BlogpostRepository().update(post_to_update);

      res.status(200).json({
        message: "Blog post updated",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }
}

export default new BlogpostController()