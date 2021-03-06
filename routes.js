'user strict'

// routes dari controller yg sudah dibuat
module.exports = function (app) {
  var jsonku = require('./controller')
  app.route('/').get(jsonku.index)
  app.route('/tampil').get(jsonku.tampilsemuamahasiswa)
  app.route('/tampil/:id').get(jsonku.tampilberdasaid)
  app.route('/tambah').post(jsonku.tambahmahasiswa)
  app.route('/ubah').put(jsonku.ubahdatamahasiswa)
  app.route('/hapus').delete(jsonku.hapusdatamahasiswa)

  app.route('/tampilmatakuliah').get(jsonku.tampilgroupmatakuliah)
}
