const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order =require('../models/order');

router.post('/',(req,res,next)=>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
   order.save()
        .then((result)=>{
            console.log('Result is::',result);
            res.status(201).json({
                message:'Order was created',
                ordercreated: result
            });
        })
        .catch(error=> {
            console.log('Error is::',error);
        });
    
});
router.get('/',(req,res,next)=>{
    Order.find()
    .select('quantity product _id')
         .exec()
         .then((doc)=>{
             res.status(200).json(
                 {
                     count: doc.length,
                     orders : doc.map(doc => {
                         return {
                             _id : doc._id,
                             product : doc.product,
                             quantity : doc.quantity,
                             request: {
                                 type:'GET',
                                 url: 'http://localhost:3000/orders/'+doc._id
                             }
                         };
                     })
                 }
             );
         })
         .catch(err=>{
             error: err
         });
    // res.status(201).json({
    //     message:'GET all order Details'
    // });
});
router.get('/:orderId',(req,res,next)=>{
    const orderId = req.params.orderId;
    res.status(200).json({
        message: "Order detail",
        orderID: orderId
    });
});

router.delete('/:orderId',(req,res,next)=>{
    const orderId = req.params.orderId;
    res.status(200).json({
        message: "Order deleted",
        orderID: orderId
    });
});
module.exports = router;