import { supabase } from "@/lib/supabase";

/** Normalize Rwanda numbers toward E.164 (+250...) */
export function normalizeRwandaPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("7")) return `+250${digits}`;
  if (digits.length === 12 && digits.startsWith("250")) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith("2507")) return `+${digits}`;
  return null;
}

export async function subscribeToSmsTips(phone: string, language: "en" | "rw" = "en") {
  const normalized = normalizeRwandaPhone(phone);
  if (!normalized) {
    return { ok: false as const, error: "Enter a valid Rwanda mobile number (e.g. 078xxxxxxx)." };
  }

  const { error } = await supabase.from("sms_subscribers").insert({
    phone: normalized,
    language,
    source: "web",
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: true as const, phone: normalized, alreadyRegistered: true };
    }
    if (error.code === "42P01") {
      return {
        ok: false as const,
        error: "SMS signup is not configured yet. Ask your admin to run supabase/sms_subscribers.sql.",
      };
    }
    return { ok: false as const, error: error.message };
  }

  return { ok: true as const, phone: normalized, alreadyRegistered: false };
}
