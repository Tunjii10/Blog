import React, {useState,useEffect} from "react"
import BlogDataService from "../services/blog_service.js"
import {Link} from "react-router-dom"


const Dashboard = props => {
    const [authorPost,setAuthorPost] = useState('')
    const initialUserPostState = {
      title: "",
      text: "",
      author:""
      }; 
    const [userPost,setUserPost] = useState(initialUserPostState)
    const handleInputChange = event => {
        const value  = event.target.value
        setUserPost({...userPost, [event.target.name]: value})
    }
    const retrievePost = (author) => {
        BlogDataService.getPostByAuthor(author)
          .then(response => {
            setAuthorPost(response)
          })
          .catch(e => {
            console.log(e);
          });
    }
    const NewPost= () => {
      BlogDataService.PostNew(userPost)
        .then(response => {
          if (response.data.status==="Successfully creaated post"){
            props.history.push('/')
          }
        })
        .catch(e => {
          console.log(e);
        });
    };
    
    const deleteReview = (Id) => {
      BlogDataService.DeletePostById(Id)
        .then(response => {
          if (response.data.status==="success"){
            props.history.push('/')   
          }
        })
        .catch(e => {
          console.log(e);
        });
    };

    useEffect(()=>{
        retrievePost(props.author);
    },[])
    console.log(authorPost)
    console.log(props.author)
    return (
        <div class="container">
           <h3>Welcome to your DashBoard {props.author} </h3>
           <div class="row-justify-content-left mb-2">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        class="form-control"
                        name="title"
                        value={userPost.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <textarea
                        type="text"
                        class="form-control form-control-lg"
                        name="text"
                        value={userPost.text}
                        onChange={handleInputChange} 
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        class="form-control"
                        name="author"
                        value={userPost.author}
                        onChange={handleInputChange}
                        required 
                    />
                </div>

                <button  onClick={NewPost} class="mt-2 btn btn-sm btn-dark">
                    Create New Post
                </button>
            </div>
            <h5 class='mt-3'>Your Stories</h5>
           {
              authorPost ? authorPost.map(post => (
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">{post.title}</h5>
                        <p>By {post.author}</p>
                        <Link to={`/blog/post/${post._id}`} class=" card-link text-decoration-none"> See Story</Link>
                        <Link to={`/blog/edit/${post._id}`} class=" card-link text-decoration-none">Edit Story</Link>
                        <a onClick={() => deleteReview(post._id)} class=" card-link text-decoration-none"> Delete Story</a>
                    </div>
                </div>
                
              )) : (
                <h2> No blogpost</h2>
              )
            }
        </div>
    )


}
export default Dashboard