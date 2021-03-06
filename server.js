/*
Server to receive requests
*/

var http = require("http");
var url = require("url")

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request received with pathname: " + pathname);

		// changes related to POST handling when not using formidable package

		/*var postData = "";
		request.setEncoding("utf8");
		request.addListener("data", function (postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "' .");
		});	
		request.addListener("end", function () {
			route(pathname, handle, request, response, postData);
		});
		*/

		route(pathname, handle, request, response);
	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started...');
}

exports.start = start