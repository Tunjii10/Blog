import app from "./server.js"
import dotenv from "dotenv"
dotenv.config()
import postDAO from "./dao/postDAO.js"
import mongodb from "mongodb"
import authDAO from "./dao/authDAO.js"
const MongoClient =  mongodb.MongoClient
const port = process.env.PORT || 5000


MongoClient.connect(
    process.env.BLOG_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(err =>{
    console.log(err.stack)
    process.exit(1)
}).then(async client => {
    await postDAO.injectDB(client)
    await authDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
