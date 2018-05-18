import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';

import {Event} from "app/dto/event/Event";
import {Speaker} from "app/dto/event/Speaker";
import {Member} from "app/dto/member/Member";
import { DatePicker } from 'antd';
import { Row, Col } from 'antd';				
import { List, Avatar } from 'antd';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Alert } from 'antd';

import {SpeakerEditModel} from "app/model/event/SpeakerEditModel";
import {MemberSelectModel} from "app/model/member/MemberSelectModel";
import {MemberSelect} from "app/view/util/MemberSelect";
@observer
export class SpeakerEditForm extends React.Component<{
	model:SpeakerEditModel;
}, {}> {

	memberSelectModel:MemberSelectModel;

	componentWillMount() {
		this.memberSelectModel = new MemberSelectModel();
		this.memberSelectModel.setSelectCallback((member:Member)=>{
			this.props.model.updateMember(member);
		});
	}


	componentDidMount() {
	
	}


	render() {
		return (

			<div>
				<Row gutter={16}>
					<Col span={14}>
				<Form>
				<FormItem label="名前">
				<Input 
				value={this.props.model.displayName}
				placeholder="名前"
				onChange={(evt)=>{
					this.props.model.updateDisplayName(evt.target.value);
				}}				
				/>
				{this.props.model.validation.hasTouchedAndError("displayName")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("displayName", "名前")}/>
				:null}

				</FormItem>

				<FormItem label="プロフィール">
				<Input.TextArea 
				value={this.props.model.profile}
				placeholder="プロフィール"
				onChange={(evt)=>{
					this.props.model.updateProfile(evt.target.value);
				}}
				/>
				{this.props.model.validation.hasTouchedAndError("profile")?
				<Alert type="error" message={this.props.model.validation.getErrorMsg("profile", "プロフィール")}/>
				:null}
				</FormItem>

				<FormItem label="メンバー">
				<span>{this.props.model.member?this.props.model.member.emailAddress:"未選択"}</span>
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
				</Col>
				<Col span={10}>
					<MemberSelect model={this.memberSelectModel}/>
				</Col>

				</Row>
			</div>
		);
	}
}

