const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000
const routes = require('./routes')
require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`There is a website running on http://localhost:${port}`)
})
