import {Staff} from "app/dto/member/Staff";
import {Member} from "app/dto/member/Member";
import axios from "axios";
import { autorun, observable } from 'mobx';

export class StaffRegisterModel {



	@observable staffs:Array<Staff>;

	loadStaffs() {
		axios.get("/api/staffs").then((res)=>{
			this.staffs = res.data;
		});
	}

	addStaff(member:Member) {
		let staff = {memberId:member.id};
		
		axios.post("/api/staffs", staff).then((res)=>{
			this.loadStaffs();
		});
	}

	removeStaff(staff:Staff) {
		axios.delete("/api/staffs/"+staff.id).then((res)=>{
			this.loadStaffs();
		});
	}

}