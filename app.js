const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const MONGOURI ='mongodb://127.0.0.1:27017/nodeRestShopping';

const productsRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
/***Cors Handling**/
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
                'Origin,X-Requested-With, Content-Type, Accept, Authorization'
              );
              if(req.method=='OPTIONS'){
                  res.header('Access-Control-Allow-Methods',
                  'PUT, POST, GET, DELETE');
                  return res.status(200).json({});
              }
    next();
});
/***Cors Handling END**/
/***Added Routes in middleware**/
app.use('/products',productsRoutes);
app.use('/orders',ordersRouter);

/***Error Handling if route does not match**/
app.use((req,res,next)=>{
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});
app.use((errors,req,res,next)=>{
        res.status(errors.status || 500).json({
            message: errors.message
        });
});
mongoose.connect(MONGOURI,{useNewUrlParser:true})
        .then((result)=>{
            console.log('Mongodb DB server connected');
        })
        .catch((error)=>{
            console.log('Encounter the error while connecting the Database:', error);
        });
/***Error Handling if route does not match END**/
module.exports = app;