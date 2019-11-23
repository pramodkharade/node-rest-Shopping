const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productsRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
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
app.use('/products',productsRoutes);
app.use('/orders',ordersRouter);

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

module.exports = app;