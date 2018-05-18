import {Attendee} from "app/dto/event/Attendee";
import axios from "axios";
import * as queryString from "query-string";
import { observable } from "mobx";

export class AttendManageModel {

	eventId:string;

	setInitialData(id) {
		this.attendees = [];
		this.searchKeyword = "";
		this.attendanceSize = 0;
		this.attendeeSize = 0;
		this.eventId=id;
		this.loadCurrentAttendanceSize();
	}

	@observable attendees:Array<Attendee>;

	@observable searchKeyword:string;
	updateSearchKeyword(keyword) {
		this.searchKeyword = keyword;
	}


	searchAttendee() {
		axios.get("/api/attendees?"+queryString.stringify({eventId:this.eventId, keyword:this.searchKeyword})).then((res)=>{
			this.attendees = res.data;
		});
	}

	@observable attendanceSize:number;
	@observable attendeeSize:number;

	loadCurrentAttendanceSize() {
		axios.get("/api/attendees/size?"+queryString.stringify({eventId:this.eventId})).then((res)=>{
			this.attendanceSize = res.data.attendanceSize;
			this.attendeeSize = res.data.attendeeSize;
		});
	}


	attend(attendee:Attendee) {

		axios.put("/api/attendees/"+attendee.id+"/attend").then(()=>{
			attendee.isAttended = true;
			this.loadCurrentAttendanceSize();
		});
	}

	unattend(attendee:Attendee) {
		axios.put("/api/attendees/"+attendee.id+"/unattend").then(()=>{
			attendee.isAttended = false;
			this.loadCurrentAttendanceSize();
		});
	}


}