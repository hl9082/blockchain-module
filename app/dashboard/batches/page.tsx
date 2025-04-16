import { BatchForm } from "@/components/batch/batch-form"
import { BatchList } from "@/components/batch/batch-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BatchesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Batches</h1>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Your Batches</TabsTrigger>
          <TabsTrigger value="create">Create New Batch</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <BatchList />
        </TabsContent>

        <TabsContent value="create">
          <BatchForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
