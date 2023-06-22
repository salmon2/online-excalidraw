import React, { useEffect, useCallback, useMemo, useState } from 'react';
import ExcalidrawSocketWrapper from './ExcalidrawSocketWrapper';
import { useGetCanvas, useSaveCanvas } from '@utils/hooks/api';
import { useRouter } from 'next/router';
import Button from '@components/button';

const ExcalidrawCRUDComponent = () => {
  const {
    query: { roomId },
    push,
    isReady,
    ...router
  } = useRouter();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const request = useMemo(
    () => ({
      roomId: Number(roomId) || null,
    }),
    [router],
  );

  /**
   * excalidrawAPI -> 캔버스가 업로드 된 후 api를 통해
   * 저장된 캔버스 데이터를 가져온다.
   *
   * 가져온 후 excalidrawAPI는 무조건 존재하기에
   * success  Callback으로 저장된 canvas를 불러온다.
   */
  const { data, isGetting, isError } = useGetCanvas(
    { ...request, excalidrawAPI: excalidrawAPI ? true : false },
    (res) => {
      const JSONElements = JSON.parse(res?.data?.element);
      const sceneData = {
        elements: JSONElements,
      };
      excalidrawAPI?.updateScene(sceneData);
    },
    (err) => console.log('err', err),
  );

  const { mutate, isPosting } = useSaveCanvas(
    () => alert('success'),
    () => alert('err'),
  );

  const saveCanvas = useCallback(() => {
    const req = {
      roomId: roomId,
      element: JSON.stringify(
        excalidrawAPI?.getSceneElementsIncludingDeleted(),
      ),
    };

    mutate(req);
  }, [excalidrawAPI, mutate, roomId]);

  useEffect(() => {
    if (isReady && !roomId) {
      push('/?roomId=1');
    }
  }, [isReady]);

  return (
    <>
      {roomId && (
        <>
          <ExcalidrawSocketWrapper
            excalidrawAPI={excalidrawAPI}
            setExcalidrawAPI={setExcalidrawAPI}
          />
          <div style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
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
            <Button
              onClick={() => {
                saveCanvas();
              }}>
              캔버스 저장하기
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ExcalidrawCRUDComponent;
