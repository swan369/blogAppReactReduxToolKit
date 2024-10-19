import { BlogShow } from "./BlogShow";
import { useSelector } from "react-redux";

function BlogListing() {
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const renderedBlogs = blogs.map((blog) => (
    <BlogShow key={blog.id} {...blog} />
  ));

  return (
    <>
      <div>
        <ul>{renderedBlogs}</ul>
      </div>
    </>
  );
}

export { BlogListing };
