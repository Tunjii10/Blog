import postDAO from "../dao/postDAO.js"

export default class  postCtrl {
    static async apiGetAllPost(req, res) {
        try {
            const post = await postDAO.getAllPost()
            res.json(post)
        } catch (e) {
            res.json({message:`api getall post error ${e}`})
        }
    }
    static async apiNewPost(req, res) {
        try {
            const {title, text, author} = req.body
            const created_date = new Date()
            const updated_date = new Date()
            const NewPost = await postDAO.NewPost(
                title,
                text,
                author,
                created_date,
                updated_date
            )
            if (NewPost.insertedCount<1) {
                res.json({status : "Unsuccessful"})  
            } else {
                res.json({status : "Successfully creaated post"})
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    static async apiGetPostById(req, res) {
        try {
            const id = req.params.id 
            const PostById = await postDAO.getPostById(id)
            if (PostById.length<1) {
                res.status(404).json({error: "Not found"})
                
            } else {
                res.json(PostById)
            }
            
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetPostByAuthor(req, res) {
        try {
            const author = req.params.author
            const PostByAuthor = await postDAO.getPostByAuthor(author)
            if (PostByAuthor<1) {
                res.status(404).json({error: "Not found"})
            } else {
                res.send(PostByAuthor)
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeletePostById(req, res) {
        try {
            const id = req.params.id 
            const DeletedPostById = await postDAO.DeletePostById(id)
            if (DeletedPostById.deletedCount === 0) {
                res.status(500).json({error: "unable to delete "})    
            } else {
             res.json({status: "success"})}
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiEditPostById(req, res) {
        try {
            const id = req.params.id 
            const {title, text, author} = req.body
            const updated_date = new Date()
            const updateById = await postDAO.EditPostById(
                id,
                title,
                text,
                author,
                updated_date)
            if (updateById.modifiedCount === 0)
               {
                res.status(500).json({error: "unable to update post - user may not be original poster"})
                } else {
                    res.json({status: "success"})
                } 
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}