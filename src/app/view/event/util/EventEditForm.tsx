import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import { DatePicker } from 'antd';
import { Row, Col } from 'antd';				
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';

import {Event} from "app/dto/event/Event";
import {EventEditModel} from "app/model/event/EventEditModel";

@observer
export class EventEditForm extends React.Component<{
	model:EventEditModel;
}, {}> {

	render() {
		return (

			<div>
				<Form>
					<Row gutter={16}>
					<Col span={12}>
				<Form.Item label="イベント名">
				<Input 
				value={this.props.model.eventName}
				placeholder="イベント名"
				onChange={(evt)=>{
					this.props.model.updateEventName(evt.target.value);
				}}				
				/>
				{this.props.model.validation.hasTouchedAndError("eventName")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("eventName", "イベント名")}/>
				:null}

				</Form.Item>

				<Form.Item label="概要">
				<Input.TextArea 
				value={this.props.model.overview}
				placeholder="概要"
				onChange={(evt)=>{
					this.props.model.updateOverview(evt.target.value);
				}}
				/>
				{this.props.model.validation.hasTouchedAndError("overview")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("overview", "概要")}/>
				:null}
				</Form.Item>

				<Form.Item label="場所">
				<Input 
				value={this.props.model.eventPlace}
				placeholder="場所"
				onChange={(evt)=>{
					this.props.model.updateEventPlace(evt.target.value);
				}}
				/>
				{this.props.model.validation.hasTouchedAndError("eventPlace")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("eventPlace", "場所")}/>
				:null}
				</Form.Item>

				<Form.Item label="参加上限数">
				<Input 
				value={this.props.model.attendeeMaxSize}
				placeholder="参加上限数"
				onChange={(evt)=>{
					this.props.model.updateAttendeeMaxSize(evt.target.value);
				}}
				/>
				{this.props.model.validation.hasTouchedAndError("attendeeMaxSize")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("attendeeMaxSize", "参加上限数")}/>
				:null}
				</Form.Item>

				<Form.Item>
				<Button
				disabled={this.props.model.validation.hasAnyError()==true?true:false}
				onClick={()=>{
					this.props.model.validation.validateAll();
					if (this.props.model.validation.hasAnyError() == false) {
						this.props.model.saveOrUpdateEvent();
					}

				}}
				>登録</Button>
				</Form.Item>


				</Col>
				<Col span={12}>
				<Form.Item label="開始日時">
				<DatePicker
				showTime
				format="YYYY-MM-DD HH:mm:ss"
				placeholder="開始日時"
				value={this.props.model.startDate}
				onChange={(date)=>{
					this.props.model.updateStartDate(date);
				}}/>
				{this.props.model.validation.hasTouchedAndError("startDate")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("startDate", "開始日時")}/>
				:null}
				</Form.Item>
				<Form.Item label="終了日時">
				<DatePicker
				showTime
				format="YYYY-MM-DD HH:mm:ss"
				placeholder="終了日時"
				value={this.props.model.endDate}
				onChange={(date)=>{
					this.props.model.updateEndDate(date);
				}}/>
				{this.props.model.validation.hasTouchedAndError("endDate")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("endDate", "終了日時")}/>
				:null}

				</Form.Item>

				</Col>
				</Row>

				</Form>
			</div>
		);
	}
}

