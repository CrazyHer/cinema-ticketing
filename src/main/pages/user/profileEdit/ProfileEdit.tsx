import { Form, Upload, Input, Divider, Button, message, Cascader } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
// import ImgCrop from 'antd-img-crop';
import { useForm } from 'antd/es/form/Form';
import { useHistory } from 'react-router';
import User from '../../../mobxStore/user';
import { fetch } from '../../../rapper';

interface IFormData {
  imgSrc: string | undefined;
  username: string;
  email: string;
  address: string[];
  phone: string;
}

const ProfileEdit = (props: any) => {
  const user = props.user as User;
  const [form] = useForm<IFormData>();
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(user.avatarURL);
  const handleSubmit = async (e: IFormData) => {
    setLoading(true);
    try {
      console.log(e);
      const res = await fetch['POST/user/editprofile']({
        address: e.address,
        email: e.email,
        imgSrc: e.imgSrc ? e.imgSrc : '',
        username: e.username,
        phone: e.phone,
      });
      if (res.code === 0) {
        message.success('修改成功');
      } else {
        message.error(`修改失败,${res.message}`);
      }
    } catch (error) {
      message.error('修改失败，请求异常');
    } finally {
      setLoading(false);
    }
  };

  const getFileBase64 = (file: File) => {
    return new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImgChange = async (file: File) => {
    if (
      !(
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      )
    ) {
      message.info('只能上传jpeg,png或jpg格式图片！');
      return false;
    }

    if (file.size / 1024 / 1024 > 1) {
      message.info('图片必须小于1m！');
      return false;
    }

    const src = await getFileBase64(file);
    setImgSrc(src as string);
    form.setFieldsValue({ imgSrc: src });
    return false;
  };

  const history = useHistory();
  const handleCancle = () => {
    history.push('/user');
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
        <div>
          <p style={{ float: 'left' }}>个人头像：</p>

          <Upload
            prefixCls="image"
            beforeUpload={handleImgChange}
            listType="picture-card"
            showUploadList={false}
          >
            {imgSrc ? (
              <img width="128px" height="128px" src={imgSrc} alt="图片预览" />
            ) : (
              '+ 上传头像'
            )}
          </Upload>
        </div>

        <Form.Item label="昵称" name="username" required>
          <Input />
        </Form.Item>
        <Form.Item label="头像" name="imgSrc" hidden />

        <Form.Item
          label="手机"
          name="phone"
          hasFeedback
          validateFirst
          rules={[
            { required: true, message: '请输入手机号码' },
            {
              transform: (v) => Number(v),
              type: 'number',
              message: '手机号码必须为有效数字',
            },
            { type: 'string', len: 11, message: '手机号码必须为11位' },
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
          label="地区"
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
export default inject('user')(observer(ProfileEdit));
