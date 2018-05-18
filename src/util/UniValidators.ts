import {UniValueValidator} from "./Validation";

export function notEmpty(getMsgCb?:(displayName:string)=>string):UniValueValidator {
	return new (class Tmp extends UniValueValidator {
		getMsg(displayName:string):string {
			if (getMsgCb != null) {return getMsgCb(displayName)}
			return displayName+"は必須です";			
		}
		validate(){
			let val = this.getValue();
			if (val != null && val != "") {
				return true;
			} else {
				return false;
			}
		}
	});
}

export function ketaBetween(min:number, max:number, getMsgCb?:(displayName:string)=>string):UniValueValidator {
	return new (class Tmp extends UniValueValidator {
		getMsg(displayName:string):string {
			if (getMsgCb != null) {return getMsgCb(displayName)}
			return `${displayName}の桁は${min}から${max}の間にしてください`;			
		}
		validate(){
			let val = this.getValue();
			if (val == null) {
				return false;
			}
			if (val.length >= min && val.length <= max) {
				return true;
			} else {
				return false;
			}
		}
	});
}