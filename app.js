
'use strict';

const 
    express = require ('express'),
    app = express(),
    morgan = require ('morgan'),
    mongoose = require ('mongoose'),
    bodyParser = require ('body-parser'),
    path = require ('path');
;

/* ====================================================== */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});
/* ====================================================== */

const
    URLLocalDB = 'mongodb://localhost:27017/fooddayDB',
    URLInternetDB = 'mongodb+srv://admin:admin@fooddaycluser.tk9zk.mongodb.net/FoodDayCluser?retryWrites=true&w=majority'
;

mongoose.set("useFindAndModify", false);
mongoose.connect(URLLocalDB, {useNewUrlParser: true, useUnifiedTopology: true} )
        .then(db => console.log("---> Conexión con base de datos establecida correctamente..."))
        .catch(err => console.log("Error en la base de datos" + err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/* ====================================================== */

app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/* ====================================================== */

const all_routes = require('./routes/routes');
app.use('/', express.static('client/', {redirect: false}));
app.use('/', all_routes);

app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('client/index.html')); 
});

/* ====================================================== */

var port_number = app.listen(process.env.PORT || 3977, console.log("---> La aplicación esta corriendo en el puerto: 3977"));
app.listen(port_number);