import { Select } from 'antd';


const SelectTag =()=>{
 
  const options = [];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return(
    <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    placeholder="Tags Mode"
    onChange={handleChange}
    options={options}
  />
  )
}

export default SelectTag