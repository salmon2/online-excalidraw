import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import * as Styled from './style';
import cloneDeep from 'lodash/cloneDeep';
import {
  useDrawElement,
  useMoveElement,
  useRemoveElement,
} from '@utils/hooks/useCanvasSocket';
import Button from '@components/button';
const ExcalidrawComponent = ({
  setMoveElements = () => {},
  setAddElements = () => {},
  setRemoveElements = () => {},
  responseAddElement,
  responseRemoveElement,
  responseMoveElement,
}) => {
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

  const changeElements = useMemo(() => {
    const Elemnts = cloneDeep(
      excalidrawAPI?.getSceneElementsIncludingDeleted(),
    );

    return [...(Elemnts || [])];
  }, [onChangeFlag]);

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

  const moveElements = useMemo(() => {
    return changeElements.filter((changeElement) => {
      const prevChangeElement = preveChangeElements.find(
        (prevElement) => prevElement?.id === changeElement?.id,
      );
      return (
        prevChangeElement &&
        (prevChangeElement?.x !== changeElement?.x ||
          prevChangeElement?.y !== changeElement?.y)
      );
    });
  }, [changeElements]);

  useEffect(() => {
    const data = cloneDeep(changeElements);
    setPrevChangeElements([...data]);
  }, [changeElements]);

  useEffect(() => {
    // console.log('addElements', addElements);
    setAddElements(addElements);
  }, [addElements]);

  useEffect(() => {
    // console.log('removeElements', removeElements);
    setRemoveElements(removeElements);
  }, [removeElements]);

  useEffect(() => {
    // console.log('moveElements', moveElements);
    setMoveElements(moveElements);
  }, [moveElements]);

  useDrawElement(responseAddElement, excalidrawAPI);
  useRemoveElement(responseRemoveElement, excalidrawAPI);
  useMoveElement(responseMoveElement, excalidrawAPI);

  const [canvasData, setCanvasData] = useState();

  return (
    <>
      <Styled.ExcalidrawLayout>
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
      </Styled.ExcalidrawLayout>
      <div style={{ marginTop: '15px' }}>
        <Button
          onClick={() => {
            console.log(
              'canvas',
              excalidrawAPI?.getSceneElementsIncludingDeleted(),
            );
            console.log('file', excalidrawAPI?.getFiles());
          }}>
          캔버스 데이터 보기
        </Button>
      </div>
    </>
  );
};

export default ExcalidrawComponent;
