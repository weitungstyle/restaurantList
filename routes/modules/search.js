const express = require('express')
const sortBy = require('../../utilities/sortBy')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const selection = req.query.sortBy
  Restaurant.find({ $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }] })
    .lean()
    .sort(sortBy(selection))
    .then(restaurantsData => res.render('index', { restaurants: restaurantsData, keyword }))
    .catch(error => console.log(error))
})

module.exports = router
