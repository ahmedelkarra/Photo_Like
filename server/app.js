const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const coonectDB = require('./helper/connectDB');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const register = require('./routes/register')
const login = require('./routes/loginRoute')
const me = require('./routes/me')
const photo = require('./routes/photo')
const upload = require('./routes/upload')
const like = require('./routes/likeRoute')
const control = require('./routes/controlRoute')
const photoAll = require('./routes/photoAll')
const cors = require('cors')


const app = express();
coonectDB()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static(path.join(__dirname, 'upload')))

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth/', register)
app.use('/api/auth/', login)
app.use('/api/auth/', me)
app.use('/api/photo/', photo)
app.use('/api/photo/', upload)
app.use('/api/photo/', like)
app.use('/api/photo/', control)
app.use('/api/photo/', photoAll)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
