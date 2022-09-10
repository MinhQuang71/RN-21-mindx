let express = require("express")
let logger = require("morgan")
let fs = require("fs") // file stream
const { nextTick } = require("process")
const { response } = require("express")

let app = express()

let home_handler = (req,res) => {
  res.json ({
    "message":"Hello from my application"
  })
}

let user_handler = (req,res,next) => {
  console.log("reach here")
  fs.readFile('data/user.json','utf8',(err, data) => {
    if (err) {
      next(err)
    }
    res.json(
      data
    )
  });
}

let error_handler = (err,req,res,next) =>{
  res.status(500).json({
    message: err.message
  })
}
let comment_handler = (req, res, next) => {
  fs.readFile("data/comment.json", "utf8", (err, data) => {
    if (err) {
      next(err);
    }
    res.json(data);
  });
}

function pokemon_handler(req, res, next) {
  fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => next(err));
}
// General middleware
app.use(express.json()) 
app.use(logger("dev")) 
// regex string
// let mw1 = (req, res, next) => {
//   console.log("Here 1st direction of MW1")
//   next()
//   console.log("Here 2nd direction of MW1")
// }

// let mw2 = (req, res, next) => {
//   console.log("Here is mw2")
//   next()
// }

// let mw3 = (req, res, next) => {
//   console.log("Here is mw3")
//   next()
// }

// app.use(mw3)
// app.use("/user",mw1,mw2,user_handler)
app.use("/pokemon", pokemon_handler);
app.use("/commment", comment_handler);
app.use("/user", user_handler);

app.use("/",home_handler)

app.use(error_handler)

module.exports = app;