let express = require("express")

let app = express()

let home_handler = (red,res) => {
    res.json ({
      "message":"Chao cac ban minh ten la Minh Quang"
    })
  }
  app.use("/",home_handler)

  module.exports = app;

