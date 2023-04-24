import axios from "axios";
import { useState,useEffect } from "react";
import FileCollection from './fileCollection'
function Collection() {

  const [ listfile, setListFile] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3020/files/imag', {
    })
    .then(function (response) {
      setListFile(response.data)
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
  },[]);



console.log(listfile,"listfile")

  return (
    <div className="media-table">
      <div className="row">
        {
          // eslint-disable-next-line array-callback-return
          listfile?.map((elm) => (
            <div className="col-md-2">
              <FileCollection 
                key={elm.asset_id}
                url={elm.url}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Collection;