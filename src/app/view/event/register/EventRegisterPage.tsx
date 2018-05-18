import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Row, Col } from 'antd';				
import { Layout, Menu, Breadcrumb} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import { Table, Divider } from 'antd';
import {Modal} from "antd";

import {Event} from "app/dto/event/Event";
import {Session} from "app/dto/event/Session";
import {Speaker} from "app/dto/event/Speaker";
import {routeModel} from "app/model/GlobalRouteModel";

import {EventLottery} from "app/dto/lottery/EventLottery";

import {EventEditForm} from "app/view/event/util/EventEditForm";
import {EventEditModel} from "app/model/event/EventEditModel";

@observer
export class EventRegisterPage extends React.Component<{
}, {}> {

	eventEditModel:EventEditModel;

	componentWillMount() {
		this.eventEditModel = new EventEditModel();
		this.eventEditModel.setInitialData(new Event());
		this.eventEditModel.setDoneCallback(()=>{
			routeModel.route("/event/future/detail", {id:this.eventEditModel.id});			
		});
	}


	render() {

		return (
			<div>
				<div className="pageTitle">イベント登録</div>
				<EventEditForm
					model={this.eventEditModel}
				/>
			</div>

		);
	}
}

