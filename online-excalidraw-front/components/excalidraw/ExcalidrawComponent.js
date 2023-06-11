import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import * as Styled from './style';

const ExcalidrawComponent = () => {
  const [Excalidraw, setExcalidraw] = useState(null);

  const [mouseButton, setMouseButton] = useState('up');
  const [onChangeFlag, setOnChangeFlag] = useState(false);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const [preveChangeElements, setPrevChangeElements] = useState([]);

  useEffect(() => {
    import('@excalidraw/excalidraw').then((comp) =>
      setExcalidraw(comp.Excalidraw),
    );
  }, []);

  const changeElements = useMemo(
    () => excalidrawAPI?.getSceneElementsIncludingDeleted() || [],
    [onChangeFlag],
  );

  const addElements = useMemo(() => {
    return changeElements.filter((changeElement) => {
      return !preveChangeElements.some(
        (prevElement) => prevElement?.id === changeElement?.id,
      );
    });
  }, [changeElements]);

  const removeElements = useMemo(() => {
    return changeElements.filter((changeElement) => {
      const prevChangeElement = preveChangeElements.find(
        (prevElement) => prevElement?.id === changeElement?.id,
      );
      return (
        prevChangeElement?.isDeleted !== changeElement?.isDeleted &&
        changeElement?.isDeleted === true
      );
    });
  }, [changeElements]);

  useEffect(() => {
    // console.log('changeElements', changeElements);
    setPrevChangeElements([...changeElements]);
  }, [changeElements]);

  //   useEffect(() => {
  //     console.log('addElements', addElements);
  //   }, [addElements]);

  //   useEffect(() => {
  //     console.log('removeElements', removeElements);
  //   }, [removeElements]);

  return (
    <>
      <Styled.ExcalidrawLayout>
        <div style={{ width: '50%', height: '50%', border: 'solid' }}>
          {Excalidraw && (
            <Excalidraw
              onPointerUpdate={({ button }) => {
                if (button != mouseButton) {
                  if (button == 'up' && mouseButton == 'down') {
                    setOnChangeFlag(!onChangeFlag);
                  }
                  setMouseButton(button);
                }
              }}
              ref={(api) => setExcalidrawAPI(api)}
            />
          )}
        </div>
      </Styled.ExcalidrawLayout>
    </>
  );
};

export default ExcalidrawComponent;
