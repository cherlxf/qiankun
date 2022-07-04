/*
 * @Author: liaoxf01@mingyuanyun.com
 * @Description: file description
 * @Date: 2022-06-30 15:24:37
 * @LastEditors: liaoxf01@mingyuanyun.com
 */
import { Layout, Menu } from 'antd';
import { history } from 'umi';
import {
  registerMicroApps,
  start,
  setDefaultMountApp,
  addGlobalUncaughtErrorHandler,
  initGlobalState,
  MicroAppStateActions,
} from 'qiankun';
// import { Microconfig } from '@/registerMicroAppsConfig';
import styles from './index.less';

const { Header, Content } = Layout;

const NAVS = [
  {
    path: '/react',
    name: 'React',
  },
  {
    path: '/vue',
    name: 'Vue',
  },
];

const Microconfig = [
  {
    name: 'react',
    entry: 'http://localhost:8001',
    container: '#content',
    activeRule: '/react',
  },
  {
    name: 'vue',
    entry: 'http://localhost:8002',
    container: '#content',
    activeRule: '/vue',
  },
];

/**
 * 注册微应用
 */
registerMicroApps(Microconfig, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app: any) => {
    console.log('before load', app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app: any) => {
    console.log('after mount', app.name);
    return Promise.resolve();
  },
});

/**
 * 启动 qiankun
 */
// start();
start({
  prefetch: true, // 开启预加载
  sandbox: {
    experimentalStyleIsolation: true, //   开启沙箱严格模式,实验性方案
  },
});

// 添加全局异常捕获
addGlobalUncaughtErrorHandler((handler) => {
  console.log('异常捕获', handler);
});

export default function IndexPage(props: any) {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <img
            src="https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png"
            alt="乾坤"
            title="微前端(qiankun + umi)"
          />
          <div className={styles.title}>QianKun</div>
        </div>
        <div className={styles.nav}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/react']}>
            {NAVS.map((item: any) => (
              <Menu.Item
                key={item.path}
                onClick={() => {
                  history.push(item.path);
                }}
              >
                <a>{item.name}</a>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Header>
      <Content className={styles.content}>
        <div id="content"></div>
      </Content>
    </Layout>
  );
}
