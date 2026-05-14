export const DEMO_EMAIL = "admin@homerentals.com";
export const DEMO_PASSWORD = "Admin123!";
export const AUTH_STORAGE_KEY = "home-rentals-admin-authenticated";
export const AUTH_USER_STORAGE_KEY = "home-rentals-admin-user";

export type AuthProvider = "demo" | "google";

export type AuthenticatedUser = {
  email: string;
  name?: string;
  picture?: string;
  provider: AuthProvider;
};

const DEMO_GOOGLE_USER: AuthenticatedUser = {
  email: "google.admin@homerentals.com",
  name: "Google Demo Admin",
  provider: "google",
};

type GoogleIdTokenPayload = {
  aud?: string;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  iss?: string;
  name?: string;
  picture?: string;
};

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const isValid = normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD;

  if (isValid) {
    persistAuth({ email: normalizedEmail, provider: "demo" });
  }

  return isValid;
}

export function loginWithGoogleDemo() {
  persistAuth(DEMO_GOOGLE_USER);
  return true;
}

export function loginWithGoogle(credential: string) {
  const profile = parseGoogleCredential(credential);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const isExpectedAudience = !googleClientId || profile?.aud === googleClientId;
  const isExpectedIssuer =
    profile?.iss === "https://accounts.google.com" || profile?.iss === "accounts.google.com";

  if (!profile?.email || !profile.email_verified || !isExpectedAudience || !isExpectedIssuer) {
    return false;
  }

  persistAuth({
    email: profile.email.toLowerCase(),
    name: profile.name,
    picture: profile.picture,
    provider: "google",
  });

  return true;
}

export function getAuthenticatedUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthenticatedUser;
  } catch {
    return null;
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  }
}

function persistAuth(user: AuthenticatedUser) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  }
}

function parseGoogleCredential(credential: string) {
  try {
    const [, payload] = credential.split(".");

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "=",
    );
    const decodedPayload = decodeURIComponent(
      window
        .atob(paddedPayload)
        .split("")
        .map((character) => `%${`00${character.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    const profile = JSON.parse(decodedPayload) as GoogleIdTokenPayload;
    const expiresAt = profile.exp ? profile.exp * 1000 : 0;

    if (!expiresAt || Date.now() > expiresAt) {
      return null;
    }

    return profile;
  } catch {
    return null;
  }
}
