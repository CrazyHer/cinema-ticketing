/* eslint-disable promise/always-return */
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Carousel, message, Skeleton } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import User from '../../../mobxStore/user';
import { fetch, Models } from '../../../rapper';
import Style from './Index.module.css';

const Index = (props: any) => {
  const user = props.user as User;
  const [loading, setLoading] = useState(false);
  const [data, setData] =
    useState<Models['GET/user/gethotfilms']['Res']['data']>();
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    fetch['GET/user/gethotfilms']({ address: user.address })
      .then((res) => {
        if (res.code === 0) {
          setData(res.data.sort((a, b) => a.popularity - b.popularity));
        } else {
          message.error(`获取电影信息失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error('获取电影信息失败，请求异常');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Skeleton loading={loading}>
      <div className={Style.body}>
        <div>
          <h2>{`${user.address[0]}${user.address[1]}`} 正在热映</h2>
          <Carousel
            autoplay
            arrows
            className={Style.carousel}
            nextArrow={<RightOutlined />}
            prevArrow={<LeftOutlined />}
          >
            {data?.slice(0, data.length < 4 ? data.length - 1 : 4).map((v) => (
              <Link key={v.IMDb} to={`/user/filmdetail?IMDb=${v.IMDb}`}>
                <img src={v.posterURL} alt={v.name} />
              </Link>
            ))}
          </Carousel>
        </div>
        <div>
          <h2>票房排行</h2>
          {data?.map((v) => (
            <Link
              className={Style.filmCard}
              key={v.IMDb}
              to={`/user/filmdetail?IMDb=${v.IMDb}`}
            >
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={v.IMDb} src={v.posterURL} />}
              >
                <Card.Meta title={v.name} />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Skeleton>
  );
};
export default inject('user')(observer(Index));
