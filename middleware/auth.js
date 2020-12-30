let connection = require('../koneksi')
let response = require('../res')
let config = require('../config/secret')

let mysql = require('mysql')
let md5 = require('md5')
let jwt = require('jsonwebtoken')
let ip = require('ip')

// controller untuk register
exports.registrasi = function (req, res) {
  let post = {
    //membuat array yg menerima data user
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  }
  // cek apakah data email sudah ada di query a.k.a sdh daftar
  let query = 'SELECT email FROM ?? WHERE ?? = ?'
  let table = ['user', 'email', post.email]

  //   menjalankan query dari table diatas
  query = mysql.format(query, table)

  //   cek query yg dimasukan user
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      if (rows.length == 0) {
        let query = 'INSERT INTO ?? SET ?'
        let table = ['user']
        query = mysql.format(query, table)
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error)
          } else {
            response.ok('Berhasi mendaftarkan', res)
          }
        })
      } else {
        response.ok('email sudah terdaftar', res)
      }
    }
  })
}

// controller utk login
exports.login = function (req, res) {
  let post = {
    //membuat array yg menerima data user
    password: req.body.password,
    email: req.body.email,
  }

  let query = 'SELECT * FROM ?? WHERE ??=? AND ??=?'
  let table = ['user', 'password', md5(post.password), 'email', post.email]

  query = mysql.format(query, table)
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      if (rows.length == 1) {
        let token = jwt.sign({ rows }, config.secret, { expiresIn: 1440 })
        id_user = rows[0].id_user

        // membuat token saat kondsi diatas terpenuhi
        let data = {
          id_user: id_user,
          no_token: token,
          ip_addres: ip.address(),
        }

        // menampung data ke akses token
        let query = 'INSERT INTO ?? SET ?'
        let table = ['akses_token']

        query = mysql.format(query, table)
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error)
          } else {
            res.json({
              success: true,
              massage: 'Token tergenerate',
              token: token,
              currUser: data.id_user,
            })
          }
        })
      } else {
        res.json({ Error: true, Massage: 'Email/Password salah' })
      }
    }
  })
}
