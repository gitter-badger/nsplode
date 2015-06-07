

module nsbase_ui {
	
	
	/**
	 * TextNode component, wraps a Text element.
	 */
	export class TextNode {
		
		protected element:Text;
		
		constructor(defaultValue?:string) {
			
			this._text = defaultValue;
			this.element = document.createTextNode(defaultValue || "");
		}
		
		// storage for text
		protected _text:string;
		public set text(value:string) {
			
			this._text = value;
			this.element.data = value;
		}
		public get text() : string {
			
			return this._text;
		}		
	}
}