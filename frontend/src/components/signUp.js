import React, {useState} from "react"
import BlogDataService from "../services/blog_service.js"

const SignUp = props => {
    const initialUserState = {
        email: "",
        password: "",
        author:""
        }; 
    const [user,setUser] = useState(initialUserState)
    const handleInputChange = event => {
        const value  = event.target.value
        setUser({...user, [event.target.name]: value})
    }
    const SignUp= () => {
        BlogDataService.SignUp(user)
          .then(response => {
            console.log(response);
            if (response.success===true){
                props.author(response.author)
                props.history.push('/')
                
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        name="author"
                        value={user.author}
                        onChange={handleInputChange} 
                        required
                    />
                </div>

                <button onClick={SignUp} class="mt-2 btn btn-sm btn-dark">
                    Create Account
                </button>
            </div>
        </div>
    )
}
export default SignUp