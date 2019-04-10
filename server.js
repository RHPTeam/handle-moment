const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const fs = require('fs')
const http = require('http')
const https = require('https')
const moment = require('moment')


/**
 *  Setup HTTPS SSL
 *  When config vps comment line 18, delete comment line 19-24
 */
const server = http.createServer(app)
app.set('port', 9000);



app.set("view engine", "ejs");
app.set("views", "./src/views/");

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('running')
})

//listen a port
server.listen(9000, () => {
  console.log(`Server running on localhost: 9000`)
});

fs.readFile('accountv1.txt', 'utf8', function(err, contents) {
  const result = contents.split(',,').map( item => {
    const itemObject = JSON.parse(item)
    return  {
      name: itemObject.name,
      email: itemObject.email,
      password: itemObject.password,
      phone: itemObject.phone,
      created_at: moment(itemObject.startTime).toDate(),
      expireDate: moment(itemObject.limitTime).toDate(),
      maxAccountFb: parseFloat(itemObject.FacebookCount)
    }
  })
  console.log(result)
});

module.exports = app
