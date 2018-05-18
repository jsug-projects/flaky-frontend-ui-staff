import {observable, computed} from "mobx";
import {Staff} from "app/dto/member/Staff";
import axios from "axios";

export class ContextModel {

	@observable loginedStaff:Staff;

	loadLoginedStaff() {
		axios.get("/api/staffs/me").then((res)=>{
			this.loginedStaff = res.data;
		});
	}

	logout() {
		axios.put("/api/staffs/logout").then((res)=>{
			this.loginedStaff = null;
		});
	}
}