import { getBatchById } from "@/app/actions/batch-actions"
import { getProductsByBatch } from "@/app/actions/product-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BatchDetailsPageProps {
  params: {
    batchId: string
  }
}

export default async function BatchDetailsPage({ params }: BatchDetailsPageProps) {
  const { batchId } = params
  const { data: batch, error } = await getBatchById(batchId)

  if (error || !batch) {
    notFound()
  }

  const { data: products } = await getProductsByBatch(batchId)

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Batch Details</h1>
        <Link href="/dashboard/batches">
          <Button variant="outline">Back to Batches</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{batch.batch_id}</CardTitle>
                <CardDescription>Created on {new Date(batch.created_at).toLocaleDateString()}</CardDescription>
              </div>
              {batch.verified ? (
                <VerifiedBadge batchId={batch.batch_id} />
              ) : (
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                >
                  Pending
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{batch.description || "No description provided"}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Product IDs</h3>
              <div className="max-h-[200px] overflow-y-auto border rounded-md p-3 bg-muted/50">
                <ul className="space-y-1">
                  {batch.product_ids.map((productId, index) => (
                    <li key={index} className="text-sm">
                      {productId}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {batch.blockchain_tx && (
              <div>
                <h3 className="font-medium mb-2">Blockchain Transaction</h3>
                <p className="text-sm font-mono bg-muted p-2 rounded overflow-x-auto">{batch.blockchain_tx}</p>
              </div>
            )}

            {!batch.verified && (
              <div className="pt-4">
                <Link href={`/dashboard/batches/${batch.batch_id}/verify`}>
                  <Button className="w-full">Verify on Blockchain</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products in this Batch</CardTitle>
            <CardDescription>
              {products && products.length > 0
                ? `${products.length} products found in this batch`
                : "No products added to this batch yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!products || products.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No products have been added to this batch yet.</p>
                <Link href="/dashboard/products/new" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    Add Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">${Number.parseFloat(product.price).toFixed(2)}</p>
                      </div>
                      <VerifiedBadge size="sm" />
                    </div>
                    {product.description && <p className="text-sm mt-2">{product.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
