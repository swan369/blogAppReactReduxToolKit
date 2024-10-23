import { BlogCreate } from "./components/BlogCreate";
import { BlogListing } from "./components/BlogListing";
import { BlogShow } from "./components/BlogShow";
import { BlogEdit } from "./components/BlogEdit";
import { BlogSearch } from "./components/BlogSearch";
import { Root } from "./components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { fetchBlogs } from "./store";
import { useDispatch } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // { path: "/", element: <BlogListing /> },
      { path: "blogs", element: <BlogListing /> },
      { path: "blogs/:id", element: <BlogShow /> },
      { path: "blogs/:id/edit", element: <BlogEdit /> },
      { path: "blogs/create", element: <BlogCreate /> },
      { path: "blogs/search", element: <BlogSearch /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <div>
        <BlogCreate />
        <BlogListing />
      </div> */}
    </>
  );
}

export { App };
