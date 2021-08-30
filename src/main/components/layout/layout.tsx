import { Avatar, Button, Dropdown, Layout, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import User from '../../mobxStore/user';
import { fetch } from '../../rapper';
import Style from './Layout.module.css';

const { Header, Content, Sider } = Layout;

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
    if (user.token && !user.username) {
      // 认为用户信息丢失
      fetch['GET/user/getuserinfo']()
        .then((res) => {
          if (res.code === 0) {
            user.setUserInfo(res.data);
          } else history.replace('/login');
        })
        .catch((err) => {
          console.error(err);
          history.replace('/login');
        });
    }
  }, [pathname, user.token]);

  const handleLogoff = () => {
    user.setToken('');
  };

  if (pathname === '/login') return <>{children}</>;
  // 除登录页面外，其他页面采用顶栏布局

  // 管理员界面布局
  if (pathname.match('admin'))
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
              <img alt="LOGO" />
              <h1>
                <b>山票票影城管理中心</b>
              </h1>
            </div>

            <div>
              <Dropdown
                overlayStyle={{ position: 'fixed' }}
                overlay={
                  <Menu>
                    <Menu.Item key="logoff">
                      <Button onClick={handleLogoff} type="text">
                        退出登录
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={Style['user-tag']}>
                    {user.address} {user.username} 管理员
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Sider theme="light" width={128}>
          <Menu
            mode="inline"
            // 当页面跳转到模块子页面查看详细信息时，侧栏同样显示选择该模块
            selectedKeys={[pathname.split('/detail')[0]]}
            style={{ marginTop: '80px', height: '100%', borderRight: 0 }}
            onClick={({ key }) => {
              history.push(key);
            }}
          >
            <Menu.Item key="/admin">主页</Menu.Item>
            <Menu.Item key="/admin/cinemaedit">影院信息维护</Menu.Item>
            <Menu.Item key="/admin/films">影片管理</Menu.Item>
            <Menu.Item key="/admin/arrangements">排片管理</Menu.Item>
            <Menu.Item key="/admin/halls">放映厅管理</Menu.Item>
            <Menu.Item key="/admin/orders">订单管理</Menu.Item>
            <Menu.Item key="/admin/users">用户管理</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ marginTop: '80px', marginLeft: '20px' }}>
          {children}
        </Content>
      </Layout>
    );

  // 用户界面布局
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
              <b>山票票影城购票系统</b>
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
                <div className={Style['user-tag']}>{user.username}</div>
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
