interface Price {
    amount: number;
    currency: string;
  }

interface IProductList {
    categories: string[];
    description: string;
    id: string;
    images: string[];
    name: string;
    slug: string;
    price: Price;
  }


  export type { IProductList }