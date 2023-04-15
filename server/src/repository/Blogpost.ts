import { Blogpost } from "../model/Blogpost";

interface IBlogpostRepository {
  save(post: Blogpost): Promise<void>;
  update(post: Blogpost): Promise<void>;
  delete(postId: number): Promise<void>;
  findById(postId: number): Promise<Blogpost>;
  findAll(): Promise<Blogpost[]>;
}

export class BlogpostRepository implements IBlogpostRepository {

  async save(post: Blogpost): Promise<void> {
    try {
      await Blogpost.create({
        title: post.title,
        body: post.body,
        // We send the current time when the blog post is created as timestamp
        timestamp: new Date().getTime()
      });
    } catch (error) {
      throw new Error("Error while creating blog post");
    }
  }
  async update(post: Blogpost): Promise<void> {
    try {
      const new_post = await Blogpost.findOne({
        where: {
          id: post.id,
        },
      });
      if (!new_post) {
        throw new Error("Blog post not found");
      }
      new_post.title = post.title;
      new_post.body = post.body;
      new_post.timestamp = new Date().getTime().toString();

      await new_post.save();
    } catch (error) {
      throw new Error("Failed to update blog post");
    }
  }
  async delete(postId: number): Promise<void> {
    try {
      const post_to_delete = await Blogpost.findOne({
        where: {
          id: postId,
        },
      });
      if (!post_to_delete) {
        throw new Error("Blog post not found!");
      }

      await post_to_delete.destroy();
    } catch (error) {
      throw new Error("Failed to delete blog post");
    }
  }
  async findById(postId: number): Promise<Blogpost> {
    try {
      const post_found = await Blogpost.findOne({
        where: {
          id: postId,
        },
      });
      if (!post_found) {
        throw new Error("Blog post not found");
      }
      return post_found;
    } catch (error) {
      throw new Error("Failed to get a blog post");
    }
  }
  async findAll(): Promise<Blogpost[]> {
    try {
     return await Blogpost.findAll();
    } catch (error) {
      throw new Error("Failed to fetch blog posts");
    }
  }
  
}