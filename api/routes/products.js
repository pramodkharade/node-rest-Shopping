const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');

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
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
           .then((product)=>{
               console.log('Product is created::', product);
               res.status(201).json({
                message:' This is post request router',
                createdProduct: product
            });
           })
           .catch((error)=>{
               console.log('product is having issue::', error);
           });
    
});
router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
            .exec()
            .then((product)=>{
                res.status(200).json({
                    product
                });
            })
            .catch((error)=>{
                res.status(500).json({
                    error: error
                });
            });
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