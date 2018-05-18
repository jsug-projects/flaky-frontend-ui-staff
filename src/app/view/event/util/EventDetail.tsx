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

import {Event} from "app/dto/event/Event";
import {Session} from "app/dto/event/Session";
import {Speaker} from "app/dto/event/Speaker";
import {routeModel} from "app/model/GlobalRouteModel";
import {EventDetailModel} from "app/model/event/EventDetailModel";
import {EventLottery} from "app/dto/lottery/EventLottery";

import {EventEditForm} from "app/view/event/util/EventEditForm";
import {EventEditModel} from "app/model/event/EventEditModel";

import {SessionEditForm} from "app/view/event/util/SessionEditForm";
import {SessionEditModel} from "app/model/event/SessionEditModel";

import {SpeakerEditForm} from "app/view/event/util/SpeakerEditForm";
import {SpeakerEditModel} from "app/model/event/SpeakerEditModel";

import {LotteryEditForm} from "app/view/event/util/LotteryEditForm";
import {LotteryEditModel} from "app/model/lottery/LotteryEditModel";

@observer
export class EventDetail extends React.Component<{
	model:EventDetailModel;
}, {}> {

	eventEditModel:EventEditModel;
	lotteryEditModel:LotteryEditModel;
	sessionEditModel:SessionEditModel;
	speakerEditModel:SpeakerEditModel;
	
	componentWillMount() {

		if (this.props.model.editable == true) {
			this.eventEditModel = new EventEditModel();
			this.eventEditModel.setDoneCallback(()=>{
				this.props.model.closeEditEvent();
				this.props.model.loadEventDetail(this.props.model.eventDetail.id);
			});	

			this.sessionEditModel = new SessionEditModel();
			this.sessionEditModel.setDoneCallback(()=>{
				this.props.model.closeEditSession();
				this.props.model.loadEventDetail(this.props.model.eventDetail.id);
			});	

			this.speakerEditModel = new SpeakerEditModel();
			this.speakerEditModel.setDoneCallback(()=>{
				this.props.model.closeEditSpeaker();
				this.props.model.loadEventDetail(this.props.model.eventDetail.id);
			});	

			this.lotteryEditModel = new LotteryEditModel();		
			this.lotteryEditModel.setDoneCallback(()=>{
				this.props.model.closeEditLottery();
				this.props.model.loadEventDetail(this.props.model.eventDetail.id);
			});
		}
	}
	

	render() {
		if (this.props.model.eventDetail == null) return null;

		return (

			<div>
				{this.props.model.editable?<span>
				<a href="javascript:;">
				<Icon type="edit"
				onClick={()=>{
					this.eventEditModel.setInitialData(this.props.model.eventDetail);
					this.props.model.editEvent();
				}}
				/>
				</a>
				<Modal title="イベント編集" 
				visible={this.props.model.eventEditing}
				footer={null}
				width={750}
				onCancel={()=>{
					this.props.model.closeEditEvent();
				}}
				>
					<EventEditForm model={this.eventEditModel}/>
				</Modal>
				</span>:null}
				<Row>
					<Col span={12}>

					<dt>イベント名</dt>
					<dd>{this.props.model.eventDetail.eventName}</dd>
					
					<dt>概要</dt>
					<dd>{this.props.model.eventDetail.overview}</dd>

					<dt>場所</dt>
					<dd>{this.props.model.eventDetail.eventPlace}</dd>

					<dt>開始時間</dt>
					<dd>{this.props.model.eventDetail.startDateTime}</dd>

					<dt>終了時間</dt>
					<dd>{this.props.model.eventDetail.endDateTime}</dd>

					</Col>
					<Col span={12}>
					{this.props.model.editable && this.props.model.eventDetail.publishDateTime == null?
					<div>未公開<Button
					onClick={()=>{
						this.props.model.publish(this.props.model.eventDetail.id);
					}}
					>公開する</Button></div>
					:
					<div>
						<dt>公開日</dt>
						<dd>						
						{this.props.model.eventDetail.publishDateTime}
						</dd>

						<dt>申込数</dt>
						<dd>{this.props.model.eventEntrySize}</dd>


						
						<dt>抽選
						{this.props.model.editable?<span>							
							&nbsp;
							<a href="javascript:;"><Icon type="file-add"
							onClick={()=>{
								this.lotteryEditModel.setInitialData(this.props.model.eventDetail.id, new EventLottery());
								this.props.model.editLottery();
							}}
							/></a>
							<Modal title="抽選を編集" 
							visible={this.props.model.lotteryEditing}
							footer={null}
							onCancel={()=>{
								this.props.model.closeEditLottery();
							}}>
								<LotteryEditForm model={this.lotteryEditModel}
								/>
							</Modal>
						</span>:null}
						
						</dt>
						<dd>
							<Table dataSource={this.props.model.eventLotteries} rowKey="id" 
							pagination={false}>
								<Table.Column title="抽選日" key="lotteryDate" dataIndex="lotteryDate"/>
								<Table.Column title="当選数" key="electionSize" dataIndex="electionSize"/>
								<Table.Column title="実施" key="execition" render={(record:EventLottery)=>(
									<span>
										{record.executedDate != null?"済":"未"}
									</span>
								)}/>
								{this.props.model.editable?
								<Table.Column title="操作" key="action" render={(record:EventLottery)=>(
									<span>
										<a href="javascript:;"><Icon type="edit"
										onClick={()=>{
											this.lotteryEditModel.setInitialData(this.props.model.eventDetail.id, record);
											this.props.model.editLottery();											
										}}
										/></a>&nbsp;
										<a href="javascript:;"><Icon type="delete"
										onClick={()=>{
											Modal.confirm({
												title:record.lotteryDate+"の抽選を削除しますか？",
												onOk:()=>{
													this.props.model.deleteLottery(record.id);
												}
											})
										}}
										/></a>
									</span>
								)}/>								
							:null}
							</Table>

						</dd>

						<dt>参加者数(当選済)</dt>
						<dd>{this.props.model.eventDetail.attendeeSize}/{this.props.model.eventDetail.attendeeMaxSize}</dd>
					</div>
					}
					</Col>
				</Row>
					<dt>セッション
						{this.props.model.editable?<span>
						&nbsp;<a href="javascript:;"><Icon type="file-add"
						onClick={()=>{
							this.sessionEditModel.setInitialData(this.props.model.eventDetail.id, new Session());
							this.props.model.editSession();
						}}
						/></a>
						<Modal title="セッションを編集" 
							visible={this.props.model.sessionEditing}
							footer={null}
							onCancel={()=>{
								this.props.model.closeEditSession();
							}}>
								<SessionEditForm model={this.sessionEditModel}/>
						</Modal>
						</span>:null}
					</dt>
					<dd>

					{this.props.model.editable?
					<Modal title="発表者を編集" 
						visible={this.props.model.speakerEditing}
						width={700}
						footer={null}
						onCancel={()=>{
							this.props.model.closeEditSpeaker();
						}}>
							<SpeakerEditForm model={this.speakerEditModel}/>
					</Modal>
					:null}
					<Table dataSource={this.props.model.eventDetail.sessions} rowKey="id"
					pagination={false}
					expandedRowRender={(session:Session)=>(
						<Table dataSource={session.speakers} rowKey="id" pagination={false}>
							<Table.Column title={<span>発表者
								{this.props.model.editable?<span>
								&nbsp;<a href="javascript:;">
								<Icon type="file-add"
								onClick={()=>{
									this.speakerEditModel.setInitialData(session.id, new Speaker());
									this.props.model.editSpeaker();						
								}}
								/></a>
								</span>:null}
							</span>} key="displayName" dataIndex="displayName"/>
							<Table.Column title="プロフィール" key="profile" dataIndex="profile"/>
							<Table.Column title="所属" key="belongTo" dataIndex="belongTo"/>
							{this.props.model.editable?
							<Table.Column title="操作" key="action" render={(speaker:Speaker)=>(
								<span>
									<a href="javascript:;"><Icon type="edit"
									onClick={()=>{
										this.speakerEditModel.setInitialData(session.id, speaker);
										this.props.model.editSpeaker();
									}}
									/></a>&nbsp;
									<a href="javascript:;"><Icon type="delete"
									onClick={()=>{
										Modal.confirm({
											title:speaker.displayName+"のスピーカーを削除しますか？",
											onOk:()=>{
												this.props.model.deleteSpeaker(speaker.id);
											}
										})
									}}
									/></a>
								</span>						
							)}/>
							:null}
						</Table>
					)}
					>
						<Table.Column title="タイトル" key="title" dataIndex="title"/>
						<Table.Column title="概要" key="overview" dataIndex="overview"/>
						<Table.Column title="開始時間" key="startDateTime" dataIndex="startDateTime"/>
						<Table.Column title="終了時間" key="endDateTime" dataIndex="endDateTime"/>
						{this.props.model.editable?
						<Table.Column title="操作" key="action" render={(record:Session)=>(
									<span>
									<a href="javascript:;"><Icon type="edit"
									onClick={()=>{
										this.sessionEditModel.setInitialData(this.props.model.eventDetail.id, record);
										this.props.model.editSession();
									}}
									/></a>&nbsp;
									<a href="javascript:;"><Icon type="delete"
									onClick={()=>{
										Modal.confirm({
											title:record.title+"のセッションを削除しますか？",
											onOk:()=>{
												this.props.model.deleteSession(record.id);
											}
										})
									}}
									/></a>
								</span>						
						)}/>
						:null}
					</Table>
					
					</dd>


				

			</div>

		);
	}
}

