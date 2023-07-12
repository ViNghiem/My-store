import React from 'react'
import GroupedBarChart from './Chart'
import { Select } from 'antd';
import {useTranslation}  from 'react-i18next';
import { useState } from "react";

export default function Home() {
  const { t } = useTranslation();
  const [ selectday, setSelectday] = useState(7);

  const handleChange = (value) => {
    setSelectday(value)
  };



  return (
    <>
      <div className='card'>
        <div className='Statistical-chart'>
          <div className='title-chart'>
            <div>thống kê đơn hàng</div>
            <Select
              defaultValue={t('Stats by week')}
              style={{
                width: 250,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 7,
                  label: t('Stats by week'),
                },
                {
                  value: 30,
                  label: t('Statistics by month'),
                }
              ]}
            />
          </div>
        <div className='chart'>
            <GroupedBarChart selectday={selectday}/>
      </div>
        </div>
      </div>
    </>
  )
}
