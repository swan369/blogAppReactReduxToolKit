import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { changeTitle, changeDetail, addBlog, reset } from "../store/index";

function BlogCreate() {
  const title = useSelector((state) => state.form.title);
  const detail = useSelector((state) => state.form.detail);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlog({ title, detail, id: nanoid() }));
    dispatch(reset());
  };

  const handleTitleChange = (e) => {
    dispatch(changeTitle(e.target.value));
  };

  const handleDetailChange = (e) => {
    dispatch(changeDetail(e.target.value));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input onChange={handleTitleChange} value={title}></input>
        <label>Details: </label>
        <input onChange={handleDetailChange} value={detail}></input>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export { BlogCreate };
