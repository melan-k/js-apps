let http = require("http");
let url = require("url");

function start(route, handle) {
  const port = 8000;
  function onRequest(request, response) {
    let postData = "";
    const pathname = url.parse(request.url).pathname;
    if (!pathname.match(/favicon.ico/)) {
      console.log("\nRequest for " + pathname + " received.");
      request.setEncoding('utf8');

      request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '" + postDataChunk + "'.");
      });

      request.addListener("end", function() {
        route(handle, pathname, response, postData);
      });
    }
  }
  http.createServer(onRequest).listen(port);
  console.log('listening on port: ' + port);
}

exports.start = start;