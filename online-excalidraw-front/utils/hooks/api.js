import { useMutation } from 'react-query';

const { default: axios } = require('axios');

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
    isLoading,
    mutate: (request) => mutate(request),
  };
};
