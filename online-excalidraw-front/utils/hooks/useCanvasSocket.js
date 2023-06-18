import { useState, useEffect, useRef, useCallback } from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const SOCKET_URL = 'http://localhost:3000/api/ws-message';

const subScripTest = (stomp, setResponse) => {
  stomp.current.subscribe(`/topic/test`, (response) => {
    try {
      const responseJSON = JSON.parse(response?.body);
      setResponse(responseJSON);
    } catch (e) {
      setResponse(response?.body);
    }
  });
};

const subScripAddElement = (stomp, roomId, callBackFunc) => {
  stomp.current.subscribe(`/topic/add/${roomId}`, (response) => {
    try {
      const responseJSON = JSON.parse(response?.body);
      const result = {
        roomId: responseJSON?.roomId,
        element: JSON.parse(responseJSON.element),
      };
      callBackFunc(result);
    } catch (e) {
      console.log('e', e);
    }
  });
};

const subScripRemoveElement = (stomp, roomId, callBackFunc) => {
  stomp.current.subscribe(`/topic/remove/${roomId}`, (response) => {
    try {
      const responseJSON = JSON.parse(response?.body);
      const result = {
        roomId: responseJSON?.roomId,
        element: JSON.parse(responseJSON.element),
      };
      callBackFunc(result);
    } catch (e) {
      console.log('e', e);
    }
  });
};

export const useSocketTest = () => {
  const ws = useRef(null);
  const stomp = useRef(null);
  const [response, setResponse] = useState();

  useEffect(() => {
    try {
      ws.current = new SockJS(SOCKET_URL);
      ws.current.onopen = () => alert('ws opened');
      ws.current.onclose = () => alert(1000);

      stomp.current = Stomp.over(ws.current);
      stomp.current.reconnect_delay = 1000;

      stomp.current.connect({}, () => {
        subScripTest(stomp, setResponse);

        stomp.current.send(`/send/test`, {}, 'hello world');
      });
    } catch (e) {
      console.log(`e = ${e}`);
    }
  }, []);

  return {
    response: response,
  };
};

export const useCanvasSocket = ({ roomId }) => {
  const ws = useRef(null);
  const stomp = useRef(null);
  const [addElement, setAddElement] = useState();
  const [removeElement, setRemoveElement] = useState();
  useEffect(() => {
    try {
      if (roomId) {
        ws.current = new SockJS(SOCKET_URL);
        ws.current.onopen = () => alert('ws opened');
        ws.current.onclose = () => alert(1000);

        stomp.current = Stomp.over(ws.current);
        stomp.current.reconnect_delay = 1000;

        stomp.current.connect({}, () => {
          subScripAddElement(stomp, roomId, setAddElement);
          subScripRemoveElement(stomp, roomId, setRemoveElement);
        });
      }
    } catch (e) {
      console.log(`e = ${e}`);
    }
  }, []);

  const sendAddElement = useCallback(
    (addElement) => {
      if (!roomId) return;
      try {
        const request = JSON.stringify({
          roomId: roomId,
          element: JSON.stringify([...addElement]),
        });

        stomp.current.send(`/send/add/${roomId}`, {}, request);
      } catch (e) {
        console.log('e', e);
      }
    },
    [roomId],
  );

  const sendRemoveElement = useCallback(
    (removeElement) => {
      if (!roomId) return;
      try {
        const request = JSON.stringify({
          roomId: roomId,
          element: JSON.stringify([...removeElement]),
        });

        stomp.current.send(`/send/remove/${roomId}`, {}, request);
      } catch (e) {
        console.log('e', e);
      }
    },
    [roomId],
  );

  const useSendAddElement = (addElements) => {
    useEffect(() => {
      if (addElements?.length > 0) {
        sendAddElement(addElements);
      }
    }, [addElements]);
  };

  const useSendRemoveElement = (removeElements) => {
    useEffect(() => {
      if (removeElements?.length > 0) {
        sendRemoveElement(removeElements);
      }
    }, [removeElements]);
  };

  return {
    responseAddElement: addElement,
    sendAddElement: sendAddElement,
    useSendAddElement: useSendAddElement,

    responseRemoveElement: removeElement,
    sendRemoveElement: sendRemoveElement,
    useSendRemoveElement: useSendRemoveElement,
  };
};

export const useDrawElement = (responseAddElement, excalidrawAPI) => {
  useEffect(() => {
    if (responseAddElement?.length > 0) {
      const elementList = excalidrawAPI?.getSceneElementsIncludingDeleted();

      const difference = elementList.filter((item1) => {
        return !responseAddElement.some((item2) => item2.id === item1.id);
      });

      const sceneData = {
        elements: [...difference, ...responseAddElement],
      };

      excalidrawAPI?.updateScene(sceneData);
    }
  }, [responseAddElement]);
};

export const useRemoveElement = (responseRemoveElement, excalidrawAPI) => {
  useEffect(() => {
    if (responseRemoveElement?.length > 0) {
      const elementList = excalidrawAPI?.getSceneElementsIncludingDeleted();

      const difference = elementList.filter((item1) => {
        return !responseRemoveElement.some((item2) => item2.id === item1.id);
      });

      const sceneData = {
        elements: [...difference],
      };

      excalidrawAPI?.updateScene(sceneData);
    }
  }, [responseRemoveElement]);
};
