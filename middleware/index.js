let express = require('express')
let auth = require('./auth')
const verifikasi = require('./verifikasi')
let router = express.Router()
let verivikasi = require('./verifikasi')

// mendaftarkan controller u/ menu register dan login
router.post('/api/v1/register', auth.registrasi)
router.post('/api/v1/login', auth.login)

// alamat yg perlu authorisasi
router.get('/api/v1/login', verifikasi(2), auth.halamanrahasia)

module.exports = router
