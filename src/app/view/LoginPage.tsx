import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import {routeModel} from "app/model/GlobalRouteModel";
import { Layout, Menu, Breadcrumb} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import {contextModel} from "app/model/GlobalContextModel";
import {Staff} from "app/dto/member/Staff";

@observer
export class LoginPage extends React.Component<{
}, {}> {

	render() {
		return (

			<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
				<div className="pageTitle">ダミーgithubログイン画面</div>

				<Form>
					<Form.Item>
						<Input placeholder="Username"/>
					</Form.Item>
					<Form.Item>
						<Input placeholder="Password" type="password"/>
					</Form.Item>
					<Button type="primary"
					onClick={()=>{
						contextModel.loadLoginedStaff();
						routeModel.route("/portal");
					}}
					>Log in</Button>
				</Form>

			</div>

		);
	}
}

