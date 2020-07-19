const http = require('http');
const fs = require('fs');

function onRequest(req, res){
    console.log("USER MADE A REQUEST. " +req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    const readStream = fs.createReadStream(__dirname + '/react-tsx/build/index.html','utf8'); 
    readStream.pipe(res);

}

http.createServer(onRequest).listen(80);

console.log('Web Server is running...');