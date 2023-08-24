
import {useTranslation}  from 'react-i18next';
import { DatePicker, Space } from 'antd';
import  { useState } from 'react';


const RangePicker  = (props) =>{
  const updateStartDay = props.updateStartDay
  const { RangePicker } = DatePicker;
  const { t } = useTranslation();

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const today = new Date();
  
    today.setHours(0, 0, 0, 0);
    return current && current.toDate() > today;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const ChangeDay = (data) =>{
    updateStartDay([data[0]?.format('DD/MM/YYYY'),data[1]?.format('DD/MM/YYYY')])
  }
 
  return(
    <RangePicker
    
    value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => {
        setDates(val);
      }}
      onChange={(val) => {
        ChangeDay(val)
        setValue(val)
      }}
      onOpenChange={onOpenChange}
      changeOnBlur
    
    
    placeholder={[t("Start"), t("End")]} />
  )
}

export default RangePicker