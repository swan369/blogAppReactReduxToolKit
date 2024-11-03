import { BlogShowBrief } from "./BlogShowBrief";
import { useSelector, useDispatch } from "react-redux";

function BlogListing() {
  const blogs = useSelector((state) => {
    return state.blogs.blogs;
  });

  // useEffect(() => {
  //   dispatch(fetchBlogs());
  // }, [dispatch]);

  const { loading, error } = useSelector((state) => {
    return state.blogs;
  });

  if (loading) return <div>is Loading...</div>;
  if (error) return <div>error: {error} </div>;

  // console.log(blogs);

  const renderedBlogs = blogs
    .filter((blog) => blog) // using filter to get rid of [undefined]
    .map((blog) => {
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
