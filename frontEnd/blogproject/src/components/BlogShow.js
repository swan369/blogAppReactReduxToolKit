import { useDispatch, useSelector } from "react-redux";
import { removeBlog } from "../store/index";
import { toggleUpdate } from "../store/index";
import { BlogEdit } from "./BlogEdit";

function BlogShow({ id, title, detail }) {
  const dispatch = useDispatch();
  const { isBlogUpdate } = useSelector((state) => {
    return state.update;
  });

  const handleDelete = () => {
    dispatch(removeBlog(id));
  };

  const handleEdit = () => {
    dispatch(toggleUpdate());
  };

  console.log(isBlogUpdate);

  if (isBlogUpdate) {
    return <BlogEdit id={id} />;
  }

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
