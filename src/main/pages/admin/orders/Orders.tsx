/* eslint-disable react/display-name */
import { message, Modal, Table } from 'antd';
import Button from 'antd/es/button';
import { ColumnsType } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { fetch, Models } from '../../../rapper';
import Style from './Orders.module.css';

interface IRecordData {
  orderID: number;
  userID: string;
  filmName: string;
  hall: string;
  time: string;
  selectedSeats: {
    row: number;
    line: number;
  }[];
  totalPrice: number;
  status: number;
  key: number;
}

const Orders = (props: any) => {
  const [data, setData] =
    useState<Models['GET/admin/getorders']['Res']['data']>();
  const [loading, setLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch['GET/admin/getorders']()
      .then((res) => {
        if (res.code === 0) {
          setData(res.data);
        } else {
          message.error(`获取订单信息失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(`获取订单信息失败,请求异常`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshData]);

  const handleRefund = async (record: IRecordData) => {
    Modal.confirm({
      title: '确认为该用户退票？',
      onOk: () => {
        setRefundLoading(true);
        fetch['GET/user/refund']({ orderID: record.orderID })
          .then((res) => {
            if (res.code === 0) {
              message.success('退票成功');
              setRefreshData(!refreshData);
            } else {
              message.error(`退票失败,${res.message}`);
            }
          })
          .catch((err) => {
            console.error(err);
            message.error(`退票失败,请求异常`);
          })
          .finally(() => {
            setRefundLoading(false);
          });
      },
    });
  };

  const columns: ColumnsType<IRecordData> = [
    { title: '订单号', dataIndex: 'key', align: 'center' },
    { title: '用户ID', dataIndex: 'userID', align: 'center' },
    { title: '电影名称', dataIndex: 'filmName', align: 'center' },
    { title: '放映厅', dataIndex: 'hall', align: 'center' },
    { title: '下单时间', dataIndex: 'time', align: 'center' },
    {
      title: '所选座位',
      dataIndex: 'selectedSeats',
      align: 'center',
      render: (value, record) =>
        record.selectedSeats.map((v) => `${v.row + 1}排${v.line + 1}座 `),
    },
    { title: '支付价格', dataIndex: 'totalPrice', align: 'center' },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (value, record) => {
        if (value === 0) return '已支付';
        if (value === 1) return '已完成';
        return '已退票';
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (value, record) => {
        if (record.status === 0) {
          // 已支付
          return (
            <Button
              type="link"
              onClick={() => handleRefund(record)}
              // loading={refundLoading}
            >
              退票
            </Button>
          );
        }
        return '';
      },
    },
  ];

  return (
    <div>
      <h2>所有订单</h2>
      <div className={Style.table}>
        <Table<IRecordData>
          loading={loading}
          dataSource={data?.map((v) => ({ ...v, key: v.orderID }))}
          columns={columns}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          size="middle"
        />
      </div>
    </div>
  );
};
export default inject()(observer(Orders));
