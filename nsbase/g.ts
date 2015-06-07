



interface Lookup<T>{
	[key:string]: T;
}

type VoidCallback = () => void;



var $log:(...values:any[]) => void = function(){
	
	console.log(arguments);
}

$log("test", "breast");

function $assert(assertion:boolean|any, message:string){
	
	if(!assertion){
		console.assert(assertion, message);
		throw "Assertion Failed: " + message;
	}
}


class ErrorReporter {
	
	public static Log(scope:any, error:any){
		
		console.log("[Error]" + scope + " " + error)
	}
}
