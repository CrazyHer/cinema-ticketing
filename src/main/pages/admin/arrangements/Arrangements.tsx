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
  Popover,
} from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { useForm } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Moment } from 'moment';
import { fetch } from '../../../rapper';
import Style from './Arrangements.module.css';
import Admin from '../../../mobxStore/admin';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2764124_m58gtcntoj7.js',
});

interface IFormData {
  IMDb: string;
  hallID: string;
  time: Moment;
  price: number;
}

interface IRecordData {
  filmName: string;
  hall: string;
  time: string;
  seats: number[][];
  price: number;
  arrangementID: number;
  key: number;
}

const Arrangements = (props: any) => {
  const admin = props.admin as Admin;
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addForm] = useForm<IFormData>();

  // 刷新排片列表
  useEffect(() => {
    setLoading(true);
    fetch['GET/admin/getarrangements']()
      .then((res) => {
        if (res.code === 0) {
          admin.setArrangementsData(res.data);
        } else {
          message.error(`获取排片列表失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(`获取排片列表失败,请求异常`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshData]);

  // 刷新放映厅信息
  useEffect(() => {
    fetch['GET/admin/gethalls']()
      .then((res) => {
        if (res.code === 0) {
          admin.setHallsData(res.data);
        } else {
          message.error(`获取放映厅列表失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(`获取放映厅列表失败,请求异常`);
      });
  }, []);

  // 刷新影片列表信息
  useEffect(() => {
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
      });
  }, []);

  const handleAdd = () => {
    addForm.resetFields();
    setAddModalVisible(true);
  };

  const handleDelete = async (arrangementID: number) => {
    try {
      const res = await fetch['GET/admin/delarrangement']({ arrangementID });
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
      // 预处理时间选择框的moment对象
      const res = await fetch['POST/admin/addarrangement']({
        ...e,
        time: e.time.format('YYYY-MM-DD HH:mm'),
      });
      if (res.code === 0) {
        message.success(`添加成功`);
        setRefreshData(!refreshData);
      } else {
        message.error(`添加失败,${res.message}`);
      }
    } catch (error) {
      console.error(error);
      message.error(`添加失败,请求异常`);
    } finally {
      setAddModalVisible(false);
      setSubmitLoading(false);
    }
  };

  const renderSeatInfo = (value: any, record: IRecordData) => {
    let count = 0; // 座位总数
    let used = 0; // 上座人数
    for (let i = 0; i < record.seats.length; i += 1) {
      for (let j = 0; j < record.seats[i].length; j += 1) {
        if (record.seats[i][j] === 2) {
          used += 1;
        }
        if (record.seats[i][j] !== 0) {
          count += 1;
        }
      }
    }
    return (
      <Popover
        content={
          <div className={Style.seatInfoWrapper}>
            <div className={Style.screen}>屏幕中央</div>
            {record.seats.map((v, i) => (
              <div key={i} className={Style.seatRow}>
                {v.map((sv, si) => (
                  <div key={si}>
                    {sv === 0 ? (
                      <IconFont type="icon-SeatDisabled" />
                    ) : sv === 1 ? (
                      <IconFont type="icon-SeatAvailable" />
                    ) : (
                      <IconFont type="icon-SeatDefault" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
        title="座位情况"
      >
        {used} / {count}
      </Popover>
    );
  };

  const columns: ColumnsType<IRecordData> = [
    { title: '电影名称', dataIndex: 'filmName' },
    { title: '放映厅', dataIndex: 'hall' },
    { title: '放映时间', dataIndex: 'time' },
    {
      title: '座位情况',
      dataIndex: 'seats',
      render: renderSeatInfo,
    },
    { title: '票价', dataIndex: 'price' },
    {
      title: '操作',
      render: (value, record) => (
        <div>
          <Button
            type="link"
            onClick={() => handleDelete(record.arrangementID)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={Style.body}>
      <div className={Style.btn}>
        <Button type="primary" onClick={() => handleAdd()}>
          添加排片
        </Button>
      </div>
      <div className={Style.table}>
        <Table<IRecordData>
          loading={loading}
          columns={columns}
          dataSource={
            admin.arrangementsData?.map((v) => ({
              ...v,
              key: v.arrangementID,
            })) as IRecordData[]
          }
          size="middle"
        />
      </div>

      <Drawer
        title="添加排片"
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
            label="影片"
            rules={[{ required: true, message: '请选择影片！' }]}
          >
            <Select placeholder="点击选择影片">
              {admin.filmsData.map((v) => (
                <Select.Option value={v.IMDb} key={v.IMDb}>
                  {v.zhName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="hallID"
            label="放映厅"
            rules={[{ required: true, message: '请选择放映厅！' }]}
          >
            <Select placeholder="点击选择放映厅">
              {admin.hallsData.map((v) => (
                <Select.Option value={v.hallID} key={v.hallID}>
                  {v.hallName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="time"
            label="放映时间"
            rules={[{ required: true, message: '请选择放映时间！' }]}
          >
            <DatePicker showTime showMinute format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item
            name="price"
            label="票价"
            rules={[{ required: true, message: '请选择票价！' }]}
          >
            <Input type="number" addonAfter="元" />
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

export default inject('admin')(observer(Arrangements));
