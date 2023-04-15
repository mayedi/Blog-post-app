import { z } from "zod";

export const createBlogPostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Title must be greater than 1 characters!" }),
    body: z
      .string()
      .min(4, { message: "body must be greater than 4 characters!" }),
  }),
});

export const updateBlogPostSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      title: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      body: z
        .string()
        .min(4, { message: "Descrition must be greater than 4 characters!" }),
    })
    .partial(),
});
