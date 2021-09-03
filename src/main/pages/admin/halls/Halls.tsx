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
  Upload,
  Popover,
} from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import { useForm } from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { fetch, Models } from '../../../rapper';
import Style from './Hall.module.css';
import Admin from '../../../mobxStore/admin';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2764124_m58gtcntoj7.js',
});

interface IFormData {
  hallID: number;
  hallName: string;
  seats: number[][];
  comment: string;
}

interface IRecordData {
  hallID: number;
  hallName: string;
  seats: number[][];
  comment: string;
  key: number;
}

const Halls = (props: any) => {
  const admin = props.admin as Admin;
  const [loading, setLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  // 座位矩阵
  const [seats, setSeats] = useState<number[][]>([
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ]);
  const [rows, setRows] = useState(5);
  const [lines, setLines] = useState(5);

  const [addForm] = useForm<IFormData>();
  const [modifyForm] = useForm<IFormData>();

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshData]);

  const handleAdd = () => {
    // 重置座位排布
    setSeats([
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ]);
    setRows(5);
    setLines(5);
    addForm.resetFields();
    setAddModalVisible(true);
  };
  const handleDelete = async (hallID: number) => {
    try {
      const res = await fetch['GET/admin/delhall']({ hallID });
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
  const handleModify = (hallID: number) => {
    const target = admin.hallsData.find(
      (v) => v.hallID === hallID
    ) as IFormData;
    if (admin.filmsData && target) {
      modifyForm.setFieldsValue(target);
      // 加载座位排布
      setSeats(target.seats);
      setRows(target.seats.length);
      setLines(target.seats[0].length);
      setModifyModalVisible(true);
    }
  };

  const onSeatRowValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeats: number[][] = [];
    for (let i = 0; i < e.target.valueAsNumber; i += 1) {
      newSeats.push([]);
      for (let j = 0; j < lines; j += 1) {
        newSeats[i].push(1);
      }
    }
    setSeats(newSeats);
    setRows(newSeats.length);
  };
  const onSeatLineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeats: number[][] = [];
    for (let i = 0; i < rows; i += 1) {
      newSeats.push([]);
      for (let j = 0; j < e.target.valueAsNumber; j += 1) {
        newSeats[i].push(1);
      }
    }
    setSeats(newSeats);
    setLines(newSeats[0].length);
  };

  const handleSeatClick = (row: number, line: number) => {
    // 深复制seat数组
    const newSeats = seats.map((v) => v.map((sv) => sv));
    // 单击座位后，将该座位设置为0禁用或1启用
    newSeats[row][line] = seats[row][line] === 1 ? 0 : 1;
    setSeats(newSeats);
  };

  const onAddSubmit = async (e: IFormData) => {
    setSubmitLoading(true);
    try {
      const res = await fetch['POST/admin/addhall']({ ...e, seats });
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
  const onModifySubmit = async (e: IFormData) => {
    setSubmitLoading(true);
    try {
      const res = await fetch['POST/admin/edithall']({ ...e, seats });
      if (res.code === 0) {
        message.success(`修改成功`);
        setRefreshData(!refreshData);
      } else {
        message.error(`修改失败,${res.message}`);
      }
    } catch (error) {
      console.error(error);
      message.error(`修改失败,请求异常`);
    } finally {
      setModifyModalVisible(false);
      setSubmitLoading(false);
    }
  };

  const columns: ColumnsType<IRecordData> = [
    { title: '放映厅名称', dataIndex: 'hallName' },
    {
      title: '座位情况',
      dataIndex: 'seats',
      render: (value, record) => {
        let count = 0; // 座位总数
        for (let i = 0; i < record.seats.length; i += 1) {
          for (let j = 0; j < record.seats[i].length; j += 1) {
            if (record.seats[i][j] !== 0) {
              count += 1;
            }
          }
        }
        return (
          <Popover
            content={record.seats.map((v, i) => (
              <div key={i} className={Style.seatRow}>
                {v.map((sv, si) => (
                  <div key={si}>
                    {sv === 0 ? (
                      <IconFont type="icon-SeatDisabled" />
                    ) : (
                      <IconFont type="icon-SeatAvailable" />
                    )}
                  </div>
                ))}
              </div>
            ))}
            title="座位排布"
          >
            {count}座
          </Popover>
        );
      },
    },
    { title: '备注', dataIndex: 'comment' },

    {
      title: '操作',
      render: (value, record) => (
        <div>
          <Button type="link" onClick={() => handleModify(record.hallID)}>
            修改
          </Button>
          <Button type="link" onClick={() => handleDelete(record.hallID)}>
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
          添加放映厅
        </Button>
      </div>
      <div className={Style.table}>
        <Table<IRecordData>
          loading={loading}
          columns={columns}
          dataSource={
            admin.hallsData.map((v) => ({
              ...v,
              key: v.hallID,
            })) as IRecordData[]
          }
        />
      </div>

      <Drawer
        title="添加放映厅"
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        width={512}
      >
        <Form form={addForm} onFinish={onAddSubmit}>
          <Form.Item name="hallName" label="放映厅名称">
            <Input />
          </Form.Item>

          <Form.Item name="comment" label="备注">
            <Input />
          </Form.Item>

          <Form.Item label="座位编排">
            <div className={Style.setSeats}>
              <div className={Style.setSeatsGraph}>
                {seats.map((v, i) => (
                  <div key={i} className={Style.seatRow}>
                    {v.map((sv, si) => (
                      <div key={si} onClick={() => handleSeatClick(i, si)}>
                        {sv === 0 ? (
                          <IconFont type="icon-SeatDisabled" />
                        ) : (
                          <IconFont type="icon-SeatAvailable" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                <Input
                  type="number"
                  addonAfter="行"
                  value={rows}
                  onChange={onSeatRowValueChange}
                  min={1}
                />
                <Input
                  type="number"
                  addonAfter="列"
                  value={lines}
                  onChange={onSeatLineValueChange}
                  min={1}
                />
              </div>
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
        title="修改放映厅"
        visible={modifyModalVisible}
        onClose={() => setModifyModalVisible(false)}
        width={512}
      >
        <Form form={modifyForm} onFinish={onModifySubmit}>
          <Form.Item name="hallID" hidden />

          <Form.Item name="hallName" label="放映厅名称">
            <Input />
          </Form.Item>

          <Form.Item label="座位编排">
            <div className={Style.setSeats}>
              <div className={Style.setSeatsGraph}>
                {seats.map((v, i) => (
                  <div key={i} className={Style.seatRow}>
                    {v.map((sv, si) => (
                      <div key={si} onClick={() => handleSeatClick(i, si)}>
                        {sv === 0 ? (
                          <IconFont type="icon-SeatDisabled" />
                        ) : (
                          <IconFont type="icon-SeatAvailable" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                <Input
                  type="number"
                  addonAfter="行"
                  value={rows}
                  onChange={onSeatRowValueChange}
                  min={1}
                />
                <Input
                  type="number"
                  addonAfter="列"
                  value={lines}
                  onChange={onSeatLineValueChange}
                  min={1}
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item name="comment" label="备注">
            <Input />
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

export default inject('admin')(observer(Halls));
