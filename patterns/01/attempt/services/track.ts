export function track(
  eventName: string,
  payload: Record<string, string | number> = {},
): void {
  console.log("[tracking]", eventName, payload);
}
