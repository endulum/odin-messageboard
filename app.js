// create app
const express = require('express')
const app = express()

// wire in pug
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// enable use of req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// wire in packaged middleware
const logger = require('morgan')
app.use(logger('dev'))

// wire in routers
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// catch 404 and forward to error handler
const createError = require('http-errors')
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

app.listen(3000, () => console.log('Connected at port 3000'))
