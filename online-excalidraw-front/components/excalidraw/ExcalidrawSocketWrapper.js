import React, { useState } from 'react';
import ExcalidrawComponent from './ExcalidrawComponent';

import { useCanvasSocket } from '@utils/hooks/useCanvasSocket';

const ExcalidrawSocketWrapper = () => {
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
    roomId: 1,
  });

  useSendAddElement(addElements);
  useSendRemoveElement(removeElements);
  useSendMoveElement(moveElements);

  return (
    <>
      {error && error}
      <ExcalidrawComponent
        setAddElements={setAddElements}
        setRemoveElements={setRemoveElements}
        setMoveElements={setMoveElements}
        responseAddElement={responseAddElement?.element}
        responseRemoveElement={responseRemoveElement?.element}
        responseMoveElement={responseMoveElement?.element}
      />
    </>
  );
};

export default ExcalidrawSocketWrapper;
