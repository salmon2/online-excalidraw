import axios from 'axios';
import { useMutation, useQuery } from 'react-query';

const saveCanvas = async (req) => {
  return axios.post('/api/canvas', req);
};

export const useSaveCanvas = (onSuccess, onError) => {
  const { data, isLoading, mutate } = useMutation(saveCanvas, {
    onSuccess,
    onError,
  });

  return {
    data,
    isPosting: isLoading,
    mutate: (request) => mutate(request),
  };
};

const getCanvas = async ({ queryKey }) => {
  const { roomId } = queryKey[1];

  return await axios.get(`/api/canvas?roomId=${roomId}`);
};

export const useGetCanvas = (request, onSuccess, onError) => {
  const { data, isLoading, isError } = useQuery(
    ['getCanvas', request],
    getCanvas,
    {
      onSuccess: onSuccess,
      onError: onError,
      retry: false,
      enabled: !!(request?.roomId && request?.excalidrawAPI),
      keepPreviousData: true,
      select: (response) => response,
    },
  );

  return {
    data: data,
    isGetting: isLoading,
    isError: isError,
  };
};
