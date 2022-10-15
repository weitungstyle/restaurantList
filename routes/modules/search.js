const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(data =>
        data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword))
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router
