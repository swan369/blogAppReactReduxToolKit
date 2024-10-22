import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { changeTitle, changeDetail, addBlog, reset } from "../store/index";

function BlogCreate() {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.form.title);
  const detail = useSelector((state) => state.form.detail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBlog({ title, detail, id: nanoid() }));
    dispatch(reset());
  };

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
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export { BlogCreate };
