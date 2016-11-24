const mongoose = require('mongoose')

var produtoSchema = mongoose.Schema({
    nome: String,
    descricao: String,
    valor: Number,
    imagem: {
        type: String,
        default: 'http://downloadicons.net/sites/default/files/broken-link-icon-60794.png'
    }
})

produtoSchema.statics.getAll = (callback) =>
    Produto.find( {}, { historico: 0 }, callback )
    
produtoSchema.statics.getById = (id, callback) =>
    Produto.findOne( { _id: id }, { historico: 0 }, callback )

produtoSchema.statics.set = (produto, callback) => {
    var p = new Produto(produto)
    p.save(callback)
}

produtoSchema.statics.setById = (id, produto, callback) =>
    Produto.update({ _id: id }, { $set: produto }, callback)

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto