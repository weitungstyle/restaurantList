const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
  for (i = 0; i < 8; i++) {
    Restaurant.create({
      name: restaurantList.results[i].name,
      name_en: restaurantList.results[i].name,
      category: restaurantList.results[i].category,
      image: restaurantList.results[i].image,
      location: restaurantList.results[i].location,
      phone: restaurantList.results[i].phone,
      google_map: restaurantList.results[i].google_map,
      rating: restaurantList.results[i].rating,
      description: restaurantList.results[i].description,
    })
  }
  console.log('done')
})
