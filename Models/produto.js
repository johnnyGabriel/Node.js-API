const mongoose = require('mongoose')
const schemaOptions = require('../schemaOptions')

const projection = {
    historico: 0,
    __v: 0
}

const produtoSchema = mongoose.Schema({
    ativo: { type: Boolean, default: true },
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, min: 0, required: true },
    imagem: String
}, schemaOptions)

produtoSchema.statics.getAll = (success, fail) => {

    Produto.find({}, projection, (err, data) => {

        if (err)
            fail('Erro ao buscar os produtos')
        else
            success(data)

    })

}

produtoSchema.statics.getById = (id, success, fail) => {



}

produtoSchema.statics.insert = (produto, success, fail) => {

    var produto = new Produto(produto)

    produto.save((err, data) => {

        if (err)
            fail(err.errors.valor.message)
        else
            success(data)

    })
}

produtoSchema.statics.update = (id, produto, success, fail) => {



}

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto