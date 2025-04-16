"use client"

import { useState } from "react"
import { createProduct } from "@/app/actions/product-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  batches: {
    id: number
    batch_id: string
    description?: string
  }[]
}

export function ProductForm({ batches }: ProductFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState("")

  async function handleSubmit(formData: FormData) {
    // Add the selected batch to the form data
    formData.set("batchId", selectedBatch)

    setIsSubmitting(true)

    try {
      const result = await createProduct(formData)

      if (result.error) {
        toast({
          title: "Error creating product",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Product created successfully",
        description: "Your product has been added to the marketplace.",
      })

      // Reset the form
      const form = document.getElementById("product-form") as HTMLFormElement
      form.reset()
      setSelectedBatch("")
    } catch (error) {
      toast({
        title: "Error creating product",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Add a new product to your verified inventory</CardDescription>
      </CardHeader>
      <form id="product-form" action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" placeholder="Enter product name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Enter product description" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input id="imageUrl" name="imageUrl" placeholder="Enter image URL" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Select value={selectedBatch} onValueChange={setSelectedBatch} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No batches available
                  </SelectItem>
                ) : (
                  batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.batch_id}>
                      {batch.batch_id} {batch.description ? `- ${batch.description}` : ""}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {batches.length === 0 && (
              <p className="text-sm text-muted-foreground">You need to create a batch first before adding products.</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting || batches.length === 0 || !selectedBatch} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Product...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
