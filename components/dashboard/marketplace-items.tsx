"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  batch_id: string
  brand_name: string
}

export function MarketplaceItems() {
  const { supabase } = useSupabase()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)

    try {
      // In a real app, this would fetch from a products table
      // For demo purposes, we'll use mock data
      const mockProducts: Product[] = [
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
      ]

      setProducts(mockProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </CardContent>
              </Card>
            ))
          : products.map((product) => (
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
