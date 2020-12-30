var connection = require('../koneksi')
var response = require('../res')
var config = require('../config/secret')

var mysql = require('mysql')
var md5 = require('md5')
var jwt = require('jsonwebtoken')
var ip = require('ip')

// controller untuk register
exports.registrasi = function (req, res) {
  const post = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    tanggal_daftar: new Date(),
  }
  // cek apakah data email sudah ada di query a.k.a sdh daftar
  const query = 'SELECT email FROM?? WHERE??'
  const table = ['user', 'email']

  //   menjalankan query dari table diatas
  query = mysql.format(query, table)

  //   cek query yg dimasukan user
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error)
    } else {
      if (rows.length == 0) {
        const query = 'INSERT TO ?? SET ?'
        const table = ['user']
        query = mysql.format(query, table)
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error)
          } else {
            response.ok('Berhasi mendaftarkan')
          }
        })
      } else {
        response.ok('email sudah terdaftar')
      }
    }
  })
}
