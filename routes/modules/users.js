const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password) {
    errors.push({ message: 'Email address is required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Please confirm the correction of the password.' })
  }
  if (errors.length) {
    return res.render('signup', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'This email has been registed.' })
        return res.render('signup', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout success.')
  res.redirect('/users/login')
})

module.exports = router
