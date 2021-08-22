const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jobsRouter = require('./routes/jobs');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const devicesRouter = require('./routes/devices');
const imagesRouter = require('./routes/images');
const messageRouter = require('./routes/message');
require('dotenv').config();
require('./config/mongo');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jobs', jobsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/devices', devicesRouter);
app.use('/images', imagesRouter);
app.use('/message', messageRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
