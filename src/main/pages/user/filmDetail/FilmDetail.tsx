/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/display-name */
import { Carousel, message, Popover, Skeleton, Table } from 'antd';
import Button from 'antd/es/button';
import Modal from 'antd/lib/modal/Modal';
import { ColumnsType } from 'antd/lib/table';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SeatDefault from '../../../assets/SeatDefault.svg';
import SeatDisabled from '../../../assets/SeatDisabled.svg';
import SeatAvailable from '../../../assets/SeatAvailable.svg';
import SeatSelected from '../../../assets/SeatSelected.svg';

import { fetch } from '../../../rapper';
import Style from './FilmDetail.module.css';

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
  const [refresh, setRefresh] = useState(false);
  const IMDb = new URLSearchParams(useLocation().search).get('IMDb');

  useEffect(() => {
    if (IMDb) {
      setLoading(true);
      fetch['GET/user/getfilminfo']({ IMDb })
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
  }, [refresh]);

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
          price: modalData.price * selectedSeats.length,
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
        setRefresh(!refresh);
        setPayLoading(false);
        setModalData(undefined);
        setSelectedSeats([]);
      }
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
                      <img
                        className="seatIcon"
                        src={SeatDisabled}
                        alt="icon-SeatDisabled"
                      />
                    ) : sv === 1 ? (
                      <img
                        className="seatIcon"
                        src={SeatAvailable}
                        alt="icon-SeatAvailable"
                      />
                    ) : (
                      <img
                        className="seatIcon"
                        src={SeatDefault}
                        alt="icon-SeatDefault"
                      />
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
    { title: '电影院', dataIndex: 'cinema', align: 'center' },
    { title: '放映厅', dataIndex: 'hall', align: 'center' },
    { title: '放映时间', dataIndex: 'time', align: 'center' },
    {
      title: '座位情况',
      dataIndex: 'seats',
      align: 'center',
      render: renderSeatInfo,
    },

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
          <div className={Style.filmInfo}>
            <img className={Style.poster} src={data?.posterURL} alt="海报" />
            <div className={Style.wordsWrapper}>
              <div className={Style.title}>
                <h2>{data?.zhName}</h2>
                <p>{data?.enName}</p>
              </div>
              <div className={Style.description}>
                <p>类型：{data?.type}</p>
                <p>片长：{data?.duration}</p>
                <p>票房：{data?.boxOffice}</p>
                <p>制片地: {data?.country}</p>
                <p>演职人员：{data?.actor}</p>
              </div>
            </div>
          </div>

          <div className={Style.breif}>
            <h3>剧情简介</h3>
            <p>{data?.breif}</p>
          </div>

          <div className={Style.photos}>
            <h3>剧照</h3>
            <Carousel autoplay className={Style.carousel}>
              {data?.photosURL.map((v, i) => (
                <img
                  key={i}
                  className={Style.carouselItem}
                  src={v}
                  alt="剧照"
                />
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
            size="middle"
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
              <div className={Style.seatInfoWrapper}>
                <div className={Style.screen}>屏幕中央</div>
                {modalData?.seats.map((v, i) => (
                  <div key={i} className={Style.seatRow}>
                    {v.map((sv, si) => (
                      <div key={si} onClick={() => handleSeatClick(i, si)}>
                        {sv === 0 ? (
                          <img
                            src={SeatDisabled}
                            className="seatIcon"
                            alt="icon-SeatDisabled"
                          />
                        ) : sv === 1 ? (
                          <img
                            src={SeatAvailable}
                            className="seatIcon"
                            alt="icon-SeatAvailable"
                          />
                        ) : sv === 2 ? (
                          <img
                            src={SeatDefault}
                            className="seatIcon"
                            alt="icon-SeatDefault"
                          />
                        ) : (
                          <img
                            src={SeatSelected}
                            className="seatIcon"
                            alt="icon-SeatSelected"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                您选择了：
                <div className={Style.listInfo}>
                  {selectedSeats.map((v, i) => (
                    <div key={i}>
                      第{v.row + 1}排第{v.line + 1}座
                      {i !== selectedSeats.length - 1 && ','}
                    </div>
                  ))}
                </div>
                共{modalData && selectedSeats.length * modalData?.price}
                元
                <br />
                <Button loading={payLoading} type="primary" onClick={handlePay}>
                  支付
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </Skeleton>
  );
};
export default inject()(observer(FilmDetail));
