
import fs = require("fs");
import child_process = require("child_process")
import exec = child_process.exec;
//
import Element = nsbase_ui.Element;



// var a = exec("ping -c 9 google.com");
var proc = exec("gulp");


function line(value:string){
	
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(value)); 
	return div;
}



proc.stdout.on("data", function(data:string){
	
	document.body.appendChild( line(data) );
});



process.on("exit", function(){
	
	console.log("called??");
	proc.kill();
});



