const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

//app.use(bodyParser.json)

const port = process.env.PORT || 3000

console.log(port)

const routes = require('./api/routes')
routes(app)
app.listen(port, ()=>{
  console.log(`Server run on port ${port}`)
})