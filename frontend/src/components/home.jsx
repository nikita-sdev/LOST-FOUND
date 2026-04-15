import { useState } from "react";

const Home=()=>{
  const [post,setPost]= useState([]);
  return (
    <>
    <h2>No posts made yet</h2>
    <button><a href="/add-post">Add Post</a></button>
    </>
  )
}

export default Home;