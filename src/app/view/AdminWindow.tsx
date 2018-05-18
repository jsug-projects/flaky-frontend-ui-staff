import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import {observable, computed} from "mobx";

import {Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;

import {routeModel} from "app/model/GlobalRouteModel";
import {contextModel} from "app/model/GlobalContextModel";

import {MainMenu} from "./MainMenu";
import {FutureEventListPage} from "app/view/event/future/FutureEventListPage";
import {PastEventListPage} from "app/view/event/past/PastEventListPage";
import {FutureEventDetailPage} from "app/view/event/future/FutureEventDetailPage";
import {PastEventDetailPage} from "app/view/event/past/PastEventDetailPage";
import {EventDetailModel} from "app/model/event/EventDetailModel";
import {EventListModel} from "app/model/event/EventListModel";
import {EventRegisterPage} from "app/view/event/register/EventRegisterPage";
import {LoginPage} from "./LoginPage";
import {PortalPage} from "./PortalPage";
import {Staff} from "app/dto/member/Staff";
import {StaffRegisterPage} from "app/view/staff/StaffRegisterPage";
import {StaffRegisterModel} from "app/model/member/StaffRegisterModel";
import {AttendManageModel} from "app/model/event/AttendManageModel";
import {AttendManagePage} from "app/view/attend/AttendManagePage";
import "./AdminWindow.scss";

@observer
export class AdminWindow extends React.Component<{
}, {}> {


	eventDetailModel:EventDetailModel;
	eventListModel:EventListModel;
	staffRegisterModel:StaffRegisterModel;
	attendManageModel:AttendManageModel;

	componentWillMount() {
		contextModel.loadLoginedStaff();

		this.eventDetailModel = new EventDetailModel();
		this.eventListModel = new EventListModel();
		this.staffRegisterModel = new StaffRegisterModel();
		this.attendManageModel = new AttendManageModel();
	}


	render() {

		if (contextModel.loginedStaff == null) {
			return null;
		}

		return (

			<Layout className="AdminWindow" style={{ minHeight: '100vh'}}>

				<Sider>
					<div className="logo"
					style={{cursor:"pointer"}}
					onClick={()=>{
						routeModel.route("/portal");
					}}
					>
						<div>
							スタッフ用画面
						</div>
					</div>


					<MainMenu/>

					<div style={{color:"white"}}>
						{contextModel.loginedStaff.emailAddress}<br/>でログイン中
					</div>

					<div>
						<a 
						onClick={()=>{
							contextModel.logout();
							routeModel.route("/login");
						}}
						href="javascript:void(0);">ログアウト</a>
					</div>
				</Sider>

				<Content style={{ background: '#fff', padding: 24, minHeight: 280 }}>
				{routeModel.path == "/portal"||routeModel.path == null?
					<PortalPage/>
				:null}
				{routeModel.path == "/event/future/list"?
					<FutureEventListPage model={this.eventListModel}/>
				:null}
				{routeModel.path == "/event/future/detail"?
					<FutureEventDetailPage model={(()=>{
						this.eventDetailModel.loadEventDetail(routeModel.params.id);
						return this.eventDetailModel;
					})()}/>
				:null}
				{routeModel.path == "/event/past/list"?
					<PastEventListPage model={this.eventListModel}/>
				:null}
				{routeModel.path == "/event/past/detail"?
					<PastEventDetailPage model={(()=>{
						this.eventDetailModel.loadEventDetail(routeModel.params.id);
						return this.eventDetailModel;
					})()}/>
				:null}
				{routeModel.path == "/event/edit/new"?
					<EventRegisterPage/>
				:null}
				{routeModel.path == "/staff/register"?
					<StaffRegisterPage model={this.staffRegisterModel}/>
				:null}
				{routeModel.path == "/attend/manage"?
					<AttendManagePage model={(()=>{
						this.attendManageModel.setInitialData(routeModel.params.eventId);
						return this.attendManageModel;
					})()}/>
				:null}

				</Content>
			</Layout>

		);
	}



}

