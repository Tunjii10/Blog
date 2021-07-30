import jwt from "jsonwebtoken"

const isLoggedIn = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.json({ success: false, message: 'Please Login First.' })
        } else {
            req.decoded = decoded
            next()
        }
        })
    } else {
        res.json({
        message: 'Unauthorized!, you have to login first'
        })
     }
}

export default isLoggedIn