import {observable, computed} from "mobx";
import {Event} from "app/dto/event/Event";
import axios from "axios";
import { EventLottery } from "app/dto/lottery/EventLottery";
import * as queryString from "query-string";

export class EventDetailModel {

	@observable editable:boolean;
	setEditable(editable) {
		this.editable = editable;
	}

	@observable eventEditing:boolean;
	editEvent(){
		this.eventEditing = true;
	}
	closeEditEvent(){
		this.eventEditing = false;
	}

	@observable sessionEditing:boolean;
	editSession() {
		this.sessionEditing = true;
	}
	closeEditSession() {
		this.sessionEditing = false;
	}

	@observable speakerEditing:boolean;
	editSpeaker() {
		this.speakerEditing = true;
	}
	closeEditSpeaker() {
		this.speakerEditing = false;
	}

	@observable
	lotteryEditing:boolean;
	editLottery() {
		this.lotteryEditing = true;
	}
	closeEditLottery() {
		this.lotteryEditing = false;
	}


	@observable eventDetail:Event;	
	@observable eventLotteries:Array<EventLottery>;
	@observable eventEntrySize:number;
	loadEventDetail(id:string) {
		axios.get("/api/events/"+id).then((res)=>{
			this.eventDetail = res.data;

			if (this.eventDetail.publishDateTime != null) {
				axios.get("/api/lotteries?"+queryString.stringify({eventId:id})).then((res)=>{
					this.eventLotteries = res.data;
				});
		
				axios.get("/api/entries/size?"+queryString.stringify({eventId:id})).then((res)=>{
					this.eventEntrySize = res.data.value;
				});		
			}

		});

	}

	publish(id:string) {
		axios.put("/api/events/"+id+"/publish").then((res)=>{
			this.loadEventDetail(id);
		});
	}


	deleteLottery(id:string) {
		axios.delete("/api/lotteries/"+id).then((res)=>{
			this.loadEventDetail(this.eventDetail.id);
		})
	}
	deleteSession(id:string) {
		axios.delete("/api/sessions/"+id).then((res)=>{
			this.loadEventDetail(this.eventDetail.id);
		})
	}
	deleteSpeaker(id:string) {
		axios.delete("/api/speakers/"+id).then((res)=>{
			this.loadEventDetail(this.eventDetail.id);
		})
	}

}