import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {EventLottery} from "app/dto/lottery/EventLottery";
import {Moment} from "moment";
import * as moment from "moment";
import {Validation, GenericValidator} from "util/Validation";
import {notEmpty} from "util/UniValidators";
import axios from "axios";


export class LotteryEditModel {

	validation:Validation;

	eventId:string;

	id:string;
	
	@observable 
	lotteryDate:Moment;

	@observable
	electionSize:number;


	constructor() {
		this.validation = new Validation();
		this.validation.registerUniValueValidators("lotteryDate", ()=>{
			return this.lotteryDate;
		},[notEmpty()]);
		this.validation.registerUniValueValidators("electionSize", ()=>{
			return this.electionSize;
		},[notEmpty()]);
	}

	setInitialData(eventId:string, lottery:EventLottery) {
		this.validation.clearErrors();
		this.eventId = eventId;
		this.id = lottery.id;
		this.electionSize = lottery.electionSize;
		this.lotteryDate = lottery.lotteryDate?moment(lottery.lotteryDate):null;
		this.validation.validateAll();
	}

	doneCallback:Function;
	setDoneCallback(doneCallback:Function) {
		this.doneCallback = doneCallback;
	}

	updateElectionSize(electionSize) {
		this.electionSize = electionSize;
		this.validation.touchAndValidate("electionSize");
	}
	updateLotteryDate(lotteryDate) {
		this.lotteryDate = lotteryDate;
		this.validation.touchAndValidate("lotteryDate");
	}


	saveOrUpdateEvent() {
		let lottery = new EventLottery();
		lottery.electionSize = this.electionSize;
		lottery.lotteryDate = this.lotteryDate.toDate();
		lottery.eventId = this.eventId;

		if (this.id == null) {
			axios.post("/api/lotteries", lottery)
			.then((res)=>{
				let regex = /([^/]+$)/;
				this.id = regex.exec(res.headers["location"])[0];
				this.doneCallback();
			});	
		} else {
			axios.put("/api/lotteries/"+this.id, lottery)
			.then(()=>{
				this.doneCallback();
			});	
		}

	}

}