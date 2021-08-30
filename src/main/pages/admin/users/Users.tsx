/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import {
  Drawer,
  message,
  Table,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Cascader,
} from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { useForm } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Moment } from 'moment';
import { fetch, Models } from '../../../rapper';
import Style from './Users.module.css';
import Admin from '../../../mobxStore/admin';
import User from '../../../mobxStore/user';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2764124_m58gtcntoj7.js',
});

interface IFormData {
  username: string;
  email: string;
  phone: string;
  address: string[];
  password: string;
  userID: string;
}

interface IRecordData {
  userID: string;
  username: string;
  role: string;
  address: string;
}

const Users = (props: any) => {
  const admin = props.admin as Admin;
  const user = props.user as User;
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addForm] = useForm<IFormData>();

  useEffect(() => {
    setLoading(true);
    fetch['GET/admin/getusers']()
      .then((res) => {
        if (res.code === 0) {
          admin.setUsersData(res.data);
        } else {
          message.error(`获取用户列表失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(`获取用户列表失败,请求异常`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshData]);

  const handleAdd = () => {
    addForm.resetFields();
    setAddModalVisible(true);
  };

  const handleDelete = async (userID: string) => {
    try {
      const res = await fetch['GET/admin/deluser']({ userID });
      if (res.code === 0) {
        message.success(`删除成功`);
        setRefreshData(!refreshData);
      } else {
        message.error(`删除失败,${res.message}`);
      }
    } catch (error) {
      message.error(`删除失败,请求异常`);
      console.error(error);
    }
  };

  const onAddSubmit = async (e: IFormData) => {
    setSubmitLoading(true);
    try {
      const res = await fetch['POST/admin/addadmin'](e);
      if (res.code === 0) {
        message.success(`添加成功`);
        setRefreshData(!refreshData);
      } else {
        message.success(`添加失败,${res.message}`);
      }
    } catch (error) {
      console.error(error);
      message.success(`添加失败,请求异常`);
    } finally {
      setAddModalVisible(false);
      setSubmitLoading(false);
    }
  };

  const columns: ColumnsType<IRecordData> = [
    { title: 'ID', dataIndex: 'userID' },
    { title: '名称', dataIndex: 'username' },
    {
      title: '权限',
      dataIndex: 'role',
      render: (value, record) =>
        record.role === 'admin' ? '分店管理员' : '普通用户',
    },
    { title: '所在地区', dataIndex: 'address' },
    {
      title: '操作',
      render: (value, record) => (
        <div>
          <Button type="link" onClick={() => handleDelete(record.userID)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className={Style.btn}>
        <Button type="primary" onClick={() => handleAdd()}>
          添加分店管理员
        </Button>
      </div>
      <div className={Style.table}>
        <Table<IRecordData>
          loading={loading}
          columns={columns}
          dataSource={admin.usersData?.map((v) => ({
            ...v,
            key: v.userID,
          }))}
        />
      </div>

      <Drawer
        title="添加分店管理员"
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        width={512}
      >
        <Form form={addForm} onFinish={onAddSubmit}>
          <Form.Item
            label="新用户账号"
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
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject('重复密码输入不符！');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

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

          <Form.Item>
            <Button htmlType="submit" loading={submitLoading}>
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default inject('admin', 'user')(observer(Users));
