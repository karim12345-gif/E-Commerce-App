import { ProductsApi } from "../api";

/**
 * Fetches products data 
 * @returns {Promise<{data: any[]}>} Products data or empty array
 */
export async function getProducts() {
  try {
    // Check if we're in build time (production build running locally)
    // NODE_ENV is built-in to Next.js/Node.js, not from .env file
    // VERCEL_ENV only exists when deployed to Vercel
    const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
    
    if (isBuildTime) {
      // During build time, return empty data instead of trying to fetch again
      console.log('Build time detected, returning empty product data');
      return { data: [] };
    }
    
    // For runtime requests, use the correct URL
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    
    const endpoint = ProductsApi.getProducts();
    const url = `${protocol}://${host}${endpoint}`;
    const revalidate = 3600;

    const response = await fetch(url, { next: { revalidate: revalidate } });
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty data 
    return { data: [] };
  }
}