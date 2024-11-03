import { useNavigate } from "react-router";
import { getBlogById } from "../store";
import { useDispatch } from "react-redux";

function BlogShowBrief({ title, imageURL, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailShow = () => {
    dispatch(getBlogById(id));
    navigate(`/blogs/${id}`);
  };

  return (
    <>
      <li>
        <img
          onClick={handleDetailShow}
          src={imageURL}
          alt="a pix"
          style={{ width: "200px", height: "200px" }}
        />
        title: {title}
      </li>
    </>
  );
}

export { BlogShowBrief };
