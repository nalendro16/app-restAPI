let express = require('express')
let auth = require('./auth')
let router = express.Router()

// mendaftarkan controller u/ menu register dan login
router.post('/api/v1/register', auth.registrasi)
router.post('/api/v1/login', auth.login)

module.exports = router
