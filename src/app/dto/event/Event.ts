import {Session} from "./Session";

export class Event {
	id:string;
	eventName:string;
	overview:string;
	attendeeMaxSize:number;
	startDateTime:Date;
	endDateTime:Date;
	eventPlace:string;
	publishDateTime:Date;

	attendeeSize:number;

	sessions:Array<Session>;

}