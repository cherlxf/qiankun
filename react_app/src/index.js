/*
 * @Author: liaoxf01@mingyuanyun.com
 * @Description: file description
 * @Date: 2022-06-30 17:14:50
 * @LastEditors: liaoxf01@mingyuanyun.com
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './public-path';

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react' : '/'}>
      <App/>
    </BrowserRouter>
    , container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}