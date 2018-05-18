
import axios from "axios";

export class AxiosSetting {

	public static init() {

		let port = window.location.port;				
		axios.defaults.baseURL = window.location.protocol+"//"+window.location.hostname+":"+port;
		axios.defaults.withCredentials = true;
		axios.defaults.transformResponse = (data)=>{
			if (data == "") {
				return "";
			}
			return JSON.parse(data);
		};
		axios.interceptors.response
		.use((response)=>{
				return response;
			}, (error)=>{
				return Promise.reject(error);
			}
		);
		
	}



}