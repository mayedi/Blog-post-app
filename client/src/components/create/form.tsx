import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";

interface Values {
  title: string;
  body: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

export const BlogForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ title: "", body: "" }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
        <div>
            <TextField placeholder="Post title" name="title" value={values.title} onChange={handleChange}/>
        </div>
        <div>
            <TextField placeholder="Post body" name="body" value={values.body} onChange={handleChange}/>
        </div>
        <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};