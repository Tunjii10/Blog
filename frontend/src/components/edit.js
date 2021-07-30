import React, {useState} from "react"
import BlogDataService from "../services/blog_service.js"

const Edit = props => {
    const initialEditState = {
        title: "",
        text: "",
        author:""
        }; 
    const [userEdit,setUserEdit] = useState(initialEditState)
    const handleInputChange = event => {
        const value  = event.target.value
        setUserEdit({...userEdit, [event.target.name]: value})
    }
    const Edit= () => {
        BlogDataService.EditPostById(props.match.params.id, userEdit)
          .then(response => {
            console.log(response);
            if (response.data.status==="success"){
                props.history.push('/blog/dashboard')
            }
          })
          .catch(e => {
            console.log(e);
          });
      };
    return (
        <div class="container">
            <div class="row-justify-content-center">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        class="form-control"
                        name="title"
                        value={userEdit.title}
                        
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
                        value={userEdit.text}
                        onChange={handleInputChange} 
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="author">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        name="author"
                        value={userEdit.author}
                        onChange={handleInputChange} 
                        required
                    />
                </div>

                <button onClick={Edit} class="mt-2 btn btn-sm btn-dark">
                    Edit Post
                </button>
            </div>
        </div>
    )
}
export default Edit