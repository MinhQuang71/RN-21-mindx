const express = require('express')
const mainRouter = express.Router()
const { getComment, postComment } = require('./controller/comment')
const {
    getUser,
    getUserById,
    createUser,
    updateUserInformation,
    deleteUser
} = require("./controller/users")

mainRouter.get("/comment", getComment)
mainRouter.get("/comment", postComment)

mainRouter.get("/user",getUser)
mainRouter.get("/user/:id",getUserById)  
mainRouter.post("/user",createUser)
mainRouter.put("/user",updateUserInformation)
mainRouter.delete("/user",deleteUser)


module.exports = mainRouter