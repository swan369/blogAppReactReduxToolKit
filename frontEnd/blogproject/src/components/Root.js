import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, searchedBlogs } from "../store/index";
// import { useState } from "react";

function Root() {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => {
    return state.blogs.blogs;
  });

  console.log(blogs);

  const search = useSelector((state) => {
    return state.blogSearch.searchTerm;
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchedBlogs(blogs));
    console.log("hello");
    //...//
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          value={search}
        ></input>
        <button>submit</button>
      </form>
      <Outlet />
    </div>
  );
}

export { Root };
