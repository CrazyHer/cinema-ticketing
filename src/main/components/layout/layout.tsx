import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import User from '../../mobxStore/user';
import './Layout.module.css';

const { Header, Content } = Layout;

const HLayout = (props: any) => {
  const { children } = props;
  const user = props.user as User;
  const history = useHistory();
  const { pathname } = useLocation();
  useEffect(() => {
    // 检查登录状态，若未登录则跳转登录页面
    if (user.token === '' && pathname !== '/login') {
      history.replace('/login');
    }
  }, [pathname, user.token]);

  const handleLogoff = () => {
    user.setToken('');
  };

  if (pathname === '/login') return <>{children}</>;
  // 除登录页面外，其他页面采用顶栏布局

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Header
        style={{
          backgroundColor: 'white',
          borderBottom: 'solid 1px #dbdbdb',
          boxShadow: '0 2.5px 0 #f4f5f7',
          marginBottom: '33.25px',
          height: '67.5px',
        }}
      >
        <div className="header">
          <div className="title">
            <img alt="LOGO" />
            <h1>
              <b>犬眼电影购票系统</b>
            </h1>
          </div>

          <div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Button onClick={() => {}} type="text">
                      修改个人信息
                    </Button>
                    <Button onClick={handleLogoff} type="text">
                      退出登录
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  style={{ marginRight: '20px' }}
                  shape="circle"
                  size="large"
                  icon="U"
                />
                <div className="user-tag">用户</div>
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default inject('user')(observer(HLayout));
