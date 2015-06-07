
module nsbase_ui {
	
	
	import ValidationState = nsbase_validation.ValidationState;
	
	
	///
	export interface IWrappedElementCollection extends HTMLCollection {
		
		[index:number]: IWrappedElement;
	}
	
	
	///
	export interface IWrappedElement extends HTMLElement {
		
		wrapper:Element;
		
		firstChild:IWrappedElement;
		lastChild:IWrappedElement;
		nextSibling:IWrappedElement;
		previousSibling:IWrappedElement;
		
		children:IWrappedElementCollection;
	}
	
	
	/**
	 * UI Base 
	 */
	export class Element implements nsbase_validation.IValidationClient { 
		
		public initialized:boolean;
		
		public parent:Element;
		/// IValidationClient
		public nestLevel:number;
		public validationState:ValidationState;
		
		protected element:IWrappedElement;
		protected styleList:Lookup<boolean> = {};
		protected propertiesInvalidated:boolean;
		protected stylesInvalidated:boolean;
		protected stopInitInvalidation:boolean;
		
		
		
		/// static init
		protected static init = (function(){
			
			Element.prototype.initialized = false;
			Element.prototype.nestLevel = 0;
			Element.prototype.validationState = ValidationState.NORMAL;
		})();
		
		
		
		
		
		///
		constructor(type?:string){
			
			this.element = <IWrappedElement>document.createElement(type || "div");
			this.element.wrapper = this;
		}
		
		
		
		public initialize() : void {
			
			if(!this.stopInitInvalidation){
				Locator.validationManager.addToValiationQueue(this);
			}
			
			this.createChildren();
		}
		
		
		
		protected createChildren() : void {
			/// overridable bahviour
		}
		
		/// commit our dynamic state to the DOM.
		protected commitProperties() : void {
			/// overridable bahviour
		}
		
		/// commit the style list to the DOM
		protected commitStyles() : void {
			
			var list = "";
			for(var i in this.styleList){
				list += i + " ";
			}
			this.element.setAttribute("class", list);
		}
		
		
		public addStyle(className:string) : void {
			this.styleList[className] = true;
		}
		
		public removeStyle(className:string) : void {
			delete this.styleList[className];
		}
		
		public replaceStyle(className:string, withClass:string) : void {
			delete this.styleList[className];
			this.styleList[className] = true;
		}
		
		
		
		protected invalidateProperties() : void {
			
			this.propertiesInvalidated = true;
			if(this.parent && this.validationState == ValidationState.NORMAL){
				Locator.validationManager.addToValiationQueue(this);
			}
		}
		
		
		protected invalidateStyles() : void {
			
			this.stylesInvalidated = true;
			if(this.parent && this.validationState == ValidationState.NORMAL){
				Locator.validationManager.addToValiationQueue(this);
			}
		}
		
		
		public validate() : void {
			
			if(this.propertiesInvalidated){
				
				this.propertiesInvalidated = false;
				this.commitProperties();
			}
			
			if(this.stylesInvalidated){
				this.stylesInvalidated = false;
				this.commitStyles();
			}
			
			this.validationState = ValidationState.NORMAL;
		}
		
		
		
		//////////////////////// 
		/// DOM API Calls.
		////////////////////////
		
		
		public appendChild(child:Element|TextNode) : void {
			
			/// force child to be an element here.
			var ch = <Element>child;
			if(ch.initialize && !ch.initialized){
				ch.nestLevel = this.nestLevel+1;
				ch.initialize();
			}
			
			this.element.appendChild(ch.element);
		}
		
		public removeChild(child:Element) : void {
			
			this.element.removeChild(child.element);
		}
	}
	
}