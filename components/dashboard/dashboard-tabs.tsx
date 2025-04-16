"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BatchUploadForm } from "@/components/dashboard/batch-upload-form"
import { BatchesList } from "@/components/dashboard/batches-list"
import { MarketplaceItems } from "@/components/dashboard/marketplace-items"
import { ProfileSettings } from "@/components/dashboard/profile-settings"

interface DashboardTabsProps {
  userType: string
}

export function DashboardTabs({ userType }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid grid-cols-4 md:w-[600px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        {userType === "brand" ? (
          <TabsTrigger value="batches">Batches</TabsTrigger>
        ) : (
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        )}
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-2">Welcome back</h3>
            <p className="text-muted-foreground">
              {userType === "brand"
                ? "Manage your excess inventory and track verification status."
                : "Browse verified excess inventory from top brands."}
            </p>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-muted-foreground text-sm">Total Batches</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Verified</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
            <p className="text-muted-foreground">No recent activity to display.</p>
          </div>
        </div>
      </TabsContent>

      {userType === "brand" ? (
        <TabsContent value="batches" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <BatchUploadForm />
            <BatchesList />
          </div>
        </TabsContent>
      ) : (
        <TabsContent value="marketplace" className="space-y-4">
          <MarketplaceItems />
        </TabsContent>
      )}

      <TabsContent value="analytics" className="space-y-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Analytics Dashboard</h3>
          <p className="text-muted-foreground">Analytics features coming soon.</p>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <ProfileSettings />
      </TabsContent>
    </Tabs>
  )
}
