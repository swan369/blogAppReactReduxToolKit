import { useSelector, useDispatch } from "react-redux";
import { BlogShowBrief } from "./BlogShowBrief";
import { useSearchParams } from "react-router-dom";
import { searchedBlogs } from "../store";
import { useEffect } from "react";

const BlogSearch = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const query = searchParams.get("query");

  const blogs = useSelector((state) => state.blogs.blogs);
  const blogsFound = useSelector((state) => state.blogSearch.blogs);

  useEffect(() => {
    dispatch(searchedBlogs({ blogs, query }));
  }, [query, blogs, dispatch]);

  const renderedBlogs =
    blogsFound.length > 0 ? (
      blogsFound.map((blog) => <BlogShowBrief key={blog.id} {...blog} />)
    ) : (
      <div>No results found</div>
    );

  return (
    <>
      <div>
        <ul>{renderedBlogs}</ul>
      </div>
    </>
  );
};

export { BlogSearch };
