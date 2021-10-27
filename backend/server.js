if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require ('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')



/*  ---------------------------------------------  */
/*                      Mongo DB                   */
/*  ---------------------------------------------  */
const mongoose = require ('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => console.log('Connected Mongo'))



/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */
var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  console.log(req.header('Origin'));
  console.log(whitelist.indexOf(req.header('Origin')) !== -1);
  
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    console.log(1);
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    callback(null, corsOptions) // callback expects two parameters: error and options
  }else{
    console.log(2);
    // corsOptions = { origin: false } // disable CORS for this request
    callback(new Error('Not allowed by CORS'))
  }
}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



/*  ---------------------------------------------  */
/*                Global Routes                    */
/*  ---------------------------------------------  */
const indexRouter = require('./routes/index')
app.use( ('/'), cors(corsOptionsDelegate), indexRouter );



/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */  

const port1 = 4100
app.listen(process.env.PORT || port1, async () => {
  console.log('Prot is running at : ' + process.env.PORT || port1);
});