import React, {useState,useEffect} from "react"
import BlogDataService from "../services/blog_service.js"

const Post = props => {
    const [post,setPost] = useState('')

    const retrievePost = (id) => {
        BlogDataService.getPostById(id)
          .then(response => {
            setPost(response[0])
          })
          .catch(e => {
            console.log(e);
          });
    }

    useEffect(()=>{
        retrievePost(props.match.params.id);
    },[])
    return (
        <div class="container">
           <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">By {post.author}</h6>
                    <p class="card-text">{post.text}</p>
                </div>
            </div>
        </div>
    )


}
export default Post