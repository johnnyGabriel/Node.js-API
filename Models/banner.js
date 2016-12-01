const mongoose = require('mongoose')
const schemaOptions = require('../schemaOptions')

const bannerSchema = mongoose.Schema({
    titulo: String,
    subtitulo: String,
    imagem: String
})

const projection = {
    __v: 0
}

bannerSchema.set('toJSON', {
    virtuals: true,
    transform(doc, ret, options) {
        delete ret._id
    }
})

bannerSchema.statics.getAll = (callback) =>
    Banner.find({}, projection, callback)
    
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