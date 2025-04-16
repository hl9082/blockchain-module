"use client"

import type React from "react"

import { useState } from "react"
import { useSupabase } from "@/lib/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileUp } from "lucide-react"

export function BatchUploadForm() {
  const { supabase, session } = useSupabase()
  const { toast } = useToast()

  const [batchId, setBatchId] = useState("")
  const [productIds, setProductIds] = useState("")
  const [description, setDescription] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"form" | "csv">("form")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!session) {
        throw new Error("You must be logged in to upload batches")
      }

      let productIdsArray: string[] = []

      if (uploadMethod === "form") {
        // Parse product IDs from textarea (comma or newline separated)
        productIdsArray = productIds
          .split(/[\n,]/)
          .map((id) => id.trim())
          .filter((id) => id.length > 0)
      } else if (uploadMethod === "csv" && csvFile) {
        // Process CSV file
        const text = await csvFile.text()
        const lines = text.split("\n")

        // Skip header if exists
        const startIndex = lines[0].toLowerCase().includes("product") ? 1 : 0

        productIdsArray = lines
          .slice(startIndex)
          .map((line) => line.split(",")[0]?.trim())
          .filter((id) => id && id.length > 0)
      }

      if (productIdsArray.length === 0) {
        throw new Error("No product IDs provided")
      }

      // Store batch in Supabase
      const { data, error } = await supabase
        .from("batches")
        .insert({
          batch_id: batchId,
          product_ids: productIdsArray,
          brand_id: session.user.id,
          description: description,
          verified: false,
        })
        .select()

      if (error) {
        throw error
      }

      // In a real implementation, we would connect to a wallet and sign the transaction
      // For demo purposes, we'll just show a success message
      // const tx = await verifyBatch(batchId, productIdsArray, session.user.id, signer)

      toast({
        title: "Batch uploaded successfully",
        description: `Batch ${batchId} with ${productIdsArray.length} products has been uploaded.`,
      })

      // Reset form
      setBatchId("")
      setProductIds("")
      setDescription("")
      setCsvFile(null)
    } catch (error: any) {
      toast({
        title: "Error uploading batch",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Batch</CardTitle>
        <CardDescription>Upload a new batch of excess inventory for blockchain verification</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Button
            variant={uploadMethod === "form" ? "default" : "outline"}
            onClick={() => setUploadMethod("form")}
            className="flex-1"
          >
            Manual Entry
          </Button>
          <Button
            variant={uploadMethod === "csv" ? "default" : "outline"}
            onClick={() => setUploadMethod("csv")}
            className="flex-1"
          >
            CSV Upload
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batch-id">Batch ID</Label>
            <Input
              id="batch-id"
              placeholder="Enter a unique batch identifier"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              required
            />
          </div>

          {uploadMethod === "form" ? (
            <div className="space-y-2">
              <Label htmlFor="product-ids">Product IDs</Label>
              <Textarea
                id="product-ids"
                placeholder="Enter product IDs (one per line or comma-separated)"
                value={productIds}
                onChange={(e) => setProductIds(e.target.value)}
                className="min-h-[120px]"
                required={uploadMethod === "form"}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4">
                <FileUp className="h-8 w-8 text-muted-foreground" />
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  className="hidden"
                  required={uploadMethod === "csv"}
                />
                <Label
                  htmlFor="csv-file"
                  className="cursor-pointer text-primary hover:underline flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {csvFile ? csvFile.name : "Select CSV file"}
                </Label>
                <p className="text-xs text-muted-foreground text-center">
                  CSV should have product IDs in the first column
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter a description for this batch"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Uploading..." : "Upload Batch for Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
