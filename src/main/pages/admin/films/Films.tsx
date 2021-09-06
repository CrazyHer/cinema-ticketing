/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import { Drawer, message, Table, Button, Form, Input, Upload } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { useForm } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Admin from '../../../mobxStore/admin';
import { fetch, Models } from '../../../rapper';
import Style from './Films.module.css';

interface IRecordData {
  zhName: string;
  enName: string;
  type: string;
  country: string;
  duration: string;
  IMDb: string;
  boxOffice: number;
  key: string;
}

type IFormData = Models['POST/admin/editfilm']['Req'];

const Films = (props: any) => {
  const admin = props.admin as Admin;
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  // 电影海报上传的图像
  const [posterSrc, setPosterSrc] = useState<string>();
  // 剧照上传的图像列表
  const [photosSrcList, setPhotosSrcList] = useState<string[]>([]);
  const [modifyForm] = useForm<IFormData>();
  const [addForm] = useForm<IFormData>();

  useEffect(() => {
    setLoading(true);
    fetch['GET/admin/getfilms']()
      .then((res) => {
        if (res.code === 0) {
          admin.setFilmsData(res.data);
        } else {
          message.error(`获取电影列表失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(`获取电影列表失败,请求异常`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshData]);

  const handleAdd = () => {
    addForm.resetFields();
    setPosterSrc(undefined);
    setPhotosSrcList([]);
    setAddModalVisible(true);
  };
  const handleModify = (IMDb: string) => {
    const target = admin.filmsData?.find((v) => v.IMDb === IMDb);
    if (admin.filmsData && target) {
      modifyForm.setFieldsValue(target);
      setPosterSrc(target.posterURL);
      setPhotosSrcList(target.photosURL);
      setModifyModalVisible(true);
    }
  };
  const handleDelete = async (IMDb: string) => {
    try {
      const res = await fetch['GET/admin/delfilm']({ IMDb });
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

  const onModifySubmit = async (e: IFormData) => {
    setSubmitLoading(true);
    try {
      const res = await fetch['POST/admin/editfilm'](e);
      if (res.code === 0) {
        message.success(`修改成功`);
        setRefreshData(!refreshData);
      } else {
        message.success(`修改失败,${res.message}`);
      }
    } catch (error) {
      console.error(error);
      message.success(`修改失败,请求异常`);
    } finally {
      setModifyModalVisible(false);
      setSubmitLoading(false);
    }
  };
  const onAddSubmit = async (e: IFormData) => {
    setSubmitLoading(true);
    try {
      const res = await fetch['POST/admin/addfilm'](e);
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

  const getFileBase64 = (file: File) => {
    return new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePosterImgChange = async (file: File) => {
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
    setPosterSrc(src);
    if (addModalVisible) {
      addForm.setFieldsValue({ posterURL: src });
    }
    if (modifyModalVisible) {
      modifyForm.setFieldsValue({ posterURL: src });
    }
    return false;
  };
  const handlePhotosImgChange = async (file: File) => {
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
    const src = (await getFileBase64(file)) as string;
    setPhotosSrcList([...photosSrcList, src]);
    if (addModalVisible) {
      addForm.setFieldsValue({ photosURL: [...photosSrcList, src] });
    }
    if (modifyModalVisible) {
      modifyForm.setFieldsValue({ photosURL: [...photosSrcList, src] });
    }
    return false;
  };
  const handlePhotosDelete = (index: number) => {
    setPhotosSrcList(photosSrcList.filter((v, i) => i !== index));
  };

  const columns: ColumnsType<IRecordData> = [
    { title: 'IMDb', dataIndex: 'IMDb' },
    { title: '中文名称', dataIndex: 'zhName' },
    { title: '英文名称', dataIndex: 'enName' },
    { title: '制片地', dataIndex: 'country' },
    { title: '类型', dataIndex: 'type' },
    { title: '时长', dataIndex: 'duration' },
    { title: '票房', dataIndex: 'boxOffice' },
    {
      title: '操作',
      render: (value, record) => (
        <div>
          <Button type="link" onClick={() => handleModify(record.IMDb)}>
            修改
          </Button>
          <Button type="link" onClick={() => handleDelete(record.IMDb)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={Style.body}>
      <div className={Style.btn} style={{ float: 'right' }}>
        <Button type="primary" onClick={() => handleAdd()}>
          添加电影
        </Button>
      </div>
      <div className={Style.table}>
        <Table<IRecordData>
          loading={loading}
          columns={columns}
          dataSource={admin.filmsData?.map((v) => ({ ...v, key: v.IMDb }))}
          size="middle"
        />
      </div>

      <Drawer
        title="修改影片信息"
        visible={modifyModalVisible}
        onClose={() => setModifyModalVisible(false)}
        width={512}
      >
        <Form
          form={modifyForm}
          onFinish={onModifySubmit}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Form.Item
            name="IMDb"
            label="IMDb"
            rules={[{ required: true, message: '请输入IMDb号！' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item name="posterURL" hidden />
          <Form.Item label="电影海报" required>
            <div className="posterUpload">
              <Upload
                prefixCls="image"
                beforeUpload={handlePosterImgChange}
                listType="picture-card"
                showUploadList={false}
              >
                <Button type="link" style={{ width: '128px', height: '128px' }}>
                  {posterSrc ? (
                    <img
                      src={posterSrc}
                      width="128px"
                      height="128px"
                      alt="图片预览"
                    />
                  ) : (
                    '+ 上传图片'
                  )}
                </Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            name="zhName"
            label="中文名称"
            rules={[{ required: true, message: '请输入中文名称！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="enName"
            label="英文名称"
            rules={[{ required: true, message: '请输入英文名称！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请输入电影类型！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="制片地"
            rules={[{ required: true, message: '请输入制片国家/地区！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="时长"
            rules={[{ required: true, message: '请输入电影时长！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="actor"
            label="演职人员"
            rules={[{ required: true, message: '请输入演职人员！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="breif"
            label="剧情简介"
            rules={[{ required: true, message: '请输入剧情简介！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="photosURL" hidden />
          <Form.Item label="剧照">
            <div className="photosUpload">
              {photosSrcList?.map((v, i) => (
                <Button
                  key={i}
                  onClick={() => handlePhotosDelete(i)}
                  type="text"
                  style={{ width: '128px', height: '128px' }}
                >
                  <img width="128px" height="128px" src={v} alt="图片预览" />
                </Button>
              ))}
              <Upload
                prefixCls="image"
                beforeUpload={handlePhotosImgChange}
                listType="picture-card"
                showUploadList={false}
              >
                <Button type="link">+ 上传图片</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" loading={submitLoading}>
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="添加电影"
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        width={512}
      >
        <Form
          form={addForm}
          onFinish={onAddSubmit}
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <Form.Item
            name="IMDb"
            label="IMDb"
            rules={[{ required: true, message: '请输入IMDb号！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="posterURL" hidden />
          <Form.Item label="电影海报" required>
            <div className="posterUpload">
              <Upload
                prefixCls="image"
                beforeUpload={handlePosterImgChange}
                listType="picture-card"
                showUploadList={false}
              >
                <Button type="link" style={{ width: '128px', height: '128px' }}>
                  {posterSrc ? (
                    <img
                      src={posterSrc}
                      width="128px"
                      height="128px"
                      alt="图片预览"
                    />
                  ) : (
                    '+ 上传图片'
                  )}
                </Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            name="zhName"
            label="中文名称"
            rules={[{ required: true, message: '请输入中文名称！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="enName"
            label="英文名称"
            rules={[{ required: true, message: '请输入英文名称！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请输入电影类型！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="制片地"
            rules={[{ required: true, message: '请输入制片国家/地区！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="时长"
            rules={[{ required: true, message: '请输入电影时长！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="actor"
            label="演职人员"
            rules={[{ required: true, message: '请输入演职人员！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="breif"
            label="剧情简介"
            rules={[{ required: true, message: '请输入剧情简介！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="photosURL" hidden />
          <Form.Item label="剧照">
            <div className="photosUpload">
              {photosSrcList?.map((v, i) => (
                <Button
                  key={i}
                  onClick={() => handlePhotosDelete(i)}
                  type="text"
                  style={{ width: '128px', height: '128px' }}
                >
                  <img width="128px" height="128px" src={v} alt="图片预览" />
                </Button>
              ))}
              <Upload
                prefixCls="image"
                beforeUpload={handlePhotosImgChange}
                listType="picture-card"
                showUploadList={false}
              >
                <Button type="link">+ 上传图片</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" loading={submitLoading}>
              添加电影
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default inject('admin')(observer(Films));
