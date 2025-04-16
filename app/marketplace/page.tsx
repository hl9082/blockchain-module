import { Card, CardContent } from "@/components/ui/card"
import { VerifiedBadge } from "@/components/verified-badge"
import { Button } from "@/components/ui/button"

// Mock data for marketplace items
const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    description: "High-quality cotton t-shirt from last season's collection",
    price: 24.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-001",
    brand_name: "FashionBrand",
  },
  {
    id: 2,
    name: "Designer Jeans",
    description: "Premium denim jeans with modern cut",
    price: 89.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-002",
    brand_name: "DenimCo",
  },
  {
    id: 3,
    name: "Wool Sweater",
    description: "Warm wool sweater, perfect for winter",
    price: 59.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-001",
    brand_name: "FashionBrand",
  },
  {
    id: 4,
    name: "Leather Jacket",
    description: "Classic leather jacket with modern details",
    price: 199.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-003",
    brand_name: "UrbanStyle",
  },
  {
    id: 5,
    name: "Silk Scarf",
    description: "Elegant silk scarf with unique pattern",
    price: 45.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-004",
    brand_name: "LuxuryAccessories",
  },
  {
    id: 6,
    name: "Canvas Sneakers",
    description: "Comfortable canvas sneakers for everyday wear",
    price: 39.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-005",
    brand_name: "UrbanFootwear",
  },
  {
    id: 7,
    name: "Linen Shirt",
    description: "Breathable linen shirt for summer days",
    price: 49.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-006",
    brand_name: "SummerStyle",
  },
  {
    id: 8,
    name: "Wool Coat",
    description: "Classic wool coat for winter elegance",
    price: 149.99,
    image_url: "/placeholder.svg?height=200&width=200",
    batch_id: "BATCH-2023-007",
    brand_name: "WinterFashion",
  },
]

export default function MarketplacePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Browse verified excess inventory from top brands</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <VerifiedBadge batchId={product.batch_id} size="sm" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.brand_name}</p>
              <p className="text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <Button size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
