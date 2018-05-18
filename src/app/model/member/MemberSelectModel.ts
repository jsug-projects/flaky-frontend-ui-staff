import {observable, computed} from "mobx";
import axios from "axios";
import {Event} from "app/dto/event/Event";
import {Member} from "app/dto/member/Member";
import * as queryString from "query-string";

export class MemberSelectModel {


	@observable memberSearchKeyword:string;
	@observable members:Array<Member>;
	
	@observable selectedMember:Member;

	clear() {
		this.members=[];
		this.memberSearchKeyword="";		
	}

	select(member:Member) {
		this.selectedMember = member;
		this.selectCallback(member);
	}

	selectCallback;Function;
	setSelectCallback(callback:Function) {
		this.selectCallback = callback;
	}

	updateSearchKeyword(keyword) {
		this.memberSearchKeyword = keyword;
	}

	searchMember() {
		axios.get("/api/members?"+queryString.stringify({keyword:this.memberSearchKeyword})).then((res)=>{
			this.members = res.data;
		});
	}
	
}