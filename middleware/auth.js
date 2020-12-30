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
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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
