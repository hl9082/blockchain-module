import { createServerClient } from "@/lib/supabase-server"
import { NextResponse } from "next/server"
import { verifyBatchOnChain } from "@/lib/blockchain"

export async function POST(request: Request) {
  try {
    const { batchId } = await request.json()

    if (!batchId) {
      return NextResponse.json({ error: "Batch ID is required" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Get the batch details
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("*")
      .eq("batch_id", batchId)
      .single()

    if (batchError || !batch) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 })
    }

    // Verify the batch on the blockchain
    try {
      const txHash = await verifyBatchOnChain(batch.batch_id, batch.product_ids, batch.brand_id)

      // Update the batch in the database
      const { error: updateError } = await supabase
        .from("batches")
        .update({
          verified: true,
          blockchain_tx: txHash,
          updated_at: new Date().toISOString(),
        })
        .eq("batch_id", batchId)

      if (updateError) {
        throw updateError
      }

      return NextResponse.json({
        success: true,
        message: "Batch verified successfully",
        txHash,
      })
    } catch (error: any) {
      console.error("Blockchain verification error:", error)
      return NextResponse.json(
        {
          error: "Failed to verify batch on blockchain",
          details: error.message,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
