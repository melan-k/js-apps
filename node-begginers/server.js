let http = require("http");
let url = require("url");

function start(route, handle) {
  const port = 8000;
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    if (!pathname.match(/favicon.ico/)) {
      console.log("\nRequest for " + pathname + " received.");
      route(handle, pathname, response);
    }
  }
  http.createServer(onRequest).listen(port);
  console.log('listening on port: ' + port);
}

exports.start = start;