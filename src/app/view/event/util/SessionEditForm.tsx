import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import {Session} from "app/dto/event/Session";
import { DatePicker } from 'antd';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Alert } from 'antd';

import {SessionEditModel} from "app/model/event/SessionEditModel";

@observer
export class SessionEditForm extends React.Component<{
	model:SessionEditModel;
}, {}> {

	componentWillMount() {
	}

	componentDidMount() {
		
	}

	render() {
		return (

			<div>
				<Form>
				<FormItem label="タイトル">
				<Input 
				value={this.props.model.title}
				placeholder="タイトル"
				onChange={(evt)=>{
					this.props.model.updateTitle(evt.target.value);
				}}				
				/>
				{this.props.model.validation.hasTouchedAndError("title")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("title", "タイトル")}/>
				:null}

				</FormItem>

				<FormItem label="概要">
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
				</FormItem>

				<FormItem label="開始日時">
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
				</FormItem>
				<FormItem label="終了日時">
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

				</FormItem>

				<FormItem>
				<Button
				disabled={this.props.model.validation.hasAnyError()==true?true:false}
				onClick={()=>{
					this.props.model.validation.validateAll();
					if (this.props.model.validation.hasAnyError() == false) {
						this.props.model.saveOrUpdateEvent();
					}

				}}
				>登録</Button>
				</FormItem>

				</Form>
			</div>
		);
	}
}

