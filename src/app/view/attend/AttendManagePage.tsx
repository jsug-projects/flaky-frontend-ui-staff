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
import { List, Avatar } from 'antd';


import * as debounce from "throttle-debounce/debounce";

import {AttendManageModel} from "app/model/event/AttendManageModel";
import {Attendee} from "app/dto/event/Attendee";

@observer
export class AttendManagePage extends React.Component<{
	model:AttendManageModel;
}, {}> {


	componentWillMount() {
		this.debounceSearchFn = debounce(500, ()=>{
			this.props.model.searchAttendee();
		});	
	}


	debounceSearchFn:Function;
	

	render() {

		return (

			<div>
				<div className="pageTitle">入場受付</div>

				<dt>現在の入場数</dt>
				<dd>{this.props.model.attendanceSize}/{this.props.model.attendeeSize}</dd>

				<div>参加者検索</div>
					<Form>
					<Input 
					value={this.props.model.searchKeyword}
					placeholder="キーワード"
					onChange={(evt)=>{
						this.props.model.updateSearchKeyword(evt.target.value);
						this.debounceSearchFn();									
					}}				
					/>

					{ // dataSource内のデータを更新しても何故かrenderが呼ばれないので、明示的に更新データを参照する
						// Ant DesignとMobxの相性が悪い？						
						this.props.model.attendees.map((attendee, idx)=>(
						attendee.isAttended?null:null
					))}

					<List itemLayout="horizontal" dataSource={this.props.model.attendees}

					renderItem={(attendee)=>(
						<List.Item key={attendee.id}
						actions={[
						attendee.isAttended==false?
						<a onClick={()=>{
							this.props.model.attend(attendee);
						}}>入場</a>
						:
						<a onClick={()=>{
							this.props.model.unattend(attendee);
						}}>取消</a>
						]}>
							<List.Item.Meta							
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
							title={attendee.displayName+"（"+attendee.belongTo+"）"+(attendee.isAttended?"入場済み":"")}
							/>
						</List.Item>
					)}
					/>

				</Form>
			</div>

		);
	}
}

