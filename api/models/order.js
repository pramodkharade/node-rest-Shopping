const moongose = require('mongoose');
const Schema = moongose.Schema;

const orderSchema = Schema({
    _id: moongose.Schema.Types.ObjectId,
    product: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: { type: Number, default:1}
});

module.exports = moongose.model('Order', orderSchema);