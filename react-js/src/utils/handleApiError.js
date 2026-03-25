import { toast } from 'react-toastify';

export const handleApiError = (error) => {
  const status = error.response?.status;

  switch (status) {
    case 401:
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      break;
    case 403:
      toast.error('Access denied');
      break;
    case 404:
      console.log('Resource not found');
      break;
    case 422:
      console.log('Validation error: ', error.response.data.errors);
      break;
    case 500:
      toast.error('Server error');
      break;
    default:
      toast.error('Something went wrong');
  }
};
