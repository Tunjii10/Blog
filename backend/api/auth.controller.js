import authDAO from "../dao/authDAO.js"

export default class  authCtrl {
    static async apiSignUp(req, res) {
        try {
            if (!req.body.email || !req.body.password ||!req.body.author) {
                return res.json({error: "Please fill in required field"})
            }
            let { email, password, author} = req.body
            const user = await authDAO.SignUp(email, password, author)
            //console.log(post)
            res.json(user)
        } catch (e) {
            console.log(`api signup error ${e}`)
        }
    }
    static async apiLogin(req, res) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.json({error: "Please fill in required field"})
            }
            let { email, password} = req.body
            const user = await authDAO.Login(email, password)
            //console.log(post)
            res.json(user)
        } catch (e) {
            console.log(`api login error ${e}`)
        }
    }
}