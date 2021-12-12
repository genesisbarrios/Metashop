//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //An HTTP request logger middleware for node

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storesRouter = require('./routes/store');

var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/store', storesRouter);

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

var usersConnected = {}; 

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('connected', socket.id + ' connected');
    usersConnected[socket.id] = socket.id;

    socket.on('send-update', function (data) {
        socket.broadcast.to(usersConnected[socket.id]).emit('receiveUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete usersConnected[socket.id];
        socket.emit('user-disconnected', usersConnected);
      });

});
  
server.listen(3000);



module.exports = app;