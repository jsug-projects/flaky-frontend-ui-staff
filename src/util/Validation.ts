import { observable, action } from 'mobx';
//Viewで使う方がいいかもなー。Modelで使うと、Modelを更新しないと、チェックできないもんなー
//いや、でもViewがごちゃごちゃするよなー、やっぱModelかなー
export class Validation {

	@observable
	errors=new Map<string, Array<Msg>>();

	@observable
	touchs=new Map<string, boolean>();


	touch(...targetNames:Array<string>) {
		for (let targetName of targetNames) {
			this.touchs.set(targetName, true);
		}
	}
	hasTouched(targetName:string) {
		if (this.touchs.get(targetName) == true) {
			return true;
		}
		return false;
	}


	hasAnyError(targetNames?) {
		if (targetNames != null) {
			for (let name of targetNames) {
				if (this.hasError(name)) {
					return true;
				}
			}
			return false;
		} else {
			if (this.errors.size > 0) {
				return true;
			}
			return false;
		}
	}

	hasTouchedAndError(targetName) {
		if (this.hasTouched(targetName)) {
			return this.hasError(targetName);
		}
		return false;
	}

	hasError(targetName) {
		for (let nameInErrors of this.errors.keys()) {
			if (targetName == nameInErrors) {
				return true;
			}
		}
		return false;
	}

	getErrorMsg(targetName, targetDisplayName) {
		if (this.errors.get(targetName) != null && this.errors.get(targetName).length > 0) {
			return this.errors.get(targetName)[0].getMsg(targetDisplayName);
		}
		return null;
	}
	getErrorMsgs(targetName, targetDisplayName) {
		let str = "";
		if (this.errors.get(targetName) != null) {
			for (let msg of this.errors.get(targetName)) {
				str += msg.getMsg(targetDisplayName) + "\n";
			}
			return ;
		}
		return null;
	}

	clearErrors() {
		this.errors = new Map();
		this.touchs = new Map();
	}

	removeError(targetName:string) {
		this.errors.delete(targetName);
	}

	addError(targetName:string, msg:Msg) {
		if (this.errors.get(targetName) == null) {
			this.errors.set(targetName, []);
		}
		this.errors.get(targetName).push(msg);
	}

	genericValidators:Array<GenericValidator> = [];
	targetNameMap:Map<string, Object> = new Map();

	registerUniValueValidators(targetName, getValueCb:()=>any, validators:Array<UniValueValidator>) {
		for (let validator of validators) {
			validator.setGetValueCb(getValueCb);
			validator.targetName = targetName;
			this.genericValidators.push(validator);
			this.targetNameMap.set(targetName, {});
		}
	}
	registerGenericValidators(targetName, validators:Array<GenericValidator>) {
		for (let validator of validators) {
			validator.targetName = targetName;
			this.genericValidators.push(validator);
			this.targetNameMap.set(targetName, {});
		}
	}


	findValidators(targetName) {
		let result:Array<GenericValidator> = [];
		for (let validator of this.genericValidators) {
			if (validator.targetName == targetName) {
				result.push(validator);
			}
		}
		return result;		
	}

	validateAll() : void {
		
		this.validate(...Array.from(this.targetNameMap.keys()));
	}

	@action
	touchAndValidate(...targetNames:Array<string>) :void {
		this.touch(...targetNames);
		this.validate(...targetNames);
	}


	@action
	validate(...targetNames:Array<string>) :void {
		for (let targetName of targetNames) {
			let msgs = [];
			let validators = this.findValidators(targetName);
			for (let validator of validators) {
				let result = validator.validate();
				if (result == false) {
					let msg = new Msg();
					msg.genericValidator = validator;
					msgs.push(msg);
				}
			}
			if (msgs.length > 0) {
				this.removeError(targetName);
				for (let msg of msgs) {
					this.addError(targetName, msg);
				}
			} else {
				this.removeError(targetName);			
			}
		}
		//return !this.hasAnyError(targetNames);		
	}



}


class Msg {
	genericValidator:GenericValidator;
	getMsg(displayName:string) {
		return this.genericValidator.getMsg(displayName);
	}
}

//相関チェックする場合は、適宜匿名クラスを作って使用する。匿名クラスの例はKetaValidatorなどを参考
export abstract class GenericValidator {
	targetName:string;

	abstract validate():boolean;
	abstract getMsg(displayName:string);
}

export abstract class UniValueValidator extends GenericValidator {
	getValueCb;

	setGetValueCb(cb:Function) {
		this.getValueCb = cb;
	}

	getValue() {
		return this.getValueCb();
	}
}

		


