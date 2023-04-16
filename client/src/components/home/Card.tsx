import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IBlogData } from '../../interfaces/blog';

interface IBlogCard {
  blog: IBlogData,
  deletePost: (arg: number) => void,
  learnMore: (arg: number) => void
}

const BasicCard: FC<IBlogCard> = ({ blog, deletePost, learnMore }) => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="h5" component="div">
        {blog.body}
      </Typography>
      <Typography variant="body2">
        {blog.createdAt}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" onClick={() => deletePost(blog.id)}>Delete</Button>
      <Button size="small" variant="contained" onClick={() => learnMore(blog.id)}>Learn more</Button>
    </CardActions>
  </Card>
);
export default BasicCard