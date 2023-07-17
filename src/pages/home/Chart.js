import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import {useEffect,useState} from 'react';
import { axiosToken } from '../../util/ConfihAxios'
import {URLAPI} from '../../util/index'
const GroupedBarChart = (prods) => {
  const selectday = prods.selectday
  const [data, setData] = useState();


  useEffect(() => {
   
  
    const token = localStorage.getItem('accessToken')
    axiosToken.get(`${URLAPI}/admin/orders/dataweek`, {
      headers: {
        'token': `${token}`   
      },
      params:{
        dayselect:selectday
      }
  }).then((res)=>{
    const dataa = res.data.data
    console.log('GetDataWeek',dataa)
    setData(dataa)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectday]);


  return (
   
          <BarChart width={1600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
            <Bar dataKey="pending" fill="#82ca9d" />
            <Bar dataKey="delivered" fill="#FF8042" />
          </BarChart>
        
  );
};

export default GroupedBarChart;