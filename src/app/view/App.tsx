import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import {observable, computed} from "mobx";

import {Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;

import {routeModel} from "app/model/GlobalRouteModel";
import {contextModel} from "app/model/GlobalContextModel";

import {LoginPage} from "./LoginPage";
import {AdminWindow} from "./AdminWindow";

import "./Global.scss";


@observer
export class App extends React.Component<{
}, {}> {


	render() {
		
		if (contextModel.loginedStaff == null || routeModel.path == "/login") {
			return <LoginPage/>
		}
		return <AdminWindow/>
	}



}

