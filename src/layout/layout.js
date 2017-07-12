import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Router, Link } from 'dva/router';
import styles from './layout.less';
const { Header, Sider, Content,Footer } = Layout;

const reg = /^\/(\w+[^/])/;

class SiderDemo extends React.Component {
  state = {
     defaultSelectedKeys: 'home'
  }
  render() {
    const { children, location } = this.props;
    let keys = this.state.defaultSelectedKeys;
    if (location.pathname && reg.test(location.pathname)) {
        keys = reg.exec(location.pathname)[1];
    }
    return (
      <Layout className={styles.layout}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          defaultCollapsed={false}
        >
          <div className={styles.logo}><h3>welcome to cwj</h3></div>
          <Menu theme="dark" mode="inline"  selectedKeys={[keys]}>
               <Menu.Item key="home">
                      <Link to="home">
                      <Icon type="user" />
                      <span className="nav-text">车型管理</span>
                      </Link>
              </Menu.Item>
               <Menu.Item key="products">
                   <Link to="products">
                        <Icon type="video-camera" />
                        <span className="nav-text">选择品牌</span>
                    </Link>
              </Menu.Item>
              <Menu.Item key="table">
                      <Link to="table">
                        <Icon type="upload" />
                        <span className="nav-text">报销明细</span>
                      </Link>
              </Menu.Item>
                <Menu.Item key="modelTable">
                      <Link to="modelTable">
                        <Icon type="upload" />
                        <span className="nav-text">nav 4</span>
                      </Link>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          <h3 style={{textAlign:"center"}}>标题:{keys}</h3>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {children}
          </Content>
           <Footer style={{ textAlign: 'center' }}>
            Created by 2017/04/23
          </Footer>
        </Layout>
      </Layout>
    );
  }
}




export default SiderDemo;
