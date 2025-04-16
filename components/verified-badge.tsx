import { CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerifiedBadgeProps {
  batchId: string
  size?: "sm" | "md" | "lg"
}

export async function VerifiedBadge({ batchId, size = "md" }: VerifiedBadgeProps) {
  // For demo purposes, we'll assume the batch is verified
  // In a real implementation, we would check the blockchain
  const verified = true

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  if (!verified) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium">
            <CheckCircle className={sizeClasses[size]} />
            <span>Verified</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>This product has been verified on the blockchain</p>
          <p className="text-xs text-muted-foreground">Batch ID: {batchId}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
