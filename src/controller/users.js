let fs = require("fs")
let getUser = (req, res) => {
    res.json({ message: "hi" })
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
        address: req.body.address
    }
    users.push(user)
    let usersStr = JSON.stringify(users)
    fs.writeFileSync("data/users.json", usersStr, { encoding: 'utf-8' })
    res.status(201).json({ message: "Created!!!" })

}

let updateUserInformation = (req, res) => {
    let users = fs.readFileSync("data/users.json", { encoding: 'utf-8' })
    users = JSON.parse(users)
    let user = {
        id: req.body.id,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address
    }
    
}

let deleteUser = (req, res) => {
    let users = fs.readFileSync("data/users.json", { encoding: 'utf-8' })
    users = JSON.parse(users)
    let userIndex = users.findIndex(user => user.id === req.params.id)
    if (userIndex < 0) {
        return res.status(404).json ({
            message: `User with id: ${req.params.id} not found!`,
        })
    }
    users.splice (userIndex, 1)
    let usersStr = JSON.stringify (users)
    fs.writeFileSync("data/users.json", usersStr)
    res.status(204).json ({
        message: `Deleted User`
    })
}

module.exports = {
    getUser: getUser,
    getUserById: getUserById,
    createUser: createUser,
    updateUserInformation: updateUserInformation,
    deleteUser: deleteUser
}