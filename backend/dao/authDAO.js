import mongodb from "mongodb"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const ObjectId = mongodb.ObjectID
let user
let collectionNames

export default class authDAO {
    static async injectDB(conn) {
        if (user) {
            return
        }
        
        else {
            try {
                const collectionName = await conn.db(process.env.POST_DB).listCollections().toArray()
                console.log(collectionName.length)
                if (collectionName.length > 1){
                    collectionNames = true
                }
              } catch (e) {
                console.error(
                  `Cant Get Collection length ${e}`)
              }
            
            if (collectionNames){
                try {
                    user = await conn.db(process.env.POST_DB).collection("user")
                } catch (e) {
                    console.log(`Unable to connect to existing collection ${e}`)
                }
            } else {
                try {
                    const create_conn =await conn.db(process.env.POST_DB).createCollection( "user", {
                        validator: { $jsonSchema: {
                        bsonType: "object",
                        required: [ "email" , "password", "author"],
                        properties: {
                            _id:{},
                            email: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            password: {
                                bsonType : "string",
                                description: "must be a string and is required"
                            },
                            author: {
                                bsonType : "string",
                                description: "must be a string and is required"
                            }
                        }
                        } },
                        validationAction: "error"
                      } )
                      return user = await conn.db(process.env.POST_DB).collection("user")
                      //console.log(post)
                    } catch (e) {
                        console.error(`Unable to create and connect to collection  ${e}`)
                    }

            }
        } 
    }
    static async SignUp (email, password, author) {
        try {
            const password_hash = bcrypt.hashSync(password.toLowerCase(), 10)
            const email_lowcase = email.toLowerCase()
            const UserDoc= {
                "email": email_lowcase,
                "password": password_hash,
                "author": author
            }
            const findUser = await user.find({"email":email_lowcase})
            const findUserArray = await findUser.toArray()
            if (findUserArray.length>0) {
                return {message:"User already exists", success:false}
            }
            else {
                const UserDocInsert = await  user.insertOne(UserDoc)
                if (UserDocInsert) {
                    const token =  jwt.sign(email_lowcase, process.env.TOKEN_SECRET)
                    return {token: token, success : true, author:UserDoc.author}
                }
            }
        } catch (e) {
            console.error(`Unable to SIGN UP USER:  ${e}`)
            return {error:"unable to signup"}
        }
    }
    static async Login (email, password) {
        try {
            const email_lowcase = email.toLowerCase()
            const userDoc = await user.findOne({ email: email_lowcase})
            console.log(userDoc)
            console.log(password)
            if (bcrypt.compareSync(password.toLowerCase(), userDoc.password)) {
                console.log("reached here")
                const token =  jwt.sign(email_lowcase, process.env.TOKEN_SECRET)
                return  {token: token, success : true, author: userDoc.author}
            }
        } catch (e) {
            console.error(`Unable to Login USER:  ${e}`)
            return {error:"unable to login"}
        }
    }
    
    
}