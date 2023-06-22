import React, { useEffect, useMemo } from 'react';
import ExcalidrawSocketWrapper from './ExcalidrawSocketWrapper';
import { useGetCanvas } from '@utils/hooks/api';
import { useRouter } from 'next/router';

const ExcalidrawCRUDComponent = () => {
  const {
    query: { roomId },
    ...router
  } = useRouter();

  const request = useMemo(
    () => ({
      roomId: Number(roomId) || null,
    }),
    [router],
  );

  const { data, isLoading, isError } = useGetCanvas(
    request,
    () => console.log('success'),
    (err) => console.log('err'),
  );

  return <>{roomId && <ExcalidrawSocketWrapper />}</>;
};

export default ExcalidrawCRUDComponent;
