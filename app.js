//configuration
const config = require('config');
 console.log(`Application name: ${config.get('name')}`);
 console.log(`Mail host: ${config.get('mail.host')}`);
//Express app
const express = require('express');
const app = express();
const coursesRouter = require('./routes/courses');
const indexRouter = require('./routes/index');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
app.use(logger);//customized middleware
app.use(express.urlencoded({extended: true})); //send key value in any format in postman
app.use(express.static('public'));//access static files
app.use(helmet());
//enable morgan only in development environment
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
}

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()); //parse body in req object 

app.use('/api/courses',coursesRouter);
app.use('/',indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));