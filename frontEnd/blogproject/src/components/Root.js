import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setQuery } from "../store/index";
import { useNavigate } from "react-router";

function Root() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => {
    return state.blogSearch.searchTerm;
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/blogs/search?query=${searchTerm}`);
    dispatch(setSearchTerm(""));
    dispatch(setQuery(searchTerm));
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Search</label>
          <input
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            value={searchTerm}
          ></input>
          <button>submit</button>
        </form>
        <Outlet />
      </div>
    </>
  );
}

export { Root };
