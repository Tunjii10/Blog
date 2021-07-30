import express from "express";
import cors from "cors";
import blogHome from "./api/index.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/blog", blogHome)
app.use("*", (req,res) => {
    res.status(404).json({error: "Page not found"})
})


export default app