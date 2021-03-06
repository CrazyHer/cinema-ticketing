import { Form, Input, Button, message, Checkbox } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import crypto from 'crypto';
import User, { ILoginFormData } from '../../mobxStore/user';
import { fetch } from '../../rapper';
import Style from './Login.module.css';
import filmIcon from '../../assets/filmIcon.svg';

interface IRegisterFormData {
  userID: string;
  password: string;
}

const Login = (props: any) => {
  const user = props.user as User;

  const [loading, setLoading] = useState<boolean>(false);
  const [isRegisterForm, setRegisterForm] = useState<boolean>(false);
  const history = useHistory();

  // 若用户已登录，自动跳转到主页
  useEffect(() => {
    if (user.token !== '') {
      if (user.character === 'user') history.replace('/user');
      else if (user.character === 'admin') history.replace('/admin');
    }
  }, []);

  const [registerForm] = useForm<IRegisterFormData>();
  const [loginForm] = useForm<ILoginFormData>();

  const handleLogin = async (formData: ILoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch['POST/login']({
        userID: formData.userID,
        // 对密码进行SHA256加密
        password: crypto
          .createHmac('sha256', 'CrazyHer')
          .update(formData.password)
          .digest('base64')
          .toString(),
      });
      if (res.code === 0) {
        const { token } = res.data;
        user.setLoginFormData(formData);
        user.setToken(token);
        // 登录成功后获取用户信息
        const userInfoRes = await fetch['GET/user/getuserinfo']();
        if (userInfoRes.code === 0) {
          user.setUserInfo(userInfoRes.data);
          if (user.character === 'user') history.replace('/user');
          else if (user.character === 'admin') history.replace('/admin');
        } else {
          message.warn(`登陆失败,${userInfoRes.message}`);
          console.log(userInfoRes);
        }
      } else {
        message.warn(`登陆失败,${res.message}`);
        console.log(res);
      }
    } catch (error) {
      message.error(`登陆失败，请求异常`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: IRegisterFormData) => {
    try {
      setLoading(true);

      const res = await fetch['POST/register']({
        userID: data.userID,
        // 对密码进行SHA256加密
        password: crypto
          .createHmac('sha256', 'CrazyHer')
          .update(data.password)
          .digest('base64')
          .toString(),
      });
      if (res.code === 0) {
        message.success('注册成功，请登录！');
        setRegisterForm(false);
        registerForm.resetFields();
      } else {
        message.error(`注册失败! ${res.message}`);
      }
    } catch (error) {
      console.error(error);
      message.error('ORZ 服务器好像挂了');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.body}>
      <div className={Style.header}>
        <span />
        <h1>山票票影城售票系统</h1>
        <span />
      </div>
      <div className={Style.content}>
        <img className={Style.icon} alt="山票票" src={filmIcon} />

        <div className={Style.loginFrame}>
          {isRegisterForm ? (
            <Form
              key="registerForm"
              className={Style['register-form']}
              labelCol={{ span: 6 }}
              labelAlign="left"
              form={registerForm}
              onReset={() => registerForm.resetFields()}
              onFinish={handleRegister}
            >
              <Form.Item
                label="账号"
                name="userID"
                hasFeedback
                validateFirst
                rules={[
                  { required: true, message: '请输入账号' },
                  {
                    pattern: /^[\w@]*$/i,
                    message: '账号只允许字母、@和下划线_',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                hasFeedback
                rules={[{ required: true, message: '请输入密码！' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="确认密码"
                hasFeedback
                dependencies={['password']}
                rules={[
                  { required: true, message: '请再次输入密码！' },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('重复密码输入不符！'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  className={Style['register-btn']}
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  注册
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setRegisterForm(false);
                  }}
                >
                  返回登录
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form
              key="loginForm"
              className={Style.loginForm}
              initialValues={user.loginFormData}
              onFinish={handleLogin}
              form={loginForm}
            >
              <Form.Item
                name="userID"
                rules={[{ required: true, message: '请输入账号!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="账号" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: '100%', marginTop: '15px' }}
                  type="primary"
                  htmlType="submit"
                  className={Style['login-form-button']}
                  loading={loading}
                >
                  登录
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setRegisterForm(true);
                  }}
                >
                  注册
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};
export default inject('user')(observer(Login));
