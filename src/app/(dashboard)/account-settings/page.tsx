import AccountForm from "@/components/account/AccountForm";
import SecuritySettings from "@/components/account/SecuritySettings";
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const AccountSettingsPage = async () => {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return redirect("/login")
  }
  return <div className="container mx-auto space-y-8">
    <div>
      <h1 className="text-3xl font-bold tracking-l">Account Settings</h1>
      <p>Manage your account settings and preferences</p>
    </div>
    <div className="grid gap-8">
      <AccountForm user={user} />
      <SecuritySettings user={user} />
    </div>
  </div>;
};

export default AccountSettingsPage;
