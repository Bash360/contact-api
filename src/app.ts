import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import  logger from 'morgan';
import usersRouter from './routes/users';

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(_err, _req, _res, _next) {
  // set locals, only providing error in development
  _res.locals.message = _err.message;
  _res.locals.error = _req.app.get('env') === 'development' ? _err : {};
  _res.status(_err.status || 500);
  _res.render('error');
});

module.exports = app;
