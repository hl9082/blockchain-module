"use client"

import { useState } from "react"
import { createBatch } from "@/app/actions/batch-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function BatchForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await createBatch(formData)

      if (result.error) {
        toast({
          title: "Error creating batch",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Batch created successfully",
        description: "Your batch has been created and is pending verification.",
      })

      // Reset the form
      const form = document.getElementById("batch-form") as HTMLFormElement
      form.reset()
    } catch (error) {
      toast({
        title: "Error creating batch",
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
        <CardTitle>Create New Batch</CardTitle>
        <CardDescription>Create a new batch of products for blockchain verification</CardDescription>
      </CardHeader>
      <form id="batch-form" action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batchId">Batch ID</Label>
            <Input id="batchId" name="batchId" placeholder="Enter a unique batch identifier" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productIds">Product IDs</Label>
            <Textarea
              id="productIds"
              name="productIds"
              placeholder="Enter product IDs (one per line or comma-separated)"
              className="min-h-[120px]"
              required
            />
            <p className="text-sm text-muted-foreground">Enter one product ID per line or separate with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" name="description" placeholder="Enter a description for this batch" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Batch...
              </>
            ) : (
              "Create Batch"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
