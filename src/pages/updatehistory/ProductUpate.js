import axios from 'axios';
import {URLAPI} from '../../util/index'


//  ProductUpate 
import React, { useState, useEffect } from 'react';

const ProductUpate = () => {





  // const [socket, setSocket] = useState(null);
  // const [id, setId] = useState(''); // ID của kết nối WebSocket
  // const [message, setMessage] = useState('');
  // const [receivedMessage, setReceivedMessage] = useState('');

  // useEffect(() => {
  //   const newSocket = new WebSocket('ws://localhost:3020'); 

  //   newSocket.onopen = () => {
  //     console.log('WebSocket connected');
  //     setSocket(newSocket);
  //     setId('your_unique_id');
  //   };

  //   newSocket.onmessage = (event) => {
  //     const receivedMessage = event.data
  //     setReceivedMessage(receivedMessage.content);
  //   };

  //   newSocket.onclose = () => {
  //     console.log('WebSocket disconnected');
  //   };

  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // }, []);

  // const handleSendMessage = () => {
  //   if (socket && message.trim() !== '' && id) {
  //     const messageObject = {
  //       id: id,
  //       type: `getOrder`,
  //       content: message,
  //     };
  //     socket.send(JSON.stringify(messageObject));
  //     setMessage('');
  //   }
  // };

  return (
    <div>
      dsajdklj
      {/* <div>
        <strong>Received message:</strong> {receivedMessage}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button> */}
    </div>
  );
};

export default ProductUpate;