"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface VerifyBatchPageProps {
  params: {
    batchId: string
  }
}

export default function VerifyBatchPage({ params }: VerifyBatchPageProps) {
  const { batchId } = params
  const router = useRouter()
  const { toast } = useToast()

  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  async function verifyBatch() {
    setIsVerifying(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify batch")
      }

      setIsVerified(true)
      setTxHash(data.txHash)

      toast({
        title: "Batch verified successfully",
        description: "Your batch has been verified on the blockchain.",
      })
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")

      toast({
        title: "Verification failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="container py-8 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Verify Batch on Blockchain</CardTitle>
          <CardDescription>Verify batch {batchId} on the blockchain to prove authenticity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isVerified ? (
            <div className="text-center py-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verification Successful!</h3>
              <p className="text-muted-foreground mb-4">Your batch has been successfully verified on the blockchain.</p>
              {txHash && <div className="bg-muted p-3 rounded-md text-sm font-mono overflow-x-auto">{txHash}</div>}
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verification Failed</h3>
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={verifyBatch} disabled={isVerifying}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="mb-6">
                Verifying this batch will create an immutable record on the blockchain, proving the authenticity of your
                excess inventory.
              </p>
              <Button onClick={verifyBatch} disabled={isVerifying} size="lg" className="w-full">
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify on Blockchain"
                )}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/dashboard/batches/${batchId}`}>
            <Button variant="outline">{isVerified ? "Return to Batch Details" : "Cancel"}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
