import React, { useEffect, useRef, useState } from 'react';
import ExcalidrawComponent from './ExcalidrawComponent';
import { useApiTest } from '@utils/hooks/useApiTest';

const SOCKET_URL = 'http://localhost:3000/api/v5/ws-message';

const ExcalidrawSocketWrapper = () => {
  const [addElements, setAddElements] = useState();
  const [removeElements, setRemoveElements] = useState();
  const [moveElements, setMoveElements] = useState();

  const ws = useRef(null);
  const stomp = useRef(null);

  useApiTest();

  return (
    <>
      <ExcalidrawComponent
        setAddElements={setAddElements}
        setRemoveElements={setRemoveElements}
        setMoveElements={setMoveElements}
      />
    </>
  );
};

export default ExcalidrawSocketWrapper;
