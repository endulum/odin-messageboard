// create app
const express = require('express')
const app = express()

// wire in pug
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")))

// enable use of req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// wire in packaged middleware
const logger = require('morgan')
app.use(logger('dev'))

// make / redirect to /messages
app.get('/', async (req, res) => {
  console.log('hit')
  return res.redirect('/messages')
})

// wire in routers
const messageRouter = require('./routes/messageRouter')
app.use('/messages', messageRouter)

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
  res.render('pages/error', {
    title: 'Error'
  });
});

app.listen(3000, () => console.log('Connected at port 3000'))
