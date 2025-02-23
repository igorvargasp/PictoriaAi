import { getCredits } from "@/actions/credit-actions";
import PlanSummary from "@/components/billing/PlanSummary";
import Pricing from "@/components/billing/Pricing";
import PricingSheet from "@/components/billing/PricingSheet";
import { getProducts, getSubscription } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const BillingPage = async () => {

  const supabase = await createClient()

  const [user, products, subscription] = await Promise.all([
    supabase.auth.getUser(),
    getProducts(supabase),
    getSubscription(supabase)
  ])

  if (!user.data.user) {
    return redirect("/login")
  }



  return <section className="container mx-auto space-y-8">
    <div>
      <h1 className="text-3xl font-bold tracking-l">Plans & Billing</h1>
      <p>Manage your subscription and billing details</p>
    </div>
    <div className="grid gap-10">
      <PlanSummary subscription={subscription} user={user.data.user} products={products || []} credits={null} />
      {
        subscription?.status === "active" && <Pricing
          products={products || []}
          subscription={subscription}
          user={user.data.user}
          mostPopular="pro"
          showInterval={false}
          className="p-0 max-w-full"
          activeProduct={subscription?.prices?.products?.name.toLowerCase() || "pro"}
        />
      }
    </div>
  </section>;
};

export default BillingPage;
