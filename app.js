const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      config = require('./Config/database');

var app = express();
//var appPersonal = express();
/**
 * Base de datos
 */
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.MONGO_URI)
.then(() => {
    console.log("conectado to the database lil bih");    
}).catch(err => {
    console.log('no se pudo conecctar to the database. Exiting now...');
    process.exit();
});

/**
 * API
 */
 //var newUsuario = require('./routes/newUsuario');
 
/**
 * configurar puerto 
 */



 const port = process.env.PORT || 8080;

  /**
   * Software intermedio para bodyparsing usando json y urlencoding
   */
      // application/x-www-form-urlencoded
      app.use(session({       
        secret: 'secret cat',
        resave: true,
        saveUninitialized: true
       }));
   app.use(bodyParser.json()); //parsear la informacion
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(passport.initialize());
   app.use(passport.session());
   
  /**
 * express.static es una función de middleware integrada para servir archivos estáticos.
 * Estamos diciendo que la carpeta pública del servidor express es el lugar para buscar los archivos estáticos
 */
//vista por defecto 
//app.set('views', path.join(__dirname, 'app'));
//conectar node.js con Angular
app.use(express.static(path.join(__dirname, 'dist')));
require('./routes/usuario.route')(app);
require('./routes/personal.login.route')(app);
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'dist/index.html'));
});



app.listen(port, () => {
    console.log('Iniciando en el puerto: ' + port);    
});

