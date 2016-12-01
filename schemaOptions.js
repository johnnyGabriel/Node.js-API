module.exports = {
    toJSON: {
        virtuals: true,
        transform(doc, ret, options) {
            delete ret._id
        }
    }
}