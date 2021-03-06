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
import {EventDetailModel} from "app/model/event/EventDetailModel";
import {EventLottery} from "app/dto/lottery/EventLottery";

import {EventDetail} from "app/view/event/util/EventDetail";

@observer
export class PastEventDetailPage extends React.Component<{
	model:EventDetailModel;
}, {}> {


	componentWillMount() {
		this.props.model.setEditable(false);
	}

	

	render() {
		return (

			<div>
				<div className="pageTitle">過去イベント詳細</div>
				<EventDetail model={this.props.model}/>
			</div>

		);
	}
}

