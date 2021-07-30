import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let post
let collectionNames

export default class PostDAO {
    static async injectDB(conn) {
        if (post) {
            return
        }
        
        else {
            try {
                const collectionName = await conn.db(process.env.POST_DB).listCollections().toArray()
                console.log(collectionName.length)
                if (collectionName.length > 0){
                    collectionNames = true
                }
              } catch (e) {
                console.error(
                  `Cant Get Collection length ${e}`)
              }
            
            if (collectionNames){
                try {
                    post = await conn.db(process.env.POST_DB).collection("post")
                } catch (e) {
                    console.log(`Unable to connect to existing collection ${e}`)
                }
            } else {
                try {
                    const create_conn =await conn.db(process.env.POST_DB).createCollection( "post", {
                        validator: { $jsonSchema: {
                        bsonType: "object",
                        required: [ "title" , "text", "author"],
                        properties: {
                            _id:{},
                            title: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            text: {
                                bsonType : "string",
                                description: "must be a string and is required"
                            },
                            author: {
                                bsonType : "string",
                                description: "must be a string and is required"
                            },
                            created_date: {
                                bsonType: "date" ,
                                description: "must be dates"
                            },
                            updated_date: {
                                bsonType: "date" ,
                                description: "must be dates"
                            }
                        }
                        } },
                        validationAction: "error"
                      } )
                      return post = await conn.db(process.env.POST_DB).collection("post")
                      //console.log(post)
                    } catch (e) {
                        console.error(`Unable to create and connect to collection  ${e}`)
                    }

            }
        }
    }
    static async getAllPost () {
        let allPosts = []
        try {
            allPosts = await post.find()
            const allPostsArray = allPosts.toArray()
            return allPostsArray
        } catch (e) {
            console.error(`Unable to get posts ${e}`)
            return allPosts
        }
    }
    static async NewPost (title, text, author, created_date, updated_date) {
        try {
            const PostDoc = {
                title: title,
                text: text,
                author: author,
                created_date: created_date,
                updated_date: updated_date
            }
            return await post.insertOne(PostDoc)

        } catch (e) {
            console.error(`Unable to post NewPost ${e} `)
            return {error: `${e}`}
        }
    }
    static async getPostById(id) {
        try{ 
            const PostById = await post.find({"_id":ObjectId(id)})
            const PostArray = await PostById.toArray()

            return PostArray
        } catch (e) {
            console.error(`Unable to get post by id ${e}`)
            return {error: `${e}`}
        }

    }
    static async getPostByAuthor(author) {
        try{ 
            const PostByAuthor = await post.find({"author":String(author)})
 
            const PostArray = await PostByAuthor.toArray()
            console.log(PostArray)
            return PostArray
        } catch (e) {
            console.error(`Unable to get post by author ${e}`)
            return {error: `${e}`}
        }

    }
    static async DeletePostById(id) {
        
        try{ 
            const DeleteById = await post.deleteOne({"_id":ObjectId(id)})
            return DeleteById
        } catch (e) {
            console.error(`Unable to Delete post by id ${e}`)
            return {error: `${e}`}
        }

    }
    static async EditPostById(id, title, text, author, updated_date) {
        try{ 
            const updatedPost = await post.updateOne(
                {"_id": ObjectId(id)}, 
                {$set: {"title": title, "text":text, "author":author}},
               
            ) 
            return updatedPost
        } catch (e) {
            console.error(`Unable to update post ${e}`)
            return {error: `${e}`}
        }

    }
}