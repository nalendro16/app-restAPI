'user strict'

// routes =pengalamatan dari controller yg sudah dibuat
module.exports = function (app) {
  var jsonku = require('./controller')
  app.route('/').get(jsonku.index)
  app.route('/tampil').get(jsonku.tampilsemuamahasiswa)
  app.route('/tampil/:id').get(jsonku.tampilberdasaid)
  app.route('/tambah').post(jsonku.tambahmahasiswa)
}
