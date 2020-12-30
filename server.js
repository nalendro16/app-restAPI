let express = require('express')
let bodyParser = require('body-parser')

// menambah morgan
let morgan = require('morgan')
let app = express()

// parse aplication/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

// panggil routes
let routes = require('./routes')
routes(app)

// daftarkan menu routes dari index
app.use('/auth', require('./middleware'))

app.listen(3000, () => {
  console.log('Server started on port')
})
