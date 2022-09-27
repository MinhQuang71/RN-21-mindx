const express = require('express')
const mainRouter = express.Router()
const {HTTPErrorHandler} = require('./exception/HTTPException')
const { getComment, postComment } = require('./controller/comment')
const {
    getUser,
    getUserById,
    createUser,
    updateUserInformation,
    deleteUser,
    authenticateUser
} = require("./controller/users")
const { HTTPError } = require('./exception/HTTPException')
const {extractAuthenticationInfo} = require('./middleware/auth')
mainRouter.get("/comment", getComment)
mainRouter.get("/comment", postComment)

let mw = (req, res, next) => {
    console.log("First direction")
    next()
    res.json({ message: "fail b/c mw"})
}
mainRouter.post("/sign-up", createUser) // dang ky
mainRouter.post("/sign-in", authenticateUser)             // dang nhap
mainRouter.get("/user",mw,getUser)
mainRouter.get("/user/:id",getUserById)  

mainRouter.put("/user", extractAuthenticationInfo,updateUserInformation)
mainRouter.delete("/user",deleteUser)

mainRouter.use(HTTPErrorHandler)

module.exports = mainRouter;