import axios from 'axios';
import { useEffect } from 'react';

export const useApiTest = () => {
  useEffect(() => {
    axios.get('/api/test?msg=45', {});
  }, []);
};
