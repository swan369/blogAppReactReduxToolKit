import { useSelector, useDispatch } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
import { changeTitle, changeDetail, addBlog, reset } from "../store/index";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import DOMPurify from "dompurify";

function BlogCreate() {
  const dispatch = useDispatch();

  const [htmlFile, setHtmlFile] = useState(null);

  const { title, detail } = useSelector((state) => {
    return state.form;
  });

  const { loading, error } = useSelector((state) => {
    return state.blogs;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Await the dispatch if addBlog is an asynchronous action
    await dispatch(
      addBlog({ title, detail, imageURL: faker.image.url(), htmlFile })
    );
    // Reset the form after the blog has been added
    dispatch(reset());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHtmlFile(file); // Directly set the File object without sanitization
    } else {
      console.error("No file selected.");
    }
  };

  if (loading) return <div>is Loading...</div>;
  if (error) return <div>error: {error}</div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          onChange={(e) => dispatch(changeTitle(e.target.value))}
          value={title}
        ></input>
        <label>Details: </label>
        <input
          onChange={(e) => dispatch(changeDetail(e.target.value))}
          value={detail}
        ></input>
        <label>Upload an HTML file:</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".html"
          required // to force attach of html file
        />

        <button type="submit">submit</button>
      </form>
    </>
  );
}

export { BlogCreate };
