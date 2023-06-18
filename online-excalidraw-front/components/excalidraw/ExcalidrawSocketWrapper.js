import React, { useEffect, useState } from 'react';
import ExcalidrawComponent from './ExcalidrawComponent';
import { useApiTest } from '@utils/hooks/useApiTest';
import { useTestConnet } from '@utils/hooks/useCanvasSocket';

const ExcalidrawSocketWrapper = () => {
  const [addElements, setAddElements] = useState();
  const [removeElements, setRemoveElements] = useState();
  const [moveElements, setMoveElements] = useState();

  const [socketData, setSocketData] = useState();

  useTestConnet(setSocketData);
  useEffect(() => console.log('socketD', socketData), [socketData]);

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
