import {
  Column,
  ColumnConfig,
  Line,
  LineConfig,
  Pie,
  PieConfig,
} from '@ant-design/charts';
import { Card, message, Statistic } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { fetch, Models } from '../../../rapper';
import Style from './index.module.css';

const Index = (props: any) => {
  const [data, setData] =
    useState<Models['GET/admin/getstats']['Res']['data']>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch['GET/admin/getstats']()
      .then((res) => {
        if (res.code === 0) {
          setData(res.data);
        } else {
          message.error(`获取信息失败,${res.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(`获取信息失败,请求异常`);
      })
      .finally(() => setLoading(false));
  }, []);

  const dailySalesConfig: LineConfig = {
    data: data?.dailySales || [],
    padding: 'auto',
    xField: 'date',
    yField: 'value',
    slider: {
      start: 0,
      end: 1,
    },
  };

  const boxOfficeRankConfig: ColumnConfig = {
    data: data?.boxOffice || [],
    xAxis: { label: { autoRotate: false } },
    xField: 'filmName',
    yField: 'value',
    slider: {
      start: 0,
      end: 1,
    },
  };

  const boxOfficePieConfig: PieConfig = {
    data: data?.boxOffice || [],
    appendPadding: 10,
    angleField: 'value',
    colorField: 'filmName',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }],
  };

  const seatRateConfig: ColumnConfig = {
    data: data?.seatRate || [],
    xField: 'filmName',
    yField: 'value',
    yAxis: { maxLimit: 1 },
    slider: {
      start: 0,
      end: 1,
    },
  };
  return (
    <div className={Style.body}>
      <div className={Style.numCard}>
        <Card>
          <Statistic title="总用户数" value={data?.users} loading={loading} />
        </Card>
        <Card>
          <Statistic
            title="总销售额 (元)"
            value={data?.sales}
            loading={loading}
          />
        </Card>
      </div>
      <Card loading={loading} title="每日销售额 (元)">
        <Line {...dailySalesConfig} />
      </Card>
      <Card loading={loading} title="票房排行">
        <Column {...boxOfficeRankConfig} />
      </Card>
      <Card loading={loading} title="票房占比">
        <Pie {...boxOfficePieConfig} />
      </Card>
      <Card loading={loading} title="上座率">
        <Column {...seatRateConfig} />
      </Card>
    </div>
  );
};
export default inject('user')(observer(Index));
