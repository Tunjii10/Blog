import express from "express"
import isLoggedIn from "../middleware/loginCheck.js"
import postCtrl from "./posts.controller.js"
import authCtrl from "./auth.controller.js"
const router = express.Router()


router.route("/").get(postCtrl.apiGetAllPost)
router.route("/posts/new").post(isLoggedIn, postCtrl.apiNewPost)
router
    .route("/posts/:id")
    .get(postCtrl.apiGetPostById)
    .delete(isLoggedIn, postCtrl.apiDeletePostById)
    .put(isLoggedIn, postCtrl.apiEditPostById)
router.route("/posts/author/:author").get(isLoggedIn, postCtrl.apiGetPostByAuthor)

router.route("/auth/signup").post(authCtrl.apiSignUp)
router.route("/auth/login").post(authCtrl.apiLogin)

export default router