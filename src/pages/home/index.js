import React from 'react'
import GroupedBarChart from './Chart'
import { Select } from 'antd';
import {useTranslation}  from 'react-i18next';
import { useState } from "react";
import RangePicker from "../../component/RangePicker"


export default function Home() {
 
  const { t } = useTranslation();
  const [ selectday, setSelectday] = useState(7);
  const dateObj = new Date()
  dateObj.setHours(0, 0, 0, 0);
  const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
  const [StartDay,setStartDay] =useState([formattedDate,formattedDate])
  const handleChange = (value) => {
    setSelectday(value)
    setStartDay([formattedDate,formattedDate])
  };
  const updateStartDay= (newState) => {
    setStartDay(newState);
   
  };


  return (
    <>
      <div className='card'>
        <div className='Statistical-chart'>
          <div className='title-chart'>
            <div>thống kê đơn hàng</div>
            <div className='d-flex'>
              <div >
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
              <div className='change-day'>
                <RangePicker updateStartDay={updateStartDay}/>
              </div>
            </div>
          </div>
        <div className='chart'>
            <GroupedBarChart selectday={selectday} StartDay={StartDay}/>
      </div>
        </div>
      </div>
    </>
  )
}
