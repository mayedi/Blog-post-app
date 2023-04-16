import http from "../http";
import { IBlogData } from "../interfaces/blog"

class BlogDataService {
  // Fetch the whole list of available blog posts
  getAll() {
    return http.get<Array<IBlogData>>("/blogpost");
  }
  // Delete a specific blog post by id
  delete(id: any) {
    return http.delete<any>(`/blogpost/${id}`);
  }
  // Create a new blog post using a payload of title and body
  create(blog: IBlogData) {
    return http.post<IBlogData>("/blogpost", blog);
  }
  // Fetch a blog post by id
  get(id: any) {
    return http.get<IBlogData>(`/blogpost/${id}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BlogDataService();
