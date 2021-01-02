const jwt = require('jsonwebtoken')
const config = require('../config/secret')

// agar user akses sesuai role
function verifikasi() {
  return function (req, res, next) {
    let role = req.body.role
    // cek auth token di header
    let tokenWithBearer = req.headers.authorization

    if (tokenWithBearer) {
      let token = tokenWithBearer.split('')[1]
      //   verifikasi
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res
            .status(401)
            .send({ auth: false, massage: 'token tidak terdaftar' })
        } else {
          if (roles == 2) {
            req.auth = decoded
            next
          } else {
            return res
              .status(401)
              .send({ auth: false, massage: 'gagal autorisasi role anda' })
          }
        }
      })
    } else {
      return res.status(401).send({ auth: false, massage: 'token tidak ada' })
    }
  }
}

module.exports = verifikasi
