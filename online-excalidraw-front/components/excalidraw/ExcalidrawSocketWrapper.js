import React, { useEffect, useState } from 'react';
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
  } = useCanvasSocket({
    roomId: 1,
  });

  useEffect(
    () => console.log('removeElements', removeElements),
    [removeElements],
  );

  useSendAddElement(addElements);

  useSendRemoveElement(removeElements);

  return (
    <>
      <ExcalidrawComponent
        setAddElements={setAddElements}
        setRemoveElements={setRemoveElements}
        setMoveElements={setMoveElements}
        responseAddElement={responseAddElement?.element}
        responseRemoveElement={responseRemoveElement?.element}
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
