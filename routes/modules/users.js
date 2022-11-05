const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {

})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signup', (req, res) => {

})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Success Logout.')
  res.redirect('/users/login')
})

module.exports = router
