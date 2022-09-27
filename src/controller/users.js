let fs = require("fs")
const { encode } = require("punycode")
let {HTTPError} = require('../exception/HTTPException')
let {encodeToken} = require("./../helper/authenticate")
let getUser = (req, res) => {
    // res.json({ message: "hi" })
    res.status(404)
    // return ServerResponse("")
}

let getUserById = (req, res) => {
    let value = fs.readFileSync("data/users.json", { encoding: 'utf-8' })
    value = JSON.parse(value)
    let user = value.find(user => user.id === req.params.id)
    if (user) {
        res.json({ message: `Hi User ${req.params.id}`, information: user })
    } else {
        res.status(404).json({
            message: `User with id:${req.params.id} not found`
        })
    }
}

let createUser = (req, res) => {
    // phai co middleware express.json()
    let users = fs.readFileSync("data/users.json", { encoding: 'utf-8' })
    users = JSON.parse(users)

    let user = {
        id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        password: req.body.password

    }
    // involve logic
    //email unique
    //password validation -> 8char
    let emailList = users.map(e=>e.email)
    if (emailList.includes(credentials.email)) throw new HTTPError(400,"Email already existed")
    if (user.password.length < 8) throw new HTTPError(400,"Password is not strong")
    // return exception
    // got wrong logic
    users.push(user)
    let usersStr = JSON.stringify(users)
    fs.writeFileSync("data/users.json", usersStr, { encoding: 'utf-8' })
    res.status(201).json({ message: "Created!!!" })

}
let authenticateUser = (req, res) => {
    let credentials = {
        email: req.body.email,
        password: req.body.password
    }
    let users = JSON.parse(fs.readFileSync("data/users.json", { encoding: 'utf8'}))
    let emailList = users.map(e=>e.email)
    if (!(emailList.includes(credentials.email))) throw new HTTPError(404,"Email not found")

    let user = users.find(user => credentials.email === user.email)
    if (user.password !== credentials.password) throw new HTTPError(400,"Password wrong!")

    let token = encodeToken(user)
    res.status(200).json({
        token: token
    })
}
let updateUserInformation = (req, res) => {
    let users = fs.readFileSync("data/users.json", { encoding: 'utf-8' })
    users = JSON.parse(users)
    let user = req.user
    let new_information = {
        name: req.body.name,
        address: req.body.address
    }
    // verify info

    user.name = new_information.name
    user.address = new_information.address
    let emailList = users.map(e=>e.email)
    let userIndex = emailList.indexOf(user.email)
    if (userIndex == -1) throw new HTTPError(404,"Not Found")
    users[userIndex] = user
    let usersStr = JSON.stringify(users,null,4)
    fs.writeFileSync("data/users.json", usersStr, { encoding: 'utf-8' })
    res.status(200).json({ message: "Created!!!" })
}

let deleteUser = (req, res) => {
    
}

module.exports = {
    getUser: getUser,
    getUserById: getUserById,
    createUser: createUser,
    updateUserInformation: updateUserInformation,
    deleteUser: deleteUser,
    authenticateUser: authenticateUser
}   

