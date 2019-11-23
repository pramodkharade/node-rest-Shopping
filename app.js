const express = require('express');
const app = express();
const morgan = require('morgan');

const productsRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
app.use(morgan('dev'));
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