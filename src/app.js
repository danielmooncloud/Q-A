'use strict';

const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mid = require('./middleware');
const api = require('./api');
const routes = require('./routes');
const app = express();
const db = require('./database');
const favicon = require('serve-favicon');
const port = process.env.PORT || 3000;


app.use(cookieParser());

app.use(session({
	secret: 'I love my family',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}))



//res.locals allows variables to be used in templates
app.use((req, res, next) => {
	res.locals.user = req.session.username;
	next();
})


app.use(parser.json());
app.use(parser.urlencoded({
	extended: true
}))


app.use(express.static('public'));
app.use(favicon('./public/images/newspaper.png'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.use('/api', api);

app.use('/', routes);



//Route Not Found
app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
})

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {message : err.message});
})



app.listen(port, () => console.log("The server is now running on port " + port));




