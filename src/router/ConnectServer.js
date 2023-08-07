import WebSocket from 'websocket';
const ws = new WebSocket('ws://example.com');

export const connect = (id) =>{
  ws.onopen = () => {
    const data = {
      type: 'userIdentification',
      userID: id,
    };
    ws.send(JSON.stringify(data));
  };
}




    
    export const sendMessageToServer = (message) => {
      ws.send(message);
    }

     

    