import axios from "axios"
import authHeader from "./auth_header.js"

export default class BlogDataService {
    static async getAllPosts() {
        try {
            const posts = await axios.get('http://localhost:5000/blog/')
            return posts
        } catch (err) {
            return err.message
        }
    }
    static async PostNew(userData) {
        try {
            const {title, text, author} = userData
            const posts = await axios.post('http://localhost:5000/blog/posts/new', {title, text, author}, { headers: authHeader() })
            return posts
        } catch (err) {
            return err.message
        }
    }
    static async getPostById(PostId) {
        try {
            const posts = await axios.get(`http://localhost:5000/blog/posts/${PostId}`)
            return posts.data
        } catch (err) {
            return err.message
        }
    }
    static async getPostByAuthor(Author) {
        try {
            const posts = await axios.get(`http://localhost:5000/blog/posts/author/${Author}`, { headers: authHeader() })
            return posts.data
        } catch (err) {
            return err 
        }
    }
    static async DeletePostById(PostId) {
        try {
            const posts = await axios.delete(`http://localhost:5000/blog/posts/${PostId}`, { headers: authHeader() })
            return posts
        } catch (err) {
            return err.message
        }
    }
    static async EditPostById(PostId, userData) {
        try {
            const {title, text, author} = userData
            const posts = await axios.put(`http://localhost:5000/blog/posts/${PostId}`,{title, text, author}, { headers: authHeader() })
            return posts
        } catch (err) {
            return err.message
        }
    }
    static async SignUp(userData) {
        try {
            const { email, password, author} = userData
            const posts = await axios.post(`http://localhost:5000/blog/auth/signup`, { email, password, author})
            if (posts.data.success===true){
                localStorage.setItem("token", posts.data.token)
                return  posts.data
            }
        } catch (err) {
            return err.message
        }
    }
    static async Login(userData) {
        try {
            const {email, password} = userData
            const posts = await axios.post(`http://localhost:5000/blog/auth/login`, { email, password})
            if (posts.data.success===true){
                localStorage.setItem("token", posts.data.token)
                return  posts.data
            }
            
        } catch (err) {
            return err.message
        }
    }

}

