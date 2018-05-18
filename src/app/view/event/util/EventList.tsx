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

@observer
export class EventList extends React.Component<{
	model:EventListModel
}, {}> {



	render() {

		return (

			<div>

				<Table dataSource={this.props.model.events} rowKey="id" 
					pagination={false}
					onRow={(record:Event)=>{
						return {
							onClick:()=>{
								this.props.model.select(record);
							}
						}
				}}>
					<Table.Column title="イベント名" key="eventName" dataIndex="eventName"/>
					<Table.Column title="開始日時" key="startDateTime" dataIndex="startDateTime"/>
					<Table.Column title="参加上限数" key="entryAndMaxCount" render={(text, record:Event)=>(
						<span>
							{record.attendeeMaxSize}
						</span>
					)}/>
				</Table>

			</div>

		);
	}
}

