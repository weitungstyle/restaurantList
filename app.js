const express = require('express')
const exhbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:res_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.res_id)
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const search_word = req.query.keyword
  const search_result = restaurantList.results.toLowerCase().filter((restaurant) => {
    return restaurant.name.includes(search_word.toLowerCase()) + restaurant.category.includes(search_word.toLowerCase())
  })
  res.render('index', { restaurant: search_result, keyword: search_word })
})

app.listen(port, () => {
  console.log(`There is a website running on http://localhost:${port}`)
})
