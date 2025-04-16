import { getBatches } from "@/app/actions/batch-actions"
import { getProducts } from "@/app/actions/product-actions"
import { ProductForm } from "@/components/product/product-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default async function ProductsPage() {
  const { data: batches } = await getBatches()
  const { data: products } = await getProducts()

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Your Products</TabsTrigger>
          <TabsTrigger value="create">Add New Product</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {!products || products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No products found. Add your first product to get started.</p>
              <Button className="mt-4" variant="outline" asChild>
                <Link href="/dashboard/products?tab=create">Add Product</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <p className="text-sm text-muted-foreground mb-2">Batch: {product.batch_id}</p>
                    <p className="text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${Number.parseFloat(product.price).toFixed(2)}</span>
                      <Link href={`/dashboard/products/${product.id}`}>
                        <Button size="sm">Edit</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <ProductForm batches={batches || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
