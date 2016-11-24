const moongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    titulo: String,
    subtitulo: String,
    imagem: String
})

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner