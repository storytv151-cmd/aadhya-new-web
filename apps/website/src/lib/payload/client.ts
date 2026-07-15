import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/** Returns the memoized Payload Local API client (getPayload caches internally). */
export function getPayloadClient(): Promise<Payload> {
  return getPayload({ config });
}
