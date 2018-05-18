import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";

import { DatePicker } from 'antd';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Alert } from 'antd';

import {LotteryEditModel} from "app/model/lottery/LotteryEditModel";
import {EventLottery} from "app/dto/lottery/EventLottery";

@observer
export class LotteryEditForm extends React.Component<{
	model:LotteryEditModel;
}, {}> {


	componentWillMount() {

	}


	componentDidMount() {
		
	}

	render() {
		return (

			<div>
				<Form>
				<FormItem label="当選数">
				<Input 
				value={this.props.model.electionSize}
				placeholder="当選数"
				onChange={(evt)=>{
					this.props.model.updateElectionSize(evt.target.value);
				}}				
				/>
				{this.props.model.validation.hasTouchedAndError("electionSize")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("electionSize", "当選数")}/>
				:null}

				</FormItem>

				<FormItem label="抽選日">
				<DatePicker
				format="YYYY-MM-DD"
				placeholder="抽選日"
				value={this.props.model.lotteryDate}
				onChange={(date)=>{
					this.props.model.updateLotteryDate(date);
				}}/>
				{this.props.model.validation.hasTouchedAndError("lotteryDate")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("lotteryDate", "抽選日")}/>
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

