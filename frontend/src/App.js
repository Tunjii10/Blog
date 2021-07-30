import React, { useState,useEffect} from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/post";
import Dashboard from "./components/dashboard";
import SignUp from "./components/signUp";
import Login from "./components/login";
import PostsList from "./components/postList";
import Edit from "./components/edit"

function App() {
  const [state, setState] = useState(null);
  const [author, setAuthor] = useState(null);
  function getAuthor(author=null) {
    setAuthor(author)
  }


  function signOut(event) {
    setState(null)
    window.localStorage.clear()
    window.location.href= '/'
  }
  useEffect(() =>{
    const token = window.localStorage.getItem("token");
    if (token) {
      setState(token)
    }
  })

  
  return (
    <div>
      <nav class="nav nav-justified nav-tabs ">
        <Link to="/" class="nav-link text-decoration-none text-dark" >Blog</Link>  
        
        {
          state ? 
          (<div class="nav">
            <Link to={'/blog/dashboard'} class = "nav-link ">
              Your Blog Posts
            </Link> 
            <button onClick={signOut} class="nav-link btn-primary">
              SignOut
            </button>
           </div>
          ):
           (<Link to={'/blog/auth/login'} class = "nav-link ">
          Login
        </Link>) 
        }
       
      </nav> 
      <div class="container mt-2 mb-3">
        <Switch>
          <Route exact path="/" component={PostsList}/>
          <Route 
           path="/blog/post/:id" 
           render={(props)=> (
             <Post {...props}/>
           )}
          />
          <Route 
           path="/blog/dashboard" 
           render={(props)=> (
             <Dashboard {...props} author={author}/>
           )}
          />
          <Route 
           path="/blog/auth/signup" 
           render={(props)=> (
             <SignUp {...props} author={getAuthor}/>
           )}
          />
          <Route 
           path="/blog/auth/login" 
           render={(props)=> (
             <Login {...props} author={getAuthor}/>
           )}
          />
          <Route 
           path="/blog/edit/:id" 
           render={(props)=> (
             <Edit {...props}/>
           )}
          />
        </Switch> 
      </div>
      
      <footer class="page-footer font-small ">
        <div class="footer-copyright text-center py-3">© 2021 Copyright:
          <a href="https://github.com/Tunjii10" class="text-decoration-none"> Favour Adetunji </a>
        </div>
      </footer>
      
    </div>
  );
}

export default App;
