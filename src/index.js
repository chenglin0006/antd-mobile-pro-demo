import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import BasicLayout from './layouts/BasicLayout';
import store from './store/index';
import './style/common.css';
import './index.less';

dayjs.locale('zh-cn');

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    <BasicLayout />
  </Provider>,
  document.getElementById('root'),
);
/* eslint-enable */

if (module.hot) {
  module.hot.accept();
}
