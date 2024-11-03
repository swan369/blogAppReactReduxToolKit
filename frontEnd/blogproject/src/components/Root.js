import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setQuery, setIsQuery } from "../store/index";
import { useNavigate } from "react-router";

function Root() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => {
    return state.blogSearch.searchTerm;
  });

  const handleHome = () => {
    navigate("/blogs");
    dispatch(setIsQuery(false));
    dispatch(setQuery(""));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/blogs/search?query=${searchTerm}`);
    dispatch(setSearchTerm(""));
    dispatch(setQuery(searchTerm));
    dispatch(setIsQuery(true));
  }

  function handleLogin() {
    console.log("handleLogin Clicked");
  }

  return (
    // <>
    //   <div>
    //     <button onClick={handleHome}>Home</button>
    //     <form onSubmit={handleSubmit}>
    //       <label>Search</label>
    //       <input
    //         onChange={(e) => dispatch(setSearchTerm(e.target.value))}
    //         value={searchTerm}
    //       ></input>
    //       <button>submit</button>
    //     </form>
    //     <Outlet />
    //   </div>
    // </>

    <header>
      {/* <div dangerouslySetInnerHTML={{ __html: "<h1>Sample Title</h1>" }} /> */}
      <div onClick={handleHome}>Home</div>
      <form onSubmit={handleSubmit}>
        <label>Search:</label>
        <input
          type="text"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          value={searchTerm}
        />
        <button>🔍</button>
      </form>
      <div>
        <span onClick={handleLogin} style={{ cursor: "pointer" }}>
          Login
        </span>
        <button onClick={() => navigate("/blogs/create")}>create</button>
      </div>
      <Outlet />
    </header>
  );
}

export { Root };
