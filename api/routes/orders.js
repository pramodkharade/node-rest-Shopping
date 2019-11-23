const express = require('express');
const router = express.Router();
router.post('/',(req,res,next)=>{
    const orders = {
        productId: req.body.productId,
        qunatity: req.body.qunatity
    };
    res.status(201).json({
        message:'Order was created',
        ordercreated: orders
    });
});
router.get('/',(req,res,next)=>{
    res.status(201).json({
        message:'GET all order Details'
    });
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