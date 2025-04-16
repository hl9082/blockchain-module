import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export default async function DashboardPage() {
  const supabase = createServerClient()

  // Get session from server
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session, redirect to login
  if (!session) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  const userType = profile?.user_type || "brand"

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <DashboardTabs userType={userType} />
    </div>
  )
}
