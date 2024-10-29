import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { changeTitle, changeDetail, addBlog, reset } from "../store/index";
import { faker } from "@faker-js/faker";
function BlogCreate() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.form.title);
  const detail = useSelector((state) => state.form.detail);
  const { loading, error } = useSelector((state) => {
    return state.blogs;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Await the dispatch if addBlog is an asynchronous action
    dispatch(
      addBlog({ title, detail, id: nanoid(), imageURL: faker.image.url() })
    );
    // Reset the form after the blog has been added
    dispatch(reset());
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
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export { BlogCreate };
