import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { autorun, observable } from 'mobx';
import { observer } from 'mobx-react';
import {Event} from "app/dto/event/Event";
import { Layout, Menu, Breadcrumb} from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Alert } from 'antd';

@observer
export class PortalPage extends React.Component<{
}, {}> {

	render() {
		return (

			<div>
				<div className="pageTitle">ポータル画面</div>
				





			</div>

		);
	}
}

