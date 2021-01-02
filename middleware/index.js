let express = require('express')
let auth = require('./auth')
const verifikasi = require('./verifikasi')
let router = express.Router()

// mendaftarkan controller u/ menu register dan login
router.post('/api/v1/register', auth.registrasi)
router.post('/api/v1/login', auth.login)

// alamat yg perlu authorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia)

module.exports = router
