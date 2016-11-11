/*
Module to handle different requests received
*/

var exec = require("child_process").exec; 
var queryString = require("querystring");

function sleep(milliSeconds) {
	startTime = new Date().getTime();
	while(new Date().getTime() < startTime + milliSeconds);
}


function start(response, postData) {
	console.log("Request handler 'start' was called!");
	
	// Portion where the application sleeps for 10 seconds and returns
	/*exec("sleep 10", function (error, stdout, stderr) {
		
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Just slept for 10 seconds and returned!");
		response.end();
	});*/


	// Function to allow user to input something 
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<br>'+ '<br>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}


function upload(response, postData) {
	console.log("Request handler 'upload' was called!")

	response.writeHead(200, {"Content-Type": "text/plain"});
	
	responseText = queryString.parse(postData).text
	response.write(responseText);
	response.end();
}

exports.start = start
exports.upload = upload