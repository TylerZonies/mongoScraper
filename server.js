const express = require('express');
const expressHdlbrs = require('express-handlebars');
const path = require('path')
const bodyParser = require('body-parser')


const port = process.env.PORT || 6969;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/public', express.static(path.join(__dirname, 'public')));

app.engine("handlebars", expressHdlbrs({ defaultLayout: 'iCanRideMyBikeWithNo.handlebars' }));
app.set('view engine', 'handlebars');


const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

mongoose.connect(MONGODB_URI);

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});
