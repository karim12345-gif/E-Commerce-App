import { ProductsApi } from "../api";

export async function getProducts() {
  try {
    // Since we're running on the server during build, use the full URL
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