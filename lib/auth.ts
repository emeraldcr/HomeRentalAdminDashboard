export const DEMO_EMAIL = "admin@homerentals.com";
export const DEMO_PASSWORD = "Admin123!";
export const AUTH_STORAGE_KEY = "home-rentals-admin-authenticated";

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function login(email: string, password: string) {
  const isValid = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;

  if (isValid && typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
  }

  return isValid;
}

export function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
