import React, { useState } from 'react';
import ExcalidrawComponent from './ExcalidrawComponent';

import { useCanvasSocket } from '@utils/hooks/useCanvasSocket';
import { useRouter } from 'next/router';
import ExcalidrawComponentTSX from './ExcalidrawComponentTSX';

const ExcalidrawSocketWrapper = ({
  mouseCallback = () => {},
  excalidrawAPI,
  setExcalidrawAPI,
}) => {
  const {
    query: { roomId },
  } = useRouter();
  const [addElements, setAddElements] = useState();
  const [removeElements, setRemoveElements] = useState();
  const [moveElements, setMoveElements] = useState();

  const {
    responseAddElement,
    useSendAddElement,
    responseRemoveElement,
    useSendRemoveElement,
    responseMoveElement,
    useSendMoveElement,

    error,
  } = useCanvasSocket({
    roomId: Number(roomId),
  });

  useSendAddElement(addElements);
  useSendRemoveElement(removeElements);
  useSendMoveElement(moveElements);

  return (
    <>
      {error && error}
      <ExcalidrawComponentTSX
        mouseCallback={mouseCallback}
        setAddElements={setAddElements}
        setRemoveElements={setRemoveElements}
        setMoveElements={setMoveElements}
        responseAddElement={responseAddElement?.element}
        responseRemoveElement={responseRemoveElement?.element}
        responseMoveElement={responseMoveElement?.element}
        excalidrawAPI={excalidrawAPI}
        setExcalidrawAPI={setExcalidrawAPI}
      />
    </>
  );
};

export default ExcalidrawSocketWrapper;
