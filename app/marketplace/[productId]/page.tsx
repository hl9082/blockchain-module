import { createServerClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import { notFound } from "next/navigation"
import Link from "next/link"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params
  const supabase = createServerClient()

  // Get the product
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      profiles:brand_id (
        company_name,
        website
      )
    `)
    .eq("id", productId)
    .single()

  if (error || !product) {
    notFound()
  }

  // Get the batch
  const { data: batch } = await supabase.from("batches").select("*").eq("batch_id", product.batch_id).single()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/marketplace">
          <Button variant="outline">Back to Marketplace</Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          {batch?.verified && (
            <div className="absolute top-4 right-4">
              <VerifiedBadge batchId={product.batch_id} size="lg" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">${Number.parseFloat(product.price).toFixed(2)}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description || "No description provided"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Brand</h2>
            <p>{product.profiles?.company_name || "Unknown Brand"}</p>
            {product.profiles?.website && (
              <a
                href={product.profiles.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Visit website
              </a>
            )}
          </div>

          {batch && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Verification</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="mb-2">
                  <span className="font-medium">Batch ID:</span> {batch.batch_id}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Verification Status:</span> {batch.verified ? "Verified" : "Pending"}
                </p>
                {batch.verified && batch.blockchain_tx && (
                  <p className="mb-2">
                    <span className="font-medium">Transaction:</span>{" "}
                    <span className="text-xs font-mono">{batch.blockchain_tx}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
