// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getListOfOrders: () => `/api/orders`,
    getOrderById: (id: string) => `/api/orders/${id}`,
}