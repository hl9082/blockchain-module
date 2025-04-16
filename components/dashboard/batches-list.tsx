"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/lib/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import { Loader2, RefreshCw } from "lucide-react"

interface Batch {
  id: number
  batch_id: string
  product_ids: string[]
  brand_id: string
  description: string
  verified: boolean
  created_at: string
}

export function BatchesList() {
  const { supabase, session } = useSupabase()
  const [batches, setBatches] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBatches = async () => {
    if (!session) return

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("batches")
        .select("*")
        .eq("brand_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setBatches(data || [])
    } catch (error) {
      console.error("Error fetching batches:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBatches()
  }, [session])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Batches</CardTitle>
          <CardDescription>View and manage your uploaded inventory batches</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchBatches} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : batches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No batches found. Upload your first batch to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{batch.batch_id}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(batch.created_at).toLocaleDateString()}</p>
                  </div>
                  {batch.verified ? (
                    <VerifiedBadge batchId={batch.batch_id} size="sm" />
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    >
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="text-sm">
                  <p>{batch.product_ids.length} products</p>
                  {batch.description && <p className="text-muted-foreground mt-1">{batch.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
