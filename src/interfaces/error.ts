import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

 interface Error400Props {
    router: AppRouterInstance;
  }
  
 interface Error500Props {
    router: AppRouterInstance;
  }
  
 interface ErrorContentProps {
    router: AppRouterInstance;
  }

  interface ErrorImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }


  export type {Error400Props,Error500Props, ErrorContentProps, ErrorImageProps }