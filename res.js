'use strict'

// respon ketika json berhasil
exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  }
  res.json(data)
  res.end()
}

// respon untuk nested/join table
exports.oknested = function (values, res) {
  // akumulasi data dr db yg di join menjadi single value
  const hasil = values.reduce((akumulasikan, item) => {
    //tentukan key group -> nama
    if (akumulasikan[item.nama]) {
      // buat variable group nama mahasiswa
      const group = akumulasikan[item.nama]
      // cek jika isi array = matakuliah
      if (Array.isArray(group.matakuliah)) {
        // sisipkan nama ke group matakuliah
        group.matakuliah.push(item.matakuliah)
      } else {
        // abaikan jika array != matakuliah
        group.matakuliah = [group.matakuliah, item.matakuliah]
      }
    } else {
      // abaikan jika group !=nama
      akumulasikan[item.nama] = item
    }
    return akumulasikan
  }, {})

  var data = {
    status: 200,
    values: hasil,
  }

  res.json(data)
  res.end()
}
