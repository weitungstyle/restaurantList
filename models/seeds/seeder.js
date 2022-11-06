const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').results
const userList = require('./user.json')

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(userList[0].password, salt))
    .then(hash => User.create({
      name: userList[0].name,
      email: userList[0].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (i = 0; i < 3; i++) {
        restaurantList[i].userId = userId
      }
      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => Restaurant.create(restaurantList[i])
      ))
    })
    .then(() => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(userList[1].password, salt))
        .then(hash => User.create({
          name: userList[1].name,
          email: userList[1].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          for (i = 3; i < 6; i++) {
            restaurantList[i].userId = userId
          }
          return Promise.all(Array.from(
            { length: 3 },
            (_, i) => Restaurant.create(restaurantList[i + 3])
          ))
        })
        .then(() => {
          console.log('done')
          process.exit()
        })
    })
})
