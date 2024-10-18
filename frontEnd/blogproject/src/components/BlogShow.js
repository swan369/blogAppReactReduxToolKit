import { useDispatch } from "react-redux";
import { removeBlog } from "../store";

function BlogShow({ id, title, detail }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeBlog(id));
  };

  const handleEdit = () => {
    //..//
  };
  return (
    <>
      <li>
        title: {title} detail: {detail}
        <button type="button" onClick={handleDelete}>
          delete
        </button>
        <button type="button" onClick={handleEdit}>
          edit
        </button>
      </li>
    </>
  );
}

export { BlogShow };
