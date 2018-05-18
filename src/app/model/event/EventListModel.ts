import {observable, computed} from "mobx";
import axios from "axios";
import {Event} from "app/dto/event/Event";

export class EventListModel {
	@observable events:Array<Event>;
	
	loadFutureEvents() {
		axios.get("/api/events/future").then((res)=>{
			this.events = res.data;
		});

	}

	loadPastEvents() {
		axios.get("/api/events/past").then((res)=>{
			this.events = res.data;
		});

	}

	selectCallback:Function;
	setSelectCallback(selectCallback:Function) {
		this.selectCallback = selectCallback;
	}

	select(event:Event) {
		this.selectCallback(event);
	}
	
}