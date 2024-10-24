import { BlogShowBrief } from "./BlogShowBrief";
import { useSelector } from "react-redux";

function BlogListing() {
  const blogs = useSelector((state) => {
    return state.blogs.blogs;
  });

  const { loading, error } = useSelector((state) => {
    return state.blogs;
  });

  if (loading) return <div>is Loading...</div>;
  if (error) return <div>error: {error} </div>;

  const renderedBlogs = blogs.map((blog) => {
    return <BlogShowBrief key={blog.id} {...blog} />;
  });

  return (
    <>
      <div>
        <ul>{renderedBlogs}</ul>
      </div>
    </>
  );
}

export { BlogListing };
