const mongoose = require('mongoose')
const schemaOptions = require('../schemaOptions')

const projection = {
    historico: 0,
    __v: 0
}

const produtoSchema = mongoose.Schema( {

    ativo: {
        type: Boolean,
        default: true
    },

    nome: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    valor: {
        type: Number,
        min: 0,
        required: true
    },

    imagem: String
    
}, schemaOptions)

const getAll = (query, success, fail) => {

    // var query = Object.assign({ ativo: true }, query)

    console.log("query", query);

    Produto.find(query, projection, (err, data) => {

        if (err)
            fail('Erro ao buscar os produtos')
        else
            success(data)

    })

}

const getById = (id, success, fail) => {

}

const update = (id, produto, success, fail) => {

}

const insert = (produto, success, fail) => {

    var produto = new Produto(produto)

    produto.save((err, data) => {

        if (err)
            fail(err.errors.valor.message)
        else
            success(data)

    })

}

const search = ( searchString, query, success, fail ) => {

    const toBool = ( value ) =>
        ( ( boolStr ) &&
                ( boolStr == '1' ) || ( boolStr == 'true' ) ? true : false )

    const checkBoolField = ( field, obj ) =>
        ( obj && obj[ field ] ?
            obj[ field ] = toBool( obj[ field ] )
            : obj ) 

    const match = ( searchString, query ) =>
        Object.defineProperty(
            {},
            '$match',
            {
                value: Object.assign( { $text: { $search: searchString }}, query ),
                writable: 1,
                configurable: 1,
                enumerable: 1
            }
        )

    const sort = () => {
        $sort: {
            $score: {
                $meta: 'textScore'
            }
        }
    }

    const project = ( fields ) => { $project: fields }

    Produto.aggregate([
            match( searchString, checkBoolField( 'ativo', query ) ),
            sort(),
            project( { nome: 1 } ) 
        ],
        (err, data) => {
            if (err) fail(err)
            else success(data)
        }
    )

}

Object.assign( produtoSchema, {
    statics: {
        getAll: getAll,
        getById: getById,
        update: update,
        insert: insert,
        search: search
    }
})

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto