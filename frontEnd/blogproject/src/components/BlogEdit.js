import { useSelector, useDispatch } from "react-redux";
import {
  updateBlog,
  toggleUpdate,
  visualUpdateBlog,
  changeUpdateDetail,
  changeUpdateTitle,
  fetchBlogs,
} from "../store/index";

import { useEffect } from "react";

function BlogEdit({ id }) {
  const dispatch = useDispatch();

  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );
  const { loading, error } = useSelector((state) => state.blogs);
  const { isBlogUpdate, blogChange } = useSelector((state) => state.update);

  useEffect(() => {
    if (blog) {
      dispatch(visualUpdateBlog(blog));
    }
  }, [blog, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog(blogChange));
    dispatch(toggleUpdate({ id, isUpdate: !isBlogUpdate }));
    dispatch(fetchBlogs());
  };

  if (loading) return <div>is Loading...</div>;
  if (error) return <div>error: {error} </div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          onChange={(e) => dispatch(changeUpdateTitle(e.target.value))}
          value={blogChange.title}
        />

        <label>Detail: </label>
        <input
          onChange={(e) => dispatch(changeUpdateDetail(e.target.value))}
          value={blogChange.detail}
        />

        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => dispatch(toggleUpdate({ id, isUpdate: !isBlogUpdate }))}
      >
        Cancel
      </button>
    </>
  );
}

export { BlogEdit };
