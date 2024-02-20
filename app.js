const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* my routes */
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const formRoute = require('./routes/formhandler');
/* end of my routes */

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* my routes */
app.use('/', indexRouter);
app.use('/action', formRoute);
app.use('/api', apiRouter);
/* end of my routes */

const db = require('./models/index');
// create the tables if don't exist
db.sequelize.sync().then(() => {
  console.log('Database Synced');
}).then(() =>
    db.Contact.create({ firstName: 'John', lastName: 'Doe', phone: '5555553344', email: 'foo@bar.com'})
        .then((contact) => {
            console.log('Contact created');
        })
    ).catch((err) => {
    console.log('Error: ', err);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
