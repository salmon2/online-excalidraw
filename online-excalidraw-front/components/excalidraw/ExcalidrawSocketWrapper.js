import React, { useState } from 'react';
import ExcalidrawComponent from './ExcalidrawComponent';

const ExcalidrawSocketWrapper = () => {
  const [addElements, setAddElements] = useState();
  const [removeElements, setRemoveElements] = useState();
  const [moveElements, setMoveElements] = useState();

  console.log('addElements', addElements);
  console.log('removeElements', removeElements);
  console.log('moveElements', moveElements);

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
