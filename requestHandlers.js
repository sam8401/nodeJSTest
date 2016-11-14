/*
Module to handle different requests received
*/

//var exec = require("child_process").exec; 

var queryString = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function sleep(milliSeconds) {
	startTime = new Date().getTime();
	while(new Date().getTime() < startTime + milliSeconds);
}

function start(request, response) {
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
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
		'<input type = "file" name="upload">'+
		'<br>'+ '<br>'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(request, response) {
	console.log("Request handler 'upload' was called!")

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function (error, fields, files) {
		console.log("parsing done");
		fs.rename(files.upload.path, "/tmp/test.png");
	});

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image: <br/>");
	response.write("<img src='/show' />");
	response.end();
}

function show(request, response) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.png", "binary", function (error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start
exports.upload = upload
exports.show = show