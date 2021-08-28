/* eslint-disable react/display-name */
import { Drawer, message, Table } from 'antd';
import Button from 'antd/es/button';
import Form from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table/interface';
import { useForm } from 'antd/lib/form/Form';
import Modal from 'antd/lib/modal/Modal';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
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

const Films = (props: any) => {
  const [data, setData] =
    useState<Models['GET/admin/getfilms']['Res']['data']>();
  const [loading, setLoading] = useState(false);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [uploadImgList, setUploadImgList] = useState<string[]>([]);
  const [modifyForm] = useForm();
  const [addForm] = useForm();

  useEffect(() => {
    setLoading(true);
    fetch['GET/admin/getfilms']()
      .then((res) => {
        if (res.code === 0) {
          setData(res.data);
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
  }, []);

  const handleDelete = async (IMDb: string) => {};

  const modifySubmit = async () => {};
  const addSubmit = async () => {};

  const getFileBase64 = (file: File) => {
    return new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
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
          <Button onClick={() => setModifyModalVisible(true)}>
            修改影片信息
          </Button>
          <Button onClick={() => handleDelete(record.IMDb)}>删除</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className={Style.btn}>
        <Button type="primary" onClick={() => setAddModalVisible(true)}>
          添加电影
        </Button>
      </div>
      <div className={Style.table}>
        <Table<IRecordData>
          loading={loading}
          columns={columns}
          dataSource={data?.map((v) => ({ ...v, key: v.IMDb }))}
        />
      </div>

      <Drawer
        title="修改影片信息"
        visible={modifyModalVisible}
        onClose={() => setModifyModalVisible(false)}
      >
        <Form form={modifyForm}>啊</Form>
      </Drawer>

      <Drawer
        title="添加电影"
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      >
        <Form form={addForm}>啊</Form>
      </Drawer>
    </div>
  );
};
export default inject()(observer(Films));
