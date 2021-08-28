/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/display-name */
import { Carousel, message, Skeleton, Table } from 'antd';
import Button from 'antd/es/button';
import Modal from 'antd/lib/modal/Modal';
import { ColumnsType } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';

import { fetch } from '../../../rapper';
import Style from './FilmDetail.module.css';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2764124_m58gtcntoj7.js',
});

interface IData {
  arrangements: {
    cinema: string;
    hall: string;
    time: string;
    /**
     * 0为禁用，1为空闲，2为占用
     */
    seats: number[][];
    price: number;
    arrangementID: number;
  }[];
  zhName: string;
  enName: string;
  type: string;
  country: string;
  duration: string;
  IMDb: string;
  actor: string;
  boxOffice: number;
  posterURL: string;
  photosURL: string[];
  breif: string;
}

interface IRecordData {
  cinema: string;
  hall: string;
  time: string;
  seats: number[][];
  price: number;
  arrangementID: number;
  key: number;
}

const FilmDetail = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData>();
  const [modalData, setModalData] = useState<IRecordData>();
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; line: number }[]
  >([]);
  const [payLoading, setPayLoading] = useState(false);

  const IMDb = new URLSearchParams(useLocation().search).get('IMDb');

  useEffect(() => {
    if (IMDb) {
      setLoading(true);
      fetch['GET/user/getfilminfo']()
        .then((res) => {
          if (res.code === 0) {
            setData(res.data as IData);
          } else {
            message.error(`获取电影信息失败,${res.message}`);
          }
        })
        .catch((err) => {
          message.error(`获取电影信息失败,请求异常`);
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleTicketingClick = (record: IRecordData) => {
    setModalData(record);
    setModalVisible(true);
  };

  const handleSeatClick = (row: number, line: number) => {
    if (modalData) {
      if (modalData.seats[row][line] === 1) {
        // 深复制seat数组，修改对应标识为3表示欲购买
        const seatData = modalData.seats.map((v) => v.map((sv) => sv));
        seatData[row][line] = 3;
        setModalData({ ...modalData, seats: seatData });
        setSelectedSeats([...selectedSeats, { row, line }]);
      } else if (modalData.seats[row][line] === 3) {
        // 将对应标识改回1
        const seatData = modalData.seats.map((v) => v.map((sv) => sv));
        seatData[row][line] = 1;
        setModalData({ ...modalData, seats: seatData });
        setSelectedSeats(
          selectedSeats.filter((v) => v.line !== line || v.row !== row)
        );
      }
    }
  };

  const handlePay = async () => {
    if (modalData) {
      setPayLoading(true);
      try {
        const res = await fetch['POST/user/pay']({
          arrangementID: modalData.arrangementID,
          selectedSeats,
          price: modalData.price,
        });
        if (res.code === 0) {
          message.success('购票成功');
          setModalVisible(false);
        } else {
          message.error(`购票失败,${res.message}`);
        }
      } catch (error) {
        message.error(`购票失败,请求异常`);
      } finally {
        // 不论如何，最后清空状态
        setPayLoading(false);
        setModalData(undefined);
        setSelectedSeats([]);
      }
    }
  };

  const columns: ColumnsType<IRecordData> = [
    { title: '电影院', dataIndex: 'cinema', align: 'center' },
    { title: '放映厅', dataIndex: 'hall', align: 'center' },
    { title: '放映时间', dataIndex: 'time', align: 'center' },
    { title: '座位情况', dataIndex: 'seats', align: 'center' },
    { title: '票价', dataIndex: 'price', align: 'center' },
    {
      title: '操作',
      align: 'center',
      render: (value, record) => (
        <Button type="link" onClick={() => handleTicketingClick(record)}>
          选座购票
        </Button>
      ),
    },
  ];

  return (
    <Skeleton loading={loading}>
      <div>
        <div className={Style.detailWrapper}>
          <img className={Style.poster} src={data?.posterURL} alt="海报" />
          <div className={Style.title}>
            <h2>{data?.zhName}</h2>
            <h2>{data?.enName}</h2>
          </div>
          <div className={Style.description}>
            <p>类型：{data?.type}</p>
            <p>制片地: {data?.country}</p>
            <p>片长：{data?.duration}</p>
            <p>演职人员：{data?.actor}</p>
            <p>票房：{data?.boxOffice}</p>
          </div>
          <div className={Style.breif}>
            <h3>剧情简介</h3>
            <p>{data?.breif}</p>
          </div>
          <div className={Style.photos}>
            <h3>剧照</h3>
            <Carousel autoplay>
              {data?.photosURL.map((v, i) => (
                <img key={i} className={Style.photos} src={v} alt="剧照" />
              ))}
            </Carousel>
          </div>
        </div>
        <div className={Style.arrangementsWrapper}>
          <h3>排片列表</h3>
          <Table<IRecordData>
            pagination={false}
            dataSource={data?.arrangements.map((v, i) => ({
              ...v,
              key: v.arrangementID,
            }))}
            bordered={false}
            columns={columns}
          />
        </div>
        <div>
          <Modal
            title="选座购票"
            visible={modalVisible}
            footer={null}
            onCancel={() => {
              // 关闭时重置状态
              setModalVisible(false);
              setModalData(undefined);
              setSelectedSeats([]);
            }}
          >
            <div className={Style.modal}>
              <div className={Style.pickSeat}>
                {modalData?.seats.map((v, i) => (
                  <div key={i} className={Style.seatRow}>
                    {v.map((sv, si) => (
                      <div key={si} onClick={() => handleSeatClick(i, si)}>
                        {sv === 0 ? (
                          <IconFont type="icon-SeatDisabled" />
                        ) : sv === 1 ? (
                          <IconFont type="icon-SeatAvailable" />
                        ) : sv === 2 ? (
                          <IconFont type="icon-SeatDefault" />
                        ) : (
                          <IconFont type="icon-SeatSelected" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className={Style.listInfo}>
                您选择了：
                {selectedSeats.map((v, i) => (
                  <div key={i}>
                    第{v.row + 1}排第{v.line + 1}座
                    {i !== selectedSeats.length - 1 && ','}
                  </div>
                ))}
                共{modalData && selectedSeats.length * modalData?.price}元
              </div>
              <Button loading={payLoading} type="primary" onClick={handlePay}>
                支付
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </Skeleton>
  );
};
export default inject()(observer(FilmDetail));
