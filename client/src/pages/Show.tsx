import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogDataService from "../services/blog";
import { IBlogData } from '../interfaces/blog';
import { useNavigate } from 'react-router';
import { Grid, Typography } from '@mui/material';

const ShowBlog: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState<IBlogData>({});

    useEffect(() => {
        // Fetch the blog post by id
        BlogDataService.get(id)
            .then((response: any) => {
                setBlogPost(response.data.data)
            })
            .catch(() => {
                // If blog post was not found then redirect to homepage
                navigate('/')
            });
    }, [blogPost, id, navigate]);
    return (
        <div style={{ textAlign: "center" }}>
            <Grid item xs={12} md={6}>
                <Typography component="h2" variant="h5">
                    {blogPost.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {blogPost.createdAt}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    {blogPost.body}
                </Typography>
            </Grid>
        </div>
    );
}

export default ShowBlog;