'user strict'

// fungsi2 atau module yang digunakan

var response = require('./res')
var connection = require('./koneksi')

exports.index = function (req, res) {
  response.ok('Aplikasi REST API berjalan', res)
}

// menampilkan semua data dr db
exports.tampilsemuamahasiswa = function (req, res) {
  connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
    if (error) {
      console.log(error)
    } else {
      response.ok(rows, res)
    }
  })
}

// menampilkan data berdasarkan id
exports.tampilberdasaid = function (req, res) {
  let id = req.params.id
  connection.query(
    'SELECT * FROM mahasiswa WHERE id = ?',
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
      } else {
        response.ok(rows, res)
      }
    }
  )
}

// menambah data
exports.tambahmahasiswa = function (req, res) {
  let nim = req.body.nim
  let nama = req.body.nama
  let jurusan = req.body.jurusan

  connection.query(
    'INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?,?,?)',
    [nim, nama, jurusan],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
      } else {
        response.ok('Berhasil Menambahkan data', res)
      }
    }
  )
}

// mengubah data berdasarkan id
exports.ubahdatamahasiswa = function (req, res) {
  let id = req.body.id
  let nim = req.body.nim
  let nama = req.body.nama
  let jurusan = req.body.jurusan

  connection.query(
    'UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?',
    [nim, nama, jurusan, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error)
      } else {
        response.ok('Data berhasil diubah', res)
      }
    }
  )
}

// hapus data berdasarkan id
exports.hapusdatamahasiswa = function (req, res) {
  let id = req.body.id
  connection.query(
    'DELETE FROM mahasiswa where id=?',
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error)
      } else {
        response.ok('Data berhasil dihapus', res)
      }
    }
  )
}
