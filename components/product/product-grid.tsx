import { getProducts } from "@/app/actions/product-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import Link from "next/link"

export async function ProductGrid() {
  const { data: products, error } = await getProducts()

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Error loading products: {error}</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No products found in the marketplace yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={product.image_url || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {product.batch_id && (
              <div className="absolute top-2 right-2">
                <VerifiedBadge batchId={product.batch_id} size="sm" />
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">Brand ID: {product.brand_id.slice(0, 8)}...</p>
            <p className="text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">${Number.parseFloat(product.price).toFixed(2)}</span>
              <Link href={`/marketplace/${product.id}`}>
                <Button size="sm">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
