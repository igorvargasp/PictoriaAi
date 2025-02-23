import { getCredits } from "@/actions/credit-actions";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentImages from "@/components/dashboard/RecentImages";
import StatsCard from "@/components/dashboard/StatsCard";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  const { data: credits } = await getCredits();


  return (
    <section className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back {user.data.user?.user_metadata.full_name}</h2>
      </div>
      <StatsCard credits={credits} />
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <RecentImages />
        <QuickActions />
      </div>
    </section>
  );
}
