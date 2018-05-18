import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import { Layout, Menu, Breadcrumb} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import { Table, Divider } from 'antd';
import {EventListModel} from "app/model/event/EventListModel";
import {routeModel} from "app/model/GlobalRouteModel";
import {EventList} from "app/view/event/util/EventList";
@observer
export class PastEventListPage extends React.Component<{
	model:EventListModel
}, {}> {

	componentWillMount() {
		this.props.model.loadPastEvents();
		this.props.model.setSelectCallback((event:Event)=>{
			routeModel.route("/event/past/detail", {id:event.id});
		});
	}


	render() {

		return (

			<div>
				<div className="pageTitle">過去のイベントリスト</div>
				<EventList model={this.props.model}/>

			</div>

		);
	}
}

