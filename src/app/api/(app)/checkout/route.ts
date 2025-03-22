import { type NextRequest, NextResponse } from 'next/server';
import { type Checkout } from '@/types/app';
import { data, checkout } from '@/lib/api';

/**
 * Handles POST requests for order checkout.
 * 
 * This endpoint validates the incoming payload, assigns a fallback user if necessary,
 * processes the order, and returns a structured response.
 */
export async function POST(request: NextRequest) {
  try {
    const payload: Partial<Checkout> = await request.json();

   /**
     * Ensure that the products array exists and has at least one item.
     * This prevents unnecessary processing and helps return early with
     */
    if (!payload?.products || !payload.products.length) {
      return NextResponse.json(
        { success: false, message: 'Failed to place order: Invalid request!', data: null },
        { status: 400 },
      );
    }

    // Ensure we always have a valid user
    const user = payload.user ?? (data.users.length ? data.users[0] : null);
    
    // If no user is found, return early with an error
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Failed to place order: User not found', data: null },
        { status: 400 },
      );
    }

    // Place the order
    const order = await checkout(user, payload.products);

    return NextResponse.json(
      {
        result: 200, 
        success: true,
        message: 'Order placed successfully.',
        data: order,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        result: 500,
        success: false,
        message: 'Failed to place order: ' + (error as Error).message,
        data: null,
      },
      { status: 500 },
    );
  }
}
