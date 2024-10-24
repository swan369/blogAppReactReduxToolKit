import { useNavigate } from "react-router";

function BlogShowBrief({ title, image, id }) {
  const navigate = useNavigate();

  const handleDetailShow = () => {
    navigate(`/blogs/${id}`);
  };

  return (
    <>
      <li>
        <img
          onClick={handleDetailShow}
          src={image}
          alt="a pix"
          style={{ width: "200px", height: "200px" }}
        />
        title: {title}
      </li>
    </>
  );
}

export { BlogShowBrief };
