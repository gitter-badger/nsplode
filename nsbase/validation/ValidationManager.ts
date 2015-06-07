

module nsbase_validation {
	
	
	export const enum ValidationState{
		NORMAL,
		INVALIDATED,
		VALIDATING
	}
	
	
	export interface IValidationClient{
		
		validationState:ValidationState;
		nestLevel:number;
		validate() : void;
	}
	
	
	/// manages the validation cycle
	export class ValidationManager {
		
		/// priority queue for validation clients, where priority is based on nestLevel. 
		private validationQueue:IValidationClient[][] = [];
		
		
		
		public addToValiationQueue(client:IValidationClient) : void {
			
			if(client.validationState == ValidationState.NORMAL){
				
				client.validationState = ValidationState.INVALIDATED;
				var queue = this.validationQueue[client.nestLevel] || (this.validationQueue[client.nestLevel] = []);
				queue[queue.length] = client;
			}
		}
		
		
		public processValidationQueue() : void {
			
			var ii:number, 
			llen:number,
			innerQueue:IValidationClient[],
			client:IValidationClient;
			
			for(var i = 0, len = this.validationQueue.length; i<len; i++){
				
				if( (innerQueue = this.validationQueue[i]) ){
					
					for(ii = 0, llen = innerQueue.length; ii<llen; ii++){
						
						try{
							client.validationState = ValidationState.VALIDATING;
							client.validate();
							
							///#DEBUG
							$assert(client.validationState == ValidationState.NORMAL, ".validationState on " + client + " was not set back to NORMAL.")
							///#ENDDEBUG
						}
						catch (e){
							client.validationState = ValidationState.NORMAL;
							
							console.log(e);
						}
					}
				}
			}
		}
	}
	
}