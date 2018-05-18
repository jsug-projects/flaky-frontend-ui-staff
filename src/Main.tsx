
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import {App} from "app/view/App";
import {AxiosSetting} from "./AxiosSetting";

AxiosSetting.init();

ReactDOM.render(
		<App/>
	, document.getElementById("root"));
