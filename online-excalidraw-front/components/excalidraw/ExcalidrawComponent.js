import React from 'react';
import { useState, useEffect } from 'react';
import * as Styled from './style';

const ExcalidrawComponent = () => {
  const [Excalidraw, setExcalidraw] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  useEffect(() => {
    import('@excalidraw/excalidraw').then((comp) =>
      setExcalidraw(comp.Excalidraw),
    );
  }, []);

  return (
    <>
      <Styled.ExcalidrawLayout>
        <div style={{ width: '50%', height: '50%', border: 'solid' }}>
          {Excalidraw && (
            <Excalidraw
              onChange={(excalidrawElements, appState, files) =>
                console.log('elements', excalidrawElements)
              }
              ref={(api) => setExcalidrawAPI(api)}
            />
          )}
        </div>
      </Styled.ExcalidrawLayout>
    </>
  );
};

export default ExcalidrawComponent;
