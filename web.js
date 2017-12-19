var http = require('http');

var fs = require('fs');


function handle_incoming_request (req, res) {

    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    load_sensor_data(function(err, readings){

    if (err) { 

       console.log("Couldn't read file");

    }

    console.log(readings);

    res.writeHead(200, { "Content-Type" : "application/json" });

	

var readingsArr = [];
var toSplit = readings.split(",");

for (var i = 0; i < toSplit.length; i++) {
    readingsArr.push(toSplit[i]);
	}

	var output = "temperature : "+ readingsArr[0] +" humidity :"+ readingsArr[1] +" wind speed :"+ readingsArr[2] +" time :"+ readingsArr[3] +" location :"+ readingsArr[4];
	res.end(JSON.stringify({output}));

//	res.write(JSON.stringify({temperature : readingsArr[0]}));
//	res.write(JSON.stringify({humidity : readingsArr[1]}));
//	res.write(JSON.stringify({"wind speed" : readingsArr[2]}));
//	res.write(JSON.stringify({time : readingsArr[3]}));
//	res.end(JSON.stringify({location : readingsArr[4]}));

   });

}


function load_sensor_data(callback) {

   fs.readFile(

   "sensorlog.txt",'utf8',

   function (err, readings) {

   if (err) {

   callback(err);

return;


}

callback(null, readings);

}

);

}

var s = http.createServer(handle_incoming_request);

s.listen(8080);