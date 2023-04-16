import React, { FC, useEffect, useState } from 'react';
import BlogDataService from "../services/blog";
import BasicCard from '../components/home/Card';
import { IBlogData } from '../interfaces/blog';
import { useNavigate } from 'react-router';

const Home: FC = () => {
  const navigate = useNavigate();
  const [blogList, setBlogList] = useState<IBlogData[]>([]);

  useEffect(() => {
    // Fetch the list of blog posts
    BlogDataService.getAll()
      .then((response: any) => {
        setBlogList(response.data.data)
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [blogList]);

  // Delete a post using the id we got from the child component 'BasicCard'
  const deletePost = (id: number): void => {
    BlogDataService.delete(id)
  }

  // Show a post page using the id we got from the child component 'BasicCard'
  const showPostDetails = (id: number): void => {
    navigate(`/show/${id}`)
  }
  return (
    <div>
      {blogList.length && blogList.map((item: IBlogData) => (
        <BasicCard key={item.id} blog={item} deletePost={(id) => deletePost(id)} learnMore={(id) => showPostDetails(id)} />
      ))}
    </div>
  );
}

export default Home;