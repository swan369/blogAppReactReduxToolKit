import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { removeBlog } from "../store/index";
import { toggleUpdate } from "../store/index";
import { BlogEdit } from "./BlogEdit";

function BlogShow(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isBlogUpdate } = useSelector((state) => {
    return state.update;
  });

  const query = useSelector((state) => {
    return state.blogSearch.query;
  });

  const blogs = useSelector((state) => {
    return state.blogs.blogs;
  });

  let image;
  let title;
  let detail;

  const found = blogs.find((blog) => blog.id === id);
  if (found) {
    image = found.image;
    title = found.title;
    detail = found.detail;
  }

  const { loading, error } = useSelector((state) => {
    return state.blogs;
  });

  const blogIdBeingEdited = useSelector((state) => {
    return state.update.blogBeingEdited;
  });

  const handleDelete = () => {
    dispatch(removeBlog(id));
    navigate(`/blogs/search?query=${query}`);
  };

  const handleEdit = () => {
    dispatch(toggleUpdate({ id, isUpdate: !isBlogUpdate }));
  };

  if (isBlogUpdate && blogIdBeingEdited === id) {
    return <BlogEdit id={id} />;
  }

  if (loading) return <div>is Loading...</div>;
  if (error) return <div>error: {error} </div>;

  return (
    <>
      <li>
        <img
          src={image}
          alt="a pix"
          style={{ width: "200px", height: "200px" }}
        />
        title: {title} detail: {detail}
        <button type="button" onClick={handleDelete}>
          delete
        </button>
        <button type="button" onClick={handleEdit}>
          edit
        </button>
        <button onClick={() => navigate(`/blogs/search?query=${query}`)}>
          return
        </button>
      </li>
    </>
  );
}

export { BlogShow };
