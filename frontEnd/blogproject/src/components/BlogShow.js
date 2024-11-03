import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  removeBlog,
  toggleUpdate,
  fetchBlogs,
  getBlogById,
} from "../store/index";
import { BlogEdit } from "./BlogEdit";
import DOMPurify from "dompurify";
import { useState } from "react";

function BlogShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [fileContent, setFileContent] = useState(null);

  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const { isBlogUpdate, blogBeingEdited } = useSelector(
    (state) => state.update
  );

  const { query, isQuery } = useSelector((state) => state.blogSearch);

  const foundBlog = blogs.find((blog) => blog.id === id);

  const handleDelete = async () => {
    await dispatch(removeBlog(id));
    dispatch(fetchBlogs());
    if (isQuery) {
      navigate(`/blogs/search?query=${query}`);
    } else navigate(`/blogs`);
  };

  const handleEdit = () => {
    dispatch(toggleUpdate({ id, isUpdate: !isBlogUpdate }));
  };

  const handleIsQuery = () => {
    if (isQuery) {
      navigate(`/blogs/search?query=${query}`);
    } else navigate(`/blogs`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isBlogUpdate && blogBeingEdited === id) {
    return <BlogEdit id={id} />;
  }

  return foundBlog ? (
    <li>
      <img
        src={foundBlog.imageURL}
        alt="Blog"
        style={{ width: "200px", height: "200px" }}
      />
      <div>Detail: {foundBlog.detail}</div>
      <div dangerouslySetInnerHTML={{ __html: foundBlog.content }} />

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" onClick={handleIsQuery}>
        Return
      </button>
    </li>
  ) : (
    <div>Blog not found</div>
  );
}

export { BlogShow };
