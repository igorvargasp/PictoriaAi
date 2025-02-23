
"use server";

import { Tables } from "@/datatypes.types";
import { createClient } from "@/lib/supabase/server";


interface CreditResponse {
    error: string | null;
    success: boolean;
    data: Tables<"credits"> | null;
}

export async function getCredits(): Promise<CreditResponse> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase.from('credits').select().eq('user_id', user?.id).single();

    if (error) {
        return {
            error: error.message,
            success: false,
            data: null
        }
    }
    return {
        error: null,
        success: true,
        data: data
    }
}