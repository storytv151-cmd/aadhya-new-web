import type { Access } from "payload";

/** Publicly readable. */
export const anyone: Access = () => true;

/** Requires an authenticated CMS user. */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/** Never allowed via the public API (server-only writes via the Local API). */
export const never: Access = () => false;
