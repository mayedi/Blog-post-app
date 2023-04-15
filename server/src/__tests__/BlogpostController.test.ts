import { Request, Response } from "express";
import BlogpostController from "../controller/BlogpostController";
import { Blogpost } from "../model/Blogpost";
import { BlogpostRepository } from "../repository/Blogpost";
import { Sequelize } from "sequelize-typescript"

// Setting up db instance for testing
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory:',
});
sequelize.addModels([Blogpost]);

describe("BlogpostController", () => {
  describe("findAll", () => {
    it("should return all blog posts", async () => {
      const mockPosts: Blogpost[] = [
        new Blogpost({
          id: 1,
          title: "First post",
          body: "This is the first post",
          timestamp: new Date(),
        }),
        new Blogpost({
          id: 2,
          title: "Second post",
          body: "This is the second post",
          timestamp: new Date(),
        }),
      ];

      jest.spyOn(BlogpostRepository.prototype, "findAll").mockResolvedValueOnce(mockPosts);


      // For status we need to return 'this' to support method chaining. Since the status will be chained upon 
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await BlogpostController.findAll({} as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mockPosts,
      });
    });
  });

  describe("update", () => {
    it("should update a blog post", async () => {
      const mockId = 1;
      const mockPost = { title: "Updated Test Post", body: "Updated body content" };

      jest.spyOn(BlogpostRepository.prototype, "update").mockResolvedValueOnce();

      const req = { params: { id: mockId }, body: mockPost } as unknown as Request;
      // For status we need to return 'this' to support method chaining. Since the status will be chained upon 
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await BlogpostController.update(req, res);

      expect(BlogpostRepository.prototype.update).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockId,
          title: mockPost.title,
          body: mockPost.body,
        })
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Blog post updated",
      });
    });
  });
});