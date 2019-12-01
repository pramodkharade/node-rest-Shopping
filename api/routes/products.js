const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');

router.get('/',(req,res,next)=>{
    Product.find().select('name price _id')
                  .exec()
                  .then((allproduct)=>{
                      const response = {
                          count: allproduct.length,
                          products: allproduct.map(doc=>{
                              return {
                                  name: doc.name,
                                  price: doc.price,
                                  _id : doc._id,
                                  message:' All product List',
                                  request:{
                                      type:'GET',
                                      url: 'http://localhost:3000/products/'+doc._id
                                  }
                              }
                          })
                      };
                      if(allproduct.length > 0){
                        res.status(200).json(response);
                      }else{
                        res.status(200).json({
                            message:"No product found:",
                            products: allproduct
                        });
                      }
                    
                  })
                  .catch((error)=>{
                      res.status(500).json({error: error});
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
                console.log('A product is::',product);
                if(product){
                    res.status(200).json({
                        product
                    });
                }else{
                    res.status(404).json({
                        message:'No valid entry found with provided ID'
                    });
                }
            })
            .catch((error)=>{
                res.status(500).json({
                    error: error
                });
            });
});
router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    updateOps = {};
    for(const ops of req.body){

        updateOps[ops.propName] = ops.propValue;
    }
    console.log('Result Update::',updateOps);
   Product.updateOne({_id:id},{$set:updateOps}).exec()
          .then((result)=>{
              if(result){
                res.status(200).json({
                    message:' Product has updated with provided ID',
                    product: result
                });
              }
              else{
                res.status(200).json({
                    message:' Product has updated with provided ID',
                    product: []
                });
              }
          })
          .catch((err)=>{
            res.status(500).json({
                err: err,
            });
          });
    
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.deleteOne({_id:id})
           .exec()
           .then((result)=>{
               res.status(200).json({message:'product is deleted:'+id});
           }).catch((error)=>{
               res.status(500).json({error:error});
           });
    res.status(200).json({message:'Delete product router',id:id});
});

module.exports = router;