/**
 * Routes accessible to the public
 * do not require authentication
 */
export const publicRoutes: string[] = [
  "/"
];

/**
 * Routes accessible only to authenticated users
 */
export const protectedRoutes: string[] = [
  "/dashboard"
];

/**
 * Authentication routes
 */
export const authRoutes: string[] = [
  "/auth/sign-in",
  "/auth/sign-up",
];

/**
 * Prefix for API authentication routes
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/";