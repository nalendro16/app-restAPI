let express = require('express')
let auth = require('./auth')
let router = express.Router()

// mendaftarkan controller u/ menu register
router.post('/api/v1/register', auth.registrasi)

module.exports = router
