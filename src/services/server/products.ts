import { ProductsApi } from "../api";
import { Product } from '~/src/types/app';

/**
 * Fetches products data 
 * @returns {Promise<{data: any[]}>} Products data or empty array
 */

interface ApiResponse {
  data: Product[];
}

//  Function to Fetch Products with `fetch()`
export async function getProducts(): Promise<ApiResponse> {
  try {
    const endpoint = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000/${ProductsApi.getProducts()}`;


    // This makes it behave like `getStaticProps`
    const response = await fetch(endpoint, {
      cache: 'force-cache', // Statically cache response, same as getStaticProps
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      // next: { revalidate: 3600 }, // if we want ISR (Incremental Static Regeneration)
    });


    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [] }; 
  }
}
