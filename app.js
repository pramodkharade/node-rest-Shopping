const express = require('express');
const app = express();
const productsRoutes = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');

app.use('/products',productsRoutes);
app.use('/orders',ordersRouter);
app.use((req,res,next)=>{
        res.status(200).json({
            message:'It is working '
        });
});

module.exports = app;