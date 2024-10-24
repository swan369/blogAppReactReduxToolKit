import { useSelector, useDispatch } from "react-redux";
import {
  updateBlog,
  toggleUpdate,
  visualUpdateBlog,
  changeUpdateDetail,
  changeUpdateTitle,
} from "../store/index";

import { useEffect } from "react";

function BlogEdit({ id }) {
  const dispatch = useDispatch();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === id)
  );

  const isBlogUpdate = useSelector((state) => {
    return state.update.isBlogUpdate;
  });

  const { loading, error } = useSelector((state) => {
    return state.blogs;
  });

  const updatedBlog = useSelector((state) => {
    return state.update.blogChange;
  });

  useEffect(() => {
    if (blog) {
      dispatch(visualUpdateBlog(blog));
    }
  }, [blog, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog(updatedBlog));
    dispatch(toggleUpdate({ id, isUpdate: !isBlogUpdate }));
  };

  if (loading) return <div>is Loading...</div>;
  if (error) return <div>error: {error} </div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          onChange={(e) => dispatch(changeUpdateTitle(e.target.value))}
          value={updatedBlog.title}
        />

        <label>Detail: </label>
        <input
          onChange={(e) => dispatch(changeUpdateDetail(e.target.value))}
          value={updatedBlog.detail}
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
