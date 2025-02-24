import {  Product } from "../types/app";

export interface ProductPageDetailPresenterProps {
    product: Product;
    selectedImageIndex: number;
    onImageSelect: (index: number) => void;
    onAddToCart: () => void;
  }