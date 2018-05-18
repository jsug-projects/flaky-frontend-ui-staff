import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import {routeModel} from "app/model/GlobalRouteModel";
import { Layout, Menu, Breadcrumb} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import { Table, Divider } from 'antd';
import {EventListModel} from "app/model/event/EventListModel";
import {EventList} from "app/view/event/util/EventList";

@observer
export class FutureEventListPage extends React.Component<{
	model:EventListModel;
}, {}> {


	componentWillMount() {
		this.props.model.loadFutureEvents();
		this.props.model.setSelectCallback((event:Event)=>{
			routeModel.route("/event/future/detail", {id:event.id});
		});
	}


	render() {

		return (

			<div>
				<div className="pageTitle">直近イベントリスト</div>

				<EventList model={this.props.model}/>

			</div>

		);
	}
}

