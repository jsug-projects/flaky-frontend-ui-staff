import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import {Moment} from "moment";
import * as moment from "moment";
import {Validation, GenericValidator} from "util/Validation";
import {notEmpty} from "util/UniValidators";
import axios from "axios";

import {Speaker} from "app/dto/event/Speaker";
import {Member} from "app/dto/member/Member";
import * as queryString from "query-string";

export class SpeakerEditModel {

	validation:Validation;

	sessionId:string;

	@observable id:string;
	@observable displayName:string;	
	@observable profile:string;
	@observable belongTo:string;
	@observable member:Member;


	constructor() {
		this.validation = new Validation();
		this.validation.registerUniValueValidators("displayName", ()=>{
			return this.displayName;
		},[notEmpty()]);
		// this.validation.registerUniValueValidators("profile", ()=>{
		// 	return this.profile;
		// },[notEmpty()]);
		// this.validation.registerUniValueValidators("belongTo", ()=>{
		// 	return this.belongTo;
		// },[notEmpty()]);
	}


	setInitialData(sessionId:string, speaker:Speaker) {
		this.validation.clearErrors();

		this.sessionId = sessionId;
		this.id = speaker.id;
		this.displayName = speaker.displayName;
		this.profile = speaker.profile;
		this.belongTo = speaker.belongTo;

		if (speaker.memberId != null) {
			axios.get("/api/members/"+speaker.memberId).then((res)=>{
				this.member = res.data;
			});
		}


		this.validation.validateAll();
	}

	doneCallback:Function;
	setDoneCallback(doneCallback:Function) {
		this.doneCallback = doneCallback;
	}

	updateDisplayName(displayName) {
		this.displayName = displayName;
		this.validation.touchAndValidate("displayName");
	}

	updateProfile(profile) {
		this.profile = profile;
		this.validation.touchAndValidate("profile");
	}

	updateBelongTo(belongTo) {
		this.belongTo = belongTo;
		this.validation.touchAndValidate("belongTo");
	}

	updateMember(member) {
		this.member = member;
	}

	saveOrUpdateEvent() {
		let speaker = new Speaker();
		speaker.displayName = this.displayName;
		speaker.profile = this.profile;
		speaker.belongTo = this.belongTo;
		speaker.memberId = this.member.id;
		speaker.sessionId = this.sessionId;

		if (this.id == null) {
			axios.post("/api/speakers", speaker)
			.then((res)=>{
				let regex = /([^/]+$)/;
				this.id = regex.exec(res.headers["location"])[0];
				this.doneCallback();
			});	
		} else {
			axios.put("/api/speakers/"+this.id, speaker)
			.then(()=>{
				this.doneCallback();
			});	
		}

	}


}