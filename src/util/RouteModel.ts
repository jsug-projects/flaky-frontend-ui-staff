import {observable, computed} from "mobx";
import * as queryString from "query-string";

export class RouteModel {
	
	@observable path:string;
	params:any;


	init() {
		window.addEventListener("hashchange", (ev) => {
			let pageInfo = this.parseHashToPathInfo(window.location.hash);
			this.route(pageInfo.path, pageInfo.params, false);
		});

		let pageInfo = this.parseHashToPathInfo(window.location.hash);
		if (pageInfo.path != null) {
			console.log("init route path="+pageInfo.path);
			this.route(pageInfo.path, pageInfo.params, false);
		}
	

	}


	route(path:string, params:any=null, pushHistory:boolean=true) {
		console.log("route called. path="+path);
		//同じパスでも、遷移させるため、一旦nullにする
		this.path = null;
		this.params = params;
		this.path = path;
		if (pushHistory == true) {
			let queryStr = "";
			if (params != null) {
				queryStr = "?" + queryString.stringify(params);
			}

			history.pushState(params, null, "/#"+path+queryStr);
		}
	}

	parseHashToPathInfo(hash:string):PathInfo {
		let pathInfo = new PathInfo();
		let qIdx = hash.indexOf("?");

		let urlParamStr: string = null;
		if (qIdx >= 0) {
				urlParamStr = hash.substring(qIdx + 1);
		}
		let path = "";
		if (hash.length == 0 || hash.charAt(0) != "#") {
				path = null;
		} else {
			if (qIdx >= 0) {
					path = hash.substring(1, qIdx);
				} else {
					path = hash.substring(1);
				}
		}

		var urlParam: any = null;
		if (urlParamStr != null) {
				try {
						urlParam = queryString.parse(urlParamStr);
				} catch (exp) {
						console.log(exp);
				}
		}
		pathInfo.path = path;
		pathInfo.params = urlParam;
		return pathInfo;
	}
}

export class PathInfo {
  public path:string;
	public params:any;
	
	public getUrl() {
		let url = window.location.protocol + "//"+window.location.hostname+":"+window.location.port;
		url += "/#" + this.path;
		if (this.params != null && Object.keys(this.params).length > 0) {
			url += "?";
			for (let key of Object.keys(this.params)) {
				url += key+"="+this.params[key]+"&";
			}
			url = url.substr(0, url.length-1);
		}
		return url;
	}

}
