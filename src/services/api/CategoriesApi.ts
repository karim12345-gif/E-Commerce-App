// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getListOfProductCategories: () => `/api/categories`,
    getCategoryById: (id: string) => `/api/categories/${id}`,
}