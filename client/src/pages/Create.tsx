import React, { useState } from 'react';
import { BlogForm } from '../components/create/form';
import BlogDataService from "../services/blog";
import { useNavigate } from 'react-router';

interface IError {
  response: {
    data: {
      message: string
    }
  };
}

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  // this state will contain validation errors coming from the API
  const [validationMessage, setValidationMessage] = useState('');

  const submitForm = (title: string, body: string) => {
    BlogDataService.create({ title, body }).then(() => {
      // Once the submit succeeded redirect user to the homepage to see the updated list
      navigate('/')
    })
      .catch((error: IError) => {
        // Set the validation error message from API
        setValidationMessage(error.response.data.message)
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <BlogForm onSubmit={({ title, body }) => {
        submitForm(title, body);
      }} />
      <span style={{ color: "red" }}>{validationMessage}</span>
    </div>

  );
}

export default CreateBlog;