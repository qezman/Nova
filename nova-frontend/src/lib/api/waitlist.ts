import { API_BASE_URL } from "@/lib/constants";

export interface WaitlistPayload {
  email: string;
  region?: string;
}

export interface WaitlistResponse {
  ok: boolean;
  error?: string;
}

export async function submitToWaitlist(
  payload: WaitlistPayload,
): Promise<WaitlistResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      return { ok: false, error: data.error || "Failed to join waitlist" };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network connection failed. Please check your network and retry.",
    };
  }
}
