import { Blogpost } from '../model/Blogpost';
import { BlogpostRepository } from '../repository/Blogpost';

jest.mock('../model/Blogpost');

const mockCreate = jest.fn();
const mockFindOne = jest.fn();
const mockDestroy = jest.fn();
const mockSave = jest.fn();
const mockAll = jest.fn();

(Blogpost as jest.Mocked<any>).findOne = mockFindOne;
(Blogpost as jest.Mocked<any>).create = mockCreate;
(Blogpost as jest.Mocked<any>).prototype.destroy = mockDestroy;
(Blogpost as jest.Mocked<any>).prototype.save = mockSave;
(Blogpost as jest.Mocked<any>).findAll = mockAll;

describe('BlogpostRepository', () => {
  const repository = new BlogpostRepository();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should create a new blog post', async () => {
      const post = new Blogpost();
      post.title = 'Test post title';
      post.body = 'Test post body';

      await repository.save(post);

      expect(mockCreate).toHaveBeenCalledWith({
        title: post.title,
        body: post.body,
        timestamp: expect.any(Number),
      });
    });

    it('should throw an error if creating a blog post fails', async () => {
      const post = new Blogpost();
      post.title = 'Test post title';
      post.body = 'Test post body';

      mockCreate.mockRejectedValue(new Error('Failed to create'));

      await expect(repository.save(post)).rejects.toThrow('Error while creating blog post');
    });
  });
  describe('update', () => {
    it('should update an existing blog post', async () => {
      const post = new Blogpost();
      post.id = 1;
      post.title = 'Updated post title';
      post.body = 'Updated post body';

      mockFindOne.mockResolvedValueOnce(post);

      await repository.update(post);

      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          id: post.id,
        },
      });

      expect(mockSave).toHaveBeenCalled();
    });

    it('should throw an error if updating a non-existing blog post', async () => {
      const post = new Blogpost();
      post.id = 1;
      post.title = 'Updated post title';
      post.body = 'Updated post body';

      mockFindOne.mockResolvedValueOnce(null);

      await expect(repository.update(post)).rejects.toThrow('Failed to update blog post');
    });

    it('should throw an error if updating a blog post fails', async () => {
      const post = new Blogpost();
      post.id = 1;
      post.title = 'Updated post title';
      post.body = 'Updated post body';

      mockFindOne.mockResolvedValueOnce(post);
      mockSave.mockRejectedValue(new Error('Failed to update'));

      await expect(repository.update(post)).rejects.toThrow('Failed to update blog post');
    });
  });
  describe('findAll', () => {
    it('should return an empty array if no blog posts exist', async () => {
      mockAll.mockResolvedValueOnce([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
      expect(mockAll).toHaveBeenCalled();
    });

    it('should return an array of all existing blog posts', async () => {
      const post1 = new Blogpost();
      post1.id = 1;
      post1.title = 'Test post title 1';
      post1.body = 'Test post body 1';

      const post2 = new Blogpost();
      post2.id = 2;
      post2.title = 'Test post title 2';
      post2.body = 'Test post body 2';

      mockAll.mockResolvedValueOnce([post1, post2]);

      const result = await repository.findAll();

      expect(result).toEqual([post1, post2]);
      expect(mockAll).toHaveBeenCalled();
    });

    it('should throw an error if fetching blog posts fails', async () => {
      mockAll.mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(repository.findAll()).rejects.toThrow('Failed to fetch blog posts');
    });
  });

  describe('findById', () => {
    it('should return the blog post with the specified ID', async () => {
      const postId = 1;
      const post = new Blogpost();
      post.id = postId;
      post.title = 'Test post title';
      post.body = 'Test post body';

      mockFindOne.mockResolvedValueOnce(post);

      const result = await repository.findById(postId);

      expect(result).toEqual(post);
      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          id: postId,
        },
      });
    });

    it('should throw an error if the specified blog post does not exist', async () => {
      const postId = 1;

      mockFindOne.mockResolvedValueOnce(null);

      await expect(repository.findById(postId)).rejects.toThrow('Failed to get a blog post');
      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          id: postId,
        },
      });
    });

    it('should throw an error if fetching the blog post fails', async () => {
      const postId = 1;

      mockFindOne.mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(repository.findById(postId)).rejects.toThrow('Failed to get a blog post');
      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          id: postId,
        },
      });
    });
  });


});

