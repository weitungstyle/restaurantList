const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .then(restaurantsData => res.render('index', { restaurants: restaurantsData, keyword }))
    .catch(error => console.log(error))
})

module.exports = router
