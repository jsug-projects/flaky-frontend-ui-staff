import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import {Moment} from "moment";
import * as moment from "moment";
import {Validation, GenericValidator} from "util/Validation";
import {notEmpty} from "util/UniValidators";
import axios from "axios";
import {routeModel} from "app/model/GlobalRouteModel";


export class EventEditModel {

	id:string;
	@observable eventName:string;
	@observable eventPlace:string;
	@observable overview:string;
	@observable attendeeMaxSize:number;
	@observable startDate:Moment;
	@observable endDate:Moment;

	validation:Validation;

	constructor() {
		this.validation = new Validation();
		this.validation.registerUniValueValidators("eventName", ()=>{
			return this.eventName;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("eventPlace", ()=>{
			return this.eventPlace;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("overview", ()=>{
			return this.overview;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("attendeeMaxSize", ()=>{
			return this.attendeeMaxSize;
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


	setInitialData(event:Event) {

		this.validation.clearErrors();

		this.id = event.id;
		this.eventName = event.eventName;
		this.eventPlace = event.eventPlace;
		this.overview = event.overview;
		this.attendeeMaxSize = event.attendeeMaxSize;
		this.startDate = event.startDateTime?moment(event.startDateTime):null;
		this.endDate = event.endDateTime?moment(event.endDateTime):null;

		this.validation.validateAll();
	}

	doneCallback:Function;
	setDoneCallback(doneCallback:Function) {
		this.doneCallback = doneCallback;
	}

	updateEventName(eventName) {
		this.eventName = eventName;
		this.validation.touchAndValidate("eventName");
	}

	updateEventPlace(place) {
		this.eventPlace = place;
		this.validation.touchAndValidate("eventPlace");
	}

	updateOverview(overview) {
		this.overview = overview;
		this.validation.touchAndValidate("overview");
	}

	updateAttendeeMaxSize(size) {
		this.attendeeMaxSize = size;
		this.validation.touchAndValidate("attendeeMaxSize");
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
		let event = new Event();
		event.eventName = this.eventName;
		event.overview = this.overview;
		event.attendeeMaxSize = this.attendeeMaxSize;
		event.eventPlace = this.eventPlace;
		event.startDateTime = this.startDate.toDate();
		event.endDateTime = this.endDate.toDate();

		if (this.id == null) {
			axios.post("/api/events", event)
			.then((res)=>{
				let regex = /([^/]+$)/;
				this.id = regex.exec(res.headers["location"])[0];
				this.doneCallback();
			});	
		} else {
			axios.put("/api/events/"+this.id, event)
			.then(()=>{
				this.doneCallback();
			});	
		}

	}

}