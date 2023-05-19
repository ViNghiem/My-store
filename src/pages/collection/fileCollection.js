import { Checkbox } from 'antd';


const FileCollection = (props) => {
  const changeFile = props.handleChange
  const id = props.public_id
  
  const format = props.format
  const name= props.public_id+'.'+format
  const timeAdd = props.create
  // const year = 
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const Capacity = formatBytes(props.Capacity)


  const date = new Date(timeAdd );
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = date.toLocaleDateString('vi-VN', options);


  return (
    <>
      <div className="file-item" onClick={() => changeFile(id)} >
      <Checkbox  onChange={()=>changeFile(id)}></Checkbox>

        <img src={props.url} alt=""/>
        <div className="info-file">
          <div className="Name-file">
            <p> {name}</p>
          </div>
          <div className="time-Capacity d-flex">
            <span>{formattedDate}</span>
            <span>{Capacity}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default FileCollection;