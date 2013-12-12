
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var rest = require('rest');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*app.get('/', routes.index);
app.get('/users', user.list);*/


// var public_photos = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1";
var public_photos = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
var feedUrl = "http://api.flickr.com/services/feeds/";
var publ = "photos_public.gne?";
var friends = "photos_friends.gne?";
// var format = "api_key=ea1c4880bd96f663725989b36519f9d0&format=json&nojsoncallback=1";
var format = "api_key=ea1c4880bd96f663725989b36519f9d0&format=json";
var extract_json = /jsonFlickrFeed\((.*)\)/m;
var extract_author_name = /.*\((.*)\)/;
var mime = require('rest/interceptor/mime');

var client = rest.chain(mime);


function jsonFlickrFeed(obj){
	return obj;
}

app.get("/", function(req, res){
	rest(public_photos).then(function(blob,x){
		var entity = blob.entity;
		var json = eval(blob.entity);
		
		try{
			var json = eval(blob.entity);
		} catch(e){
			console.log(e);
			res.status(500);
			return res.render("500");
		}
		res.render('index', json);
	});
});

app.get("/:author", function(req,res){
	var author = req.params.author;
	rest(public_photos+'&id='+author).then(function(blob,x){
		var entity = blob.entity;
		
		try{
			var json = eval(entity);
		} catch(e){
			console.log(e);
			res.status(500);
			return res.render("500");
		}
		res.render('author', json);
	});
});

app.get("/:author/friends", function(req,res){
	var author = req.params.author;
	rest(feedUrl+friends+format+"&user_id="+author).then(function(blob,x){
		var entity = blob.entity;
		
		try{
			var json = eval(entity);
		} catch(e){
			console.log(e);
			res.status(500);
			return res.render(500);
		}
		json.author = author;
		json.author_id = author_id;
		res.render('friends', json);
	});
});

app.all("*",function(req, res){
	res.status(404);
	res.render("404");
});

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

