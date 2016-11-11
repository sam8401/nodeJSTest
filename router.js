/*
Module to "route" requests from server to request handlers
*/


function route(pathname, handler, response, postData) {
	console.log("Received request to route " + pathname);
	var handlerFunc = handler[pathname] ;

	if(typeof(handlerFunc) === 'function'){
		handlerFunc(response, postData);
	}
	else {
		console.log("No handler found for route " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 not found");
		response.end();
	}
	
}

exports.route = route;