import ExcalidrawCRUDComponentTSX from '@components/excalidraw/ExcalidrawCRUDComponentTSX';
import * as Styled from '@components/layout/style';

export default function Home() {
  return (
    <Styled.Layout>
      <div style={{ width: '50%', height: '50%' }}>
        <ExcalidrawCRUDComponentTSX />
      </div>
    </Styled.Layout>
  );
}
