const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const authRoutes = require('./routes/auth-routes');
const orderRoutes = require('./routes/order-routes');
const shopRoutes = require('./routes/shop-routes');

mongoose.connect(process.env.DB_UR,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log('Error', err);
    process.exit(1);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(authRoutes);
app.use(orderRoutes);
app.use(shopRoutes);

const port = process.env.PORT || 3000;

app.listen(port,function() {
    console.log('Server listening on port ' + port); 
});
