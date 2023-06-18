import React, { useEffect, useState } from 'react';
import ExcalidrawComponent from './ExcalidrawComponent';
import { useApiTest } from '@utils/hooks/useApiTest';
import { useCanvasSocket, useSocketTest } from '@utils/hooks/useCanvasSocket';
import Button from '@components/button';

const ExcalidrawSocketWrapper = () => {
  const [addElements, setAddElements] = useState();
  const [removeElements, setRemoveElements] = useState();
  const [moveElements, setMoveElements] = useState();

  const { addElement: responseAddElement, useSendAddElement } = useCanvasSocket(
    {
      roomId: 1,
    },
  );

  useEffect(
    () => console.log('responseAddElement', responseAddElement),
    [responseAddElement],
  );

  useSendAddElement(addElements);

  return (
    <>
      <ExcalidrawComponent
        setAddElements={setAddElements}
        setRemoveElements={setRemoveElements}
        setMoveElements={setMoveElements}
        responseAddElement={responseAddElement?.element}
      />
      {/* <div style={{ marginTop: '15px' }}>
        <Button onClick={() => sendAddElement({ foo: 'bar' })}>
          go canvas
        </Button>
      </div> */}
    </>
  );
};

export default ExcalidrawSocketWrapper;
