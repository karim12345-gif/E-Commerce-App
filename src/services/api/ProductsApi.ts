// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getProductById: (id: string) => `/api/products/${id}`,
    getProducts: () => `/api/products`,
};