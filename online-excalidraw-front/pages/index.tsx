import ExcalidrawSocketWrapper from '@components/excalidraw/ExcalidrawSocketWrapper';
import * as Styled from '@components/layout/style';

export default function Home() {
  return (
    <Styled.Layout>
      <div style={{ width: '50%', height: '50%' }}>
        <ExcalidrawSocketWrapper />
      </div>
    </Styled.Layout>
  );
}
