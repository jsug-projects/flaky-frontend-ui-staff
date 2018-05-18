import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import {routeModel} from "app/model/GlobalRouteModel";


import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

@observer
export class MainMenu extends React.Component<{
}, {}> {


	render() {
		return (
			<Menu theme="dark">
				<Menu.Item onClick={()=>{
						routeModel.route("/event/future/list");
				}}>
					<span>今後のイベント</span>
				</Menu.Item>
				<Menu.Item onClick={()=>{
						routeModel.route('/event/past/list');
				}}>
					<span>過去のイベント</span>
				</Menu.Item>
				<Menu.Item onClick={()=>{
						routeModel.route('/event/edit/new');
				}}>
					<span>イベント登録</span>
				</Menu.Item>
				<Menu.Item onClick={()=>{
						routeModel.route('/staff/register');
				}}>
					<span>スタッフ登録</span>
				</Menu.Item>
			</Menu>
		);
	}



}
