import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as debounce from "throttle-debounce/debounce";

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

@observer
export class MemberSelect extends React.Component<{
	model:MemberSelectModel;
}, {}> {


	componentWillMount() {
		this.debounceSearchFn = debounce(500, ()=>{
			this.props.model.searchMember();
		});	

	}


	debounceSearchFn:Function;

	render() {
		return (
			<div>
					メンバー選択
					<Form>
					<Input 
					value={this.props.model.memberSearchKeyword}
					placeholder="キーワード"
					onChange={(evt)=>{
						this.props.model.updateSearchKeyword(evt.target.value);
						this.debounceSearchFn();									
					}}				
					/>
					<List itemLayout="horizontal" dataSource={this.props.model.members}
					renderItem={(member:Member)=>(
						<List.Item actions={[
						<a onClick={()=>{
							this.props.model.select(member);
						}}>選択</a>
						]}>
							<List.Item.Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
							title={member.emailAddress}
							/>
						</List.Item>
					)}
					/>
				</Form>
			</div>
		);
	}
}

