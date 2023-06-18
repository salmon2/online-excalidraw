import { useEffect, useRef } from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const SOCKET_URL = 'http://localhost:3000/api/ws-message';

export const useTestConnet = (callBackSetter) => {
  const ws = useRef(null);
  const stomp = useRef(null);

  useEffect(() => {
    try {
      ws.current = new SockJS(SOCKET_URL);
      ws.current.onopen = () => alert('ws opened');
      ws.current.onclose = () => alert(1000);

      stomp.current = Stomp.over(ws.current);
      stomp.current.reconnect_delay = 1000;

      stomp.current.connect({}, () => {
        stomp.current.subscribe(`/topic/test`, (response) => {
          try {
            callBackSetter(JSON.parse(response?.body));
          } catch (e) {
            callBackSetter(response?.body);
          }
        });

        stomp.current.send(`/send/test`, {}, 'hello world');
      });
    } catch (e) {
      console.log(`e = ${e}`);
    }
  }, []);
};
