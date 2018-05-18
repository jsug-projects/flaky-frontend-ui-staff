import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import { Layout, Menu, Breadcrumb} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';
import { Table, Divider } from 'antd';
import { Row, Col } from 'antd';	
import { List, Avatar } from 'antd';
import {Modal} from "antd";
import {routeModel} from "app/model/GlobalRouteModel";
import {StaffRegisterModel} from "app/model/member/StaffRegisterModel";
import {MemberSelect} from "app/view/util/MemberSelect";
import {MemberSelectModel} from "app/model/member/MemberSelectModel";
import {Staff} from "app/dto/member/Staff";
import {Member} from "app/dto/member/Member";

@observer
export class StaffRegisterPage extends React.Component<{
	model:StaffRegisterModel
}, {}> {


	memberSelectModel:MemberSelectModel;

	componentWillMount() {
		this.props.model.loadStaffs();
		this.memberSelectModel = new MemberSelectModel();
		this.memberSelectModel.setSelectCallback((member:Member)=>{
			this.props.model.addStaff(member);
		});
	}


	render() {

		return (

			<div>
				<div className="pageTitle">スタッフ登録</div>

				<Row gutter={16}>
				<Col span={12}>今のスタッフ</Col>
				<Col span={12}>新しいスタッフを選択</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
					<List itemLayout="horizontal" dataSource={this.props.model.staffs}
					renderItem={(staff:Staff)=>(
						<List.Item actions={[
							<a onClick={()=>{
								Modal.confirm({
									title:staff.emailAddress+"のスタッフを削除しますか？",
									onOk:()=>{
										this.props.model.removeStaff(staff);
									}
								});
							
							}}>削除</a>
							]}>
							<List.Item.Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
							title={staff.emailAddress}
							/>
						</List.Item>
					)}
					/>
					</Col>
					<Col span={12}>
						<MemberSelect model={this.memberSelectModel}/>
					</Col>
				</Row>

			</div>

		);
	}
}

