module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Log-in to enter website.')
    res.redirect('/users/login')
  }
}
