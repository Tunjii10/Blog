import React, {useState} from "react"
import BlogDataService from "../services/blog_service.js"
import {Link} from "react-router-dom";

const Login = props => {
    const initialUserState = {
        email: "",
        password: ""
        }; 
    const [user,setUser] = useState(initialUserState)
    const handleInputChange = event => {
        
        const value  = event.target.value
        setUser({...user, [event.target.name]: value})
        
    }
    const login = () => {
        BlogDataService.Login(user)
          .then(response => {
            console.log(response);
            if (response.success===true){
                props.author(response.author)
                props.history.push('/');
               
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

                <button onClick={login} class="btn btn-sm btn-dark mt-2">
                    Login
                </button>
                <p class="mt-1">
                    Don't have an account?<br/>
                    <Link to={'/blog/auth/signup'} class = "text-decoration-none">
                        Sign Up
                    </Link>                
                </p>
            </div>
        </div>
    )


}
export default Login