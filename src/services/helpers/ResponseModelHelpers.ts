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


export const ResponseModelHelper = (error: ErrorResponse, push: (path: string) => void) => {

  // Network error or no response
  if (!error.response) {
    push('/500');
    return;
  }

  const { status } = error.response;

  switch (status) {
    case 500:
      push('/500');
      break;
    case 404:
      push('/404');
      break;
    case 400:
      push('/400');
      break;
    default:
      push('/500'); // Fallback for unexpected errors
  }
};
