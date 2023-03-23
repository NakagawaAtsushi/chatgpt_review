var path = require("path"),
    express = require('express'),
    mime = require('mime');

var app = express();

app.use(express.static(path.join(__dirname, 'htdocs'), {
        setHeaders: function(res, path){
                var fileType = mime.lookup(path);

                switch(fileType){
                        case "text/html":
                                res.setHeader("Cache-Control", "private, no-cache, max-age=" + (60*60));
                        break;

                        case "text/javascript":
                        case "application/javascript":
                        case "text/css":
                                if(path.indexOf("/sw.js") !== -1){
                                        res.setHeader("Cache-Control", "no-cache");
                                }
                                else{
                                        res.setHeader("Cache-Control", "no-cache, public, max-age=" + (60*60*24*30));
                                }
                        break;

                        case "image/png":
                        case "image/jpeg":
                        case "image/svg+xml":
                                res.setHeader("Cache-Control", "public, max-age=" + (60*60*24*365));
                        break;
                }
        }
}));

app.get('/json', function(req, res) {
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
  res.send('{"dummy":"value"}');
});

app.get('/json/3sec', function(req, res) {
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
//  res.setHeader('Cache-Control', 'max-age=86400');
//  res.setHeader('Access-Control-Allow-Credentials', 'true');
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  res.status(500);
  setTimeout(() =>{
    res.send('{"dummy":"value", "now":"' + new Date().toISOString() + '"}');
  }, 3000);
});

app.get('/json/10sec', function(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  setTimeout(() =>{
    res.send('{"dummy":"value", "now":"' + new Date().toISOString() + '"}');
  }, 10000);
});

app.get('/dummy', function(req, res){
  console.log('{"now1":"' + new Date().toISOString() + '"}');
  res.send('{"now1":"' + new Date().toISOString() + '"}');
});

app.get('/dummy2', function(req, res){
  console.log('{"now2":"' + new Date().toISOString() + '"}');
  res.send('{"now2":"' + new Date().toISOString() + '"}');
});

app.listen(8080);
console.log('Listening on port 8080...');
