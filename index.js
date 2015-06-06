/// <reference path="typings/tsd.d.ts" />


var fs = require("fs");
var sys = require('sys')
var exec = require('child_process').exec;


// var a = exec("ping -c 9 google.com");
var a = exec("gulp");


function line(value){
	
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(value));
	return div;
}

a.stdout.on("data", function(data){
	
	document.body.appendChild( line(data) );
});



process.on("exit", function(){
	
	console.log("called??");
	a.kill();
});