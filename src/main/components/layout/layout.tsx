import { Avatar, Button, Dropdown, Layout, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import User from '../../mobxStore/user';
import { fetch } from '../../rapper';
import Style from './Layout.module.css';

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
    if (user.character !== 'admin' && pathname.match('admin')) {
      history.replace('/login');
      message.warning('您无权访问此页面');
    }
    if (user.token && !user.name) {
      // 认为用户信息丢失
      fetch['GET/getuserinfo']().then((res) => {
        if (res.code === 0) {
          user.setUserInfo(res.data);
        } else history.replace('/login');
      });
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
          height: '67.5px',
          width: '100%',
          position: 'fixed',
          zIndex: 99,
        }}
      >
        <div className={Style.header}>
          <div className={Style.title}>
            {pathname !== '/user' && pathname !== '/admin' && (
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={() => history.goBack()}
              />
            )}
            <img alt="LOGO" />
            <h1>
              <b>山票票电影购票系统</b>
            </h1>
          </div>

          <div>
            <Dropdown
              overlayStyle={{ position: 'fixed' }}
              overlay={
                <Menu>
                  <Menu.Item key="editUserInfo">
                    <Button
                      onClick={() => {
                        history.push('/user/profileedit');
                      }}
                      type="text"
                    >
                      修改个人信息
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="orders">
                    <Button
                      onClick={() => history.push('/user/orders')}
                      type="text"
                    >
                      我的订单
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="logoff">
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
                  icon={<img src={user.avatarURL} alt="头像" />}
                />
                <div className={Style['user-tag']}>{user.name}</div>
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content style={{ marginTop: '80px' }}>{children}</Content>
    </Layout>
  );
};

export default inject('user')(observer(HLayout));
