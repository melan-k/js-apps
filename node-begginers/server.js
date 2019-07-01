let http = require("http");
let url = require("url");

function start(route, handle) {
  const port = 8000;
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    if (!pathname.match(/favicon.ico/)) {
      console.log("Request for " + pathname + " received.");
      route(handle, pathname);
      console.log('');
    }

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(port);
  console.log('listening on port: ' + port);
}

exports.start = start;