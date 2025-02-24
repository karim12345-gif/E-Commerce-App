// // Fetch data at build time
// export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
//   try {
//     const response = await axios.get<{ data: Product[] }>('/api/products');
//     const products = response.data.data;

//     return {
//       props: {
//         products,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return {
//       props: {
//         products: [], // Fallback in case of error
//       },
//     };
//   }
// };