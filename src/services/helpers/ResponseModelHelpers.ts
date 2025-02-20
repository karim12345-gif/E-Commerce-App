import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ResponseModel } from '../../models';

interface ErrorResponse {
  response: {
    data: unknown;
    status: number;
  };
}

const isResponseModel = (obj: unknown): obj is ResponseModel<unknown> => {
  return typeof obj === 'object' && obj !== null && 'result' in obj && 'body' in obj && 'message' in obj;
};

const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as ErrorResponse).response === 'object' &&
    (error as ErrorResponse).response !== null
  );
};

export const ResponseModelHelper = (error: unknown) => {
  const router = useRouter();

  // Handle network errors or when response is undefined
  if (!isErrorResponse(error)) {
    toast.error('Network error occurred', { id: 'loading' });
    router.push('/500');
    return;
  }

  const { response } = error;
  
  // Handle ResponseModel errors
  if (isResponseModel(response.data)) {
    const { result, message } = response.data;
    toast.error(message, { id: 'loading' });
    
    // Redirect based on result code
    switch (result) {
      case 400:
      case 404:
        router.push('/404');
        break;
      case 500:
        router.push('/500');
        break;
      default:
        router.push('/500');
    }
    return;
  }

  // Handle standard HTTP status codes
  switch (response.status) {
    case 400:
    case 404:
      toast.error('Resource not found', { id: 'loading' });
      router.push('/404');
      break;
    case 500:
      toast.error('Server error occurred', { id: 'loading' });
      router.push('/500');
      break;
    default:
      toast.error('An unexpected error occurred', { id: 'loading' });
      router.push('/500');
  }
};