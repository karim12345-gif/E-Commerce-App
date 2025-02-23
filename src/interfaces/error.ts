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


  export type {Error400Props,Error500Props, ErrorContentProps }