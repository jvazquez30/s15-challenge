const User = require('./auth-model')

async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username })
    if (!users.length) {
      next()
    } else {
      next({ status: 422, message: "username taken" })
    }
  } catch (error) {
    next(error)
  }
}

async function checkUsernameandPassword(req, res, next) {
  const password = req.body.password
  const username = req.body.username

  if (!password || !username) {
    next({ status: 422, message: "username and password required"})
  } else {
    next()
  }
}
 async function checkProfileExists(req, res, next) {
  try {
    const { username } = req.body
    const user = await User.findBy({username})

    if (user) {
      req.user = user
      next()
    } else {
      next({ status: 401, message: 'Invalid credentials'})
    }
  } catch(err) {
    next(err)
  }
 }




module.exports = {
  checkUsernameFree,
  checkUsernameandPassword,
  checkProfileExists
}