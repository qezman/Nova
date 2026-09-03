export interface WaitlistPayload {
  email: string
  region?: string
}

export interface WaitlistResponse {
  ok: boolean
  error?: string
}

export async function submitToWaitlist(
  payload: WaitlistPayload
): Promise<WaitlistResponse> {
  // Simulated asynchronous success for UI-only client demo
  if (!payload.email) {
    return { ok: false, error: 'Email is required.' }
  }
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { ok: true }
}
