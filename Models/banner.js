const mongoose = require('mongoose')
const schemaOptions = require('../schemaOptions')

const projection = {
    __v: 0
}

const bannerSchema = mongoose.Schema({
    ativo: { type: Boolean, default: true },
    titulo: String,
    subtitulo: String,
    imagem: String
}, schemaOptions)

bannerSchema.statics.getAll = (callback) =>
    Banner.find({ ativo: 1 }, projection, callback)
    
bannerSchema.statics.getById = (id, callback) =>
    Banner.findOne({ _id: id }, projection, callback)

bannerSchema.statics.set = (banner, callback) => {
    var p = new Banner(banner)
    p.save(callback)
}

bannerSchema.statics.setById = (id, banner, callback) =>
    Banner.update({ _id: id }, { $set: banner }, callback)

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner