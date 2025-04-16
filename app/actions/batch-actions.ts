"use server"

import { createServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

interface BatchData {
  batchId: string
  productIds: string[]
  description?: string
}

export async function createBatch(formData: FormData) {
  const supabase = createServerClient()

  // Get session to verify user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { error: "You must be logged in to create a batch" }
  }

  const batchId = formData.get("batchId") as string
  const description = formData.get("description") as string
  const productIdsText = formData.get("productIds") as string

  // Parse product IDs from textarea (comma or newline separated)
  const productIds = productIdsText
    .split(/[\n,]/)
    .map((id) => id.trim())
    .filter((id) => id.length > 0)

  if (!batchId) {
    return { error: "Batch ID is required" }
  }

  if (productIds.length === 0) {
    return { error: "At least one product ID is required" }
  }

  try {
    // Insert the batch into the database
    const { data, error } = await supabase
      .from("batches")
      .insert({
        batch_id: batchId,
        product_ids: productIds,
        brand_id: session.user.id,
        description: description || null,
        verified: false,
      })
      .select()

    if (error) {
      throw error
    }

    revalidatePath("/dashboard")
    return { success: true, data }
  } catch (error: any) {
    console.error("Error creating batch:", error)
    return {
      error: error.message || "Failed to create batch",
      code: error.code,
    }
  }
}

export async function getBatches() {
  const supabase = createServerClient()

  // Get session to verify user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { error: "You must be logged in to view batches" }
  }

  try {
    const { data, error } = await supabase
      .from("batches")
      .select("*")
      .eq("brand_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error: any) {
    console.error("Error fetching batches:", error)
    return { error: error.message || "Failed to fetch batches" }
  }
}

export async function getBatchById(batchId: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("batches").select("*").eq("batch_id", batchId).single()

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error: any) {
    console.error("Error fetching batch:", error)
    return { error: error.message || "Failed to fetch batch" }
  }
}
