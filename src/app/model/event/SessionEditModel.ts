import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Session} from "app/dto/event/Session";
import {Moment} from "moment";
import * as moment from "moment";
import {Validation, GenericValidator} from "util/Validation";
import {notEmpty} from "util/UniValidators";
import axios from "axios";



export class SessionEditModel {

	validation:Validation;

	eventId:string;

	@observable id:string;
	@observable title:string;	
	@observable overview:string;
	@observable startDate:Moment;
	@observable endDate:Moment;

	constructor() {
		this.validation = new Validation();
		this.validation.registerUniValueValidators("title", ()=>{
			return this.title;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("overview", ()=>{
			return this.overview;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("startDate", ()=>{
			return this.startDate;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("endDate", ()=>{
			return this.endDate;
		},[notEmpty()]);
		let this_ = this;
		this.validation.registerGenericValidators("endDate", [
			new (class Tmp extends GenericValidator {
				getMsg(displayName:string):string {
					return `${displayName}は開始日時より後にしてください`;			
				}
				validate(){
					if (this_.endDate == null) return true;

					if (this_.endDate.isAfter(this_.startDate)) {
						return true;
					}
					return false;
				}
			})
		]);
	}


	setInitialData(eventId:string, session:Session) {

		this.validation.clearErrors();

		this.eventId = eventId;
		this.id = session.id;
		this.title = session.title;
		this.overview = session.overview;
		this.startDate = session.startDateTime?moment(session.startDateTime):null;
		this.endDate = session.startDateTime?moment(session.endDateTime):null;

		this.validation.validateAll();

	}

	doneCallback:Function;
	setDoneCallback(doneCallback:Function) {
		this.doneCallback = doneCallback;
	}

	updateTitle(title) {
		this.title = title;
		this.validation.touchAndValidate("title");
	}

	updateOverview(overview) {
		this.overview = overview;
		this.validation.touchAndValidate("overview");
	}

	updateStartDate(date) {
		this.startDate = date;
		this.validation.touchAndValidate("startDate");
	}

	updateEndDate(date) {
		this.endDate = date;
		this.validation.touchAndValidate("endDate");
	}


	saveOrUpdateEvent() {
		let session = new Session();
		session.title = this.title;
		session.overview = this.overview;
		session.startDateTime = this.startDate.toDate();
		session.endDateTime = this.endDate.toDate();
		session.eventId = this.eventId;

		if (this.id == null) {
			axios.post("/api/sessions", session)
			.then((res)=>{
				let regex = /([^/]+$)/;
				this.id = regex.exec(res.headers["location"])[0];
				this.doneCallback();
			});	
		} else {
			axios.put("/api/sessions/"+this.id, session)
			.then(()=>{
				this.doneCallback();
			});	
		}

	}

}