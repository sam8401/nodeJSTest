/*
Module to "route" requests from server to request handlers
*/


function route(pathname, handler, request, response) {
	console.log("Received request to route " + pathname);
	var handlerFunc = handler[pathname] ;

	if(typeof(handlerFunc) === 'function'){
		handlerFunc(request, response);
	}
	else {
		console.log("No handler found for route " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 not found");
		response.end();
	}
	
}

exports.route = route;