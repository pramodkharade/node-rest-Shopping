const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'This is GET Request Router'
    });
});

router.post('/',(req,res,next)=>{
    const products = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message:' This is post request router',
        createdProduct: products
    });
});
router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id=='special'){
        res.status(200).json({
            message:'You discovered the special ID',
            id:id
        });
    }
    else{
        res.status(200).json({
            message:'You passed an ID'
        });
    }
});
router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({message:'Update product router',id:id});
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({message:'Delete product router',id:id});
});

module.exports = router;