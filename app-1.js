let express = require("express")
let logger = require("morgan")
let fs = require("fs") // file stream
const { nextTick } = require("process")

let app = express()

// app.use() // middleware
// app.use() // 1 endpoint 1 callback

let home_handler = (req,res) => {
  res.json ({
    "message":"Hello from my application"
  })
}

let user_hanlder = (req,res,next) => {
  console.log("reach here")
  fs.readFile('data/users.json','utf8',(err, data) => {
    if (err) {
      nextTick(err)
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
app.use(
  logger("dev")
) 
// regex string
app.use("/user",user_handler)
app.use("/",home_handler)

app.use(error_handler)

module.exports = app;