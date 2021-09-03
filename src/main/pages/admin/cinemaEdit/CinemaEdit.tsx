import { Form, Input, Cascader, Divider, Button, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import User from '../../../mobxStore/user';
import { fetch } from '../../../rapper';

interface IFormData {
  username: string;
  email: string;
  address: string[];
  phone: string;
}

const CinemaEdit = (props: any) => {
  const user = props.user as User;
  const [form] = useForm<IFormData>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: IFormData) => {
    setLoading(true);
    try {
      const res = await fetch['POST/user/editprofile']({
        imgSrc: '',
        address: e.address,
        email: e.email,
        username: e.username,
        phone: e.phone,
      });
      if (res.code === 0) {
        // 重新获取用户信息
        const userInfoRes = await fetch['GET/user/getuserinfo']();
        user.setUserInfo(userInfoRes.data);
        if (userInfoRes.code === 0) {
          message.success('修改成功');
        } else {
          message.error(`修改失败,${res.message}`);
        }
      } else {
        message.error(`修改失败,${res.message}`);
      }
    } catch (error) {
      message.error('修改失败，请求异常');
    } finally {
      setLoading(false);
    }
  };

  const handleCancle = () => {
    history.push('/admin');
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
        }}
      >
        <Form.Item label="影院名称" name="username" required>
          <Input />
        </Form.Item>

        <Form.Item
          label="联系电话"
          name="phone"
          hasFeedback
          validateFirst
          rules={[
            { required: true, message: '请输入联系电话' },
            {
              transform: (v) => Number(v),
              type: 'number',
              message: '联系电话必须为有效数字',
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>

        <Form.Item
          label="电子邮箱"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: '请输入电子邮箱地址' },
            { type: 'email', message: '请输入正确的邮箱' },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="所在地区"
          name="address"
          rules={[{ required: true, message: '请填写地区' }]}
        >
          <Cascader
            options={user.availableCities.map((v) => ({
              value: v.province,
              label: v.province,
              children: v.cities.map((cv) => ({ value: cv, label: cv })),
            }))}
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button
            className="userinfo-btn"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            提交修改
          </Button>
          <Button
            className="userinfo-btn"
            type="default"
            onClick={handleCancle}
            disabled={loading}
          >
            返回
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default inject('user')(observer(CinemaEdit));
