import { getBatches } from "@/app/actions/batch-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import Link from "next/link"

export async function BatchList() {
  const { data: batches, error } = await getBatches()

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Batches</CardTitle>
          <CardDescription>View and manage your uploaded inventory batches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Error loading batches: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Batches</CardTitle>
        <CardDescription>View and manage your uploaded inventory batches</CardDescription>
      </CardHeader>
      <CardContent>
        {!batches || batches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No batches found. Create your first batch to get started.</p>
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
                <div className="mt-4 flex justify-end space-x-2">
                  <Link href={`/dashboard/batches/${batch.batch_id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  {!batch.verified && (
                    <Link href={`/dashboard/batches/${batch.batch_id}/verify`}>
                      <Button size="sm">Verify on Blockchain</Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
