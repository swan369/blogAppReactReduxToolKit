import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = "http://localhost:3021";

// ("blog/fetchBlogs can be named anything, it is used as identifier");
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const response = await axios.get(`${BASEURL}/blogs`);
  return response.data;
});

export const addBlog = createAsyncThunk("blog/addBlogs", async (newBlog) => {
  const formData = new FormData();

  // Append fields to the FormData object // u still need to create Object else won't work
  formData.append("title", newBlog.title);
  formData.append("detail", newBlog.detail);
  formData.append("imageURL", newBlog.imageURL);
  formData.append("htmlFile", newBlog.htmlFile);

  // console.log("in thunks:", newBlog.htmlFile);

  try {
    const response = await axios.post(`${BASEURL}/blogs/create`, formData);

    console.log("returned object from backend in addBlog", response.data);

    return response.data; // goes to action.payload at blogSlice
  } catch (error) {
    console.error("error creating blog", error.response.data);
  }
});

export const removeBlog = createAsyncThunk(
  "blog/removeBlog",
  async (blogId) => {
    const response = await axios.delete(`${BASEURL}/blogs/${blogId}`);
    return response.data;
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (updatedBlog) => {
    console.log("testing here:", updatedBlog.id);
    console.log(updatedBlog);
    const response = await axios.put(
      `${BASEURL}/blogs/${updatedBlog.id}`,
      updatedBlog
    );

    console.log("testhere:", response.data);
    return response.data;
  }
);

// export const getBlogById = createAsyncThunk(
//   "blog/getBlogById",
//   async (blogId) => {
//     const response = await axios.get(`${BASEURL}/blogs/${blogId}`);
//     return response.data;
//   }
// );

export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async (blogId) => {
    try {
      const blogResponse = await axios.get(`${BASEURL}/blogs/${blogId}`);
      const blogData = blogResponse.data; // axios auto JSON.parse() the JSON reponse
      console.log("inThunksGetBlogById", blogData);

      // Fetch the HTML file content if `fileId` exists in the blog data
      if (blogData.fileId) {
        // const test = "67272c5f124055e2f4c33bdb";

        const fileResponse = await axios.get(
          `${BASEURL}/blogs/${blogData.fileId}/file`,
          // `${BASEURL}/blogs/${test}/file`,
          {
            responseType: "blob", // keep in raw form i.e. blob
            //you tell axios to have it in blob, therefore overriding the JSON.parse() that axios auto implements
            // important especially for html, keeping it in raw form. then later extracts html string via .text() without corrupting.
            // default axios method will risk corrupting the file
          }
        );

        // JSON string is not the same as json plain text (a string)
        //  '{"name": "Alice", "age": 30, }'; // plain text
        // as opposed to {"name": "Alice"} // JSON string

        // converts the blob containing HTML to HTML string
        const htmlContent = await fileResponse.data.text();

        blogData.htmlContent = htmlContent; // Add HTML string content to blog data
      }
      console.log("InThunksblogData:", blogData);

      return blogData;
    } catch (error) {
      // blob due to response type: "blob"
      console.log("errorResponseData:", error.response.data); // blob

      //extracts the JSON string from blob // it will be a JSON string as what was sent by backend
      const errorText = await error.response.data.text();
      // JSON string is not the same as json plain text (a string)
      //  '{"name": "Alice", "age": 30, }'; // json plain text
      // {"name": "Alice"} // JSON string
      console.log("errorText:", errorText); // {"error":"No file exists"}

      //converts JSON string  to a JavaScript Object
      const errorData = JSON.parse(errorText);
      console.log("errorData", errorData); //  {error: "no file exists"}

      console.log("Error response from backend:", errorData.error); // "no file exists"
    }
  }
);
