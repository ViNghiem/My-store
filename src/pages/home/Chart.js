import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip,ResponsiveContainer  } from 'recharts';
import {useEffect,useState} from 'react';
import { axiosToken } from '../../util/ConfihAxios'
import {URLAPI} from '../../util/index'
const GroupedBarChart = (prods) => {
  var selectday
  var timeEnd
  const startDay = prods.StartDay

  console.log("-----startDay-----",startDay)

  const [data, setData] = useState();
  const Startday = startDay[0]
  const Enday = startDay[1]

  const startDateParts = Startday.split('/');
  const endDateParts = Enday.split('/');
  
  const startDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);
  const endDate = new Date(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`);
  
  const timeDifference = endDate - startDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  if(daysDifference > 0) {
    timeEnd = Enday
    selectday = daysDifference
  }else{
    timeEnd = Startday
    selectday = prods.selectday
  }
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    axiosToken.get(`${URLAPI}/admin/orders/dataweek`, {
        withCredentials: true ,
      headers: {
        'Content-Type': 'application/json',
        'token': `${token}`   
      },
      params:{
        timeEnd:timeEnd,
        dayselect:selectday
      }
  }).then((res)=>{
    const dataa = res.data.data

    setData(dataa)
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectday,timeEnd]);


  return (
    <div style={{ width: '100%', height: '400px' }}>
    <ResponsiveContainer width="100%" height="100%">
          <BarChart  data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
            <Bar dataKey="pending" fill="#82ca9d" />
            <Bar dataKey="delivered" fill="#FF8042" />
          </BarChart>
          </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;