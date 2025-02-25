import { toast } from '~/src/hooks/use-toast';
import { ErrorResponse } from '~/src/types/app';

interface ResponseModel<T> {
  result: number;
  body: T;
  message: string;
}

export const isResponseModel = <T>(obj: unknown): obj is ResponseModel<T> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'result' in obj &&
    'body' in obj &&
    'message' in obj
  );
};


//  ResponseModelHelper functionality with easy access to router
export const ResponseModelHelper = (
  error: ErrorResponse,
  push: (path: string) => void,
  options?: {
    showToast?: boolean; 
    returnUrl?: string;  
  }
) => {
  const { showToast = true, returnUrl = '/' } = options || {};
  
  // Handle case with no response (network error)
  if (!error.response) {
    const errorMessage = error.message || 'Network Error';
    
    if (showToast) {

      toast({
        title: 'error',
        description: errorMessage,
        variant: 'destructive',
        duration: 1000,
      });
    }
    
    push(`/error?type=500&message=${encodeURIComponent(errorMessage)}&returnUrl=${encodeURIComponent(returnUrl)}`);
    return;
  }

  const { status, data } = error.response;
  
  // Check if response data matches our ResponseModel
  if (isResponseModel<unknown>(data)) {
    const { result, message } = data;
    
    if (result === 400) {
      push('/error?type=404');
      return;
    } else {
      if (showToast) {
        toast({
          title: 'error',
          description: message,
          variant: 'destructive',
          duration: 1000,
        });
      }
      
      push(`/error?type=${result}&message=${encodeURIComponent(message)}&returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }
  }
  
  // Handle based on HTTP status code
  switch (status) {
    case 404:
      push('/error?type=404');
      toast({
        title: 'error',
        description: `${error.message} || Unknown error`,
        variant: 'destructive',
        duration: 1000,
      });
      break;
    case 400:
      push('/error?type=400');
      toast({
        title: 'error',
        description: `${error.message} || Unknown error`,
        variant: 'destructive',
        duration: 1000,
      });
      break;
    case 500:
      if (showToast) {
        toast({
          title: 'error',
          description: 'Server error occurred',
          variant: 'destructive',
          duration: 1000,
        });
        
      }
      push('/error?type=500');
      break;
    default:
      if (showToast) {

        toast({
          title: 'error',
          description: `${error.message} || Unknown error`,
          variant: 'destructive',
          duration: 1000,
        });
      }
      push(`/error?type=500&message=${encodeURIComponent(error.message || '')}&returnUrl=${encodeURIComponent(returnUrl)}`);
  }
};


