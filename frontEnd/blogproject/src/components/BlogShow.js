import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { removeBlog, toggleUpdate } from "../store/index";
import { BlogEdit } from "./BlogEdit";

function BlogShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const { isBlogUpdate, blogBeingEdited } = useSelector(
    (state) => state.update
  );

  const query = useSelector((state) => state.blogSearch.query);

  const foundBlog = blogs.find((blog) => blog.id === id);

  const handleDelete = () => {
    dispatch(removeBlog(id));
    navigate(`/blogs/search?query=${query}`);
  };

  const handleEdit = () => {
    dispatch(toggleUpdate({ id, isUpdate: !isBlogUpdate }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isBlogUpdate && blogBeingEdited === id) {
    return <BlogEdit id={id} />;
  }

  return foundBlog ? (
    <li>
      <img
        src={foundBlog.image}
        alt="Blog"
        style={{ width: "200px", height: "200px" }}
      />
      <div>Title: {foundBlog.title}</div>
      <div>Detail: {foundBlog.detail}</div>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button
        type="button"
        onClick={() => navigate(`/blogs/search?query=${query}`)}
      >
        Return
      </button>
    </li>
  ) : (
    <div>Blog not found</div>
  );
}

export { BlogShow };
