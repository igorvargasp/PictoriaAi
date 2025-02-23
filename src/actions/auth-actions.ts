"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
  error: string | null;
  success: boolean;
  data: unknown | null;
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name"),
      },
    },
  };

  const { data: signupData, error } = await supabase.auth.signUp(data);

  return {
    error: error?.message || "An error occurred while signing up",
    success: !error,
    data: signupData || null,
  };
}

export async function login(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signInData, error } = await supabase.auth.signInWithPassword(
    data
  );

  return {
    error: error?.message || "An error occurred while logging in",
    success: !error,
    data: signInData || null,
  };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}


export async function updateProfile(values: { fullName: string, email: string }) {
  const supabase = await createClient();
  const full_name = values.fullName;


  const { data: profileData, error } = await supabase.auth.updateUser(
    {
      data: {
        full_name
      }
    }
  );

  return {
    error: error?.message || "An error occurred while updating profile",
    success: !error,
    data: profileData || null,
  };
}

export async function resetPassword(values: { email: string }) {
  const supabase = await createClient();



  const { data: emailData, error } = await supabase.auth.resetPasswordForEmail(
    values.email
  );

  return {
    error: error?.message || "An error occurred while updating email",
    success: !error,
    data: emailData || null,
  };
}


export async function changePassword(newPassword: string): Promise<AuthResponse> {
  const supabase = await createClient();



  const { data: passwordData, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  return {
    error: error?.message || "An error occurred while updating password",
    success: !error,
    data: passwordData || null,
  };
}


