  // Cart Item Interface
  interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  // Cart Context Interface
  interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
  }

  
  export type { CartItem, CartContextType } 