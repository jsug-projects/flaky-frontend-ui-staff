import {Speaker} from "./Speaker";

export class Session {

	id:string;
	title:string;
	overview:string;	
	speakers:Array<Speaker>;
	startDateTime:Date;
	endDateTime:Date;

	eventId:string;

}