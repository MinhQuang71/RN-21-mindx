let express = require("express")
let logger = require("morgan")
let fs = require("fs") // file stream
let app = express()
let main = require("./src/routing")

// middleware
// general middleware
app.use(express.json()) // body parser
app.use(logger("dev"))
app.use(main)

//outer-most error handler
let error_handler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message
  })
}
app.use(error_handler)


module.exports = app;