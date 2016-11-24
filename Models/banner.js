const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    titulo: String,
    subtitulo: String,
    imagem: String
})

bannerSchema.statics.getAll = (callback) =>
    Banner.find(callback)
    
bannerSchema.statics.getById = (id, callback) =>
    Banner.findOne({ _id: id }, callback)

bannerSchema.statics.set = (banner, callback) => {
    var p = new Banner(banner)
    p.save(callback)
}

bannerSchema.statics.setById = (id, banner, callback) =>
    Banner.update({ _id: id }, { $set: banner }, callback)

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner