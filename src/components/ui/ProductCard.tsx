import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IProductList } from "~/src/interfaces/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
    product: IProductList;
}
  
export function ProductCard({ product }: ProductCardProps) {

    const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;
    const priceInfo = Array.isArray(product.price) ? product.price[0] : product.price;
    
    return (
        <Card>
            <div className="relative aspect-square">
                { imageUrl && (  <Image
                    src={imageUrl }
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized 
                />) }
            </div>
            
            <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-2 font-medium text-lg">
                    {priceInfo?.currency} {priceInfo?.amount}
                </p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                    className="flex-1"
                    onClick={() => {
                        console.log('Add to cart:', product.id)
                    }}
                >
                    Add to Cart
                </Button>
                <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                        Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}