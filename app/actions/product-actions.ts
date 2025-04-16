"use server"

import { createServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

interface ProductData {
  name: string
  description?: string
  price: number
  imageUrl?: string
  batchId: string
}

export async function createProduct(formData: FormData) {
  const supabase = createServerClient()

  // Get session to verify user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { error: "You must be logged in to create a product" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const priceStr = formData.get("price") as string
  const price = Number.parseFloat(priceStr)
  const imageUrl = formData.get("imageUrl") as string
  const batchId = formData.get("batchId") as string

  if (!name || !price || !batchId) {
    return { error: "Name, price, and batch ID are required" }
  }

  try {
    // Verify the batch exists and belongs to the user
    const { data: batchData, error: batchError } = await supabase
      .from("batches")
      .select("*")
      .eq("batch_id", batchId)
      .eq("brand_id", session.user.id)
      .single()

    if (batchError || !batchData) {
      return { error: "Invalid batch ID or batch does not belong to you" }
    }

    // Insert the product into the database
    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        description: description || null,
        price,
        image_url: imageUrl || null,
        batch_id: batchId,
        brand_id: session.user.id,
      })
      .select()

    if (error) {
      throw error
    }

    revalidatePath("/dashboard/products")
    return { success: true, data }
  } catch (error: any) {
    console.error("Error creating product:", error)
    return {
      error: error.message || "Failed to create product",
      code: error.code,
    }
  }
}

export async function getProducts() {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error: any) {
    console.error("Error fetching products:", error)
    return { error: error.message || "Failed to fetch products" }
  }
}

export async function getProductsByBrand(brandId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("brand_id", brandId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error: any) {
    console.error("Error fetching products:", error)
    return { error: error.message || "Failed to fetch products" }
  }
}

export async function getProductsByBatch(batchId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("batch_id", batchId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error: any) {
    console.error("Error fetching products:", error)
    return { error: error.message || "Failed to fetch products" }
  }
}
