import React, {useState, useEffect} from "react"
import BlogDataService from "../services/blog_service"
import {Link} from "react-router-dom"


const PostList = props => {
    const [posts,setPosts] = useState([])

    const retrievePosts = () => {
        BlogDataService.getAllPosts()
          .then(response => {
            setPosts(response.data)
          })
          .catch(e => {
            console.log(e);
          });
    }
    useEffect(()=>{
        retrievePosts();
    },[])
    return (
        <div class="container">
            {
              posts ? posts.map(post => (
                <div class="card mb-3">
                    
                    <div class="card-body">
                        <h5 class="card-title">{post.title}</h5>
                        <p>By {post.author}</p>
                        <Link to={`/blog/post/${post._id}`} class="text-decoration-none"> See Story</Link>
                    </div>
                    
                </div>
              )) : (
                <h2> No blogpost</h2>
              )
            }
        </div>
    )


}
export default PostList