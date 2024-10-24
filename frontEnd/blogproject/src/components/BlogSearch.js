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

  useEffect(() => {
    dispatch(searchedBlogs({ blogs, query }));
  }, [query, blogs, dispatch]);

  const blogsFound = useSelector((state) => state.blogSearch.blogs);

  const renderedBlogs = blogsFound.map((blog) => (
    <BlogShowBrief key={blog.id} {...blog} />
  ));

  return (
    <>
      <div>
        <ul>
          {renderedBlogs.length > 0 ? (
            renderedBlogs
          ) : (
            <li>No results found.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export { BlogSearch };
