"use client";

import { useRouter } from "next/navigation";
import { getAuthenticatedUser, logout } from "@/lib/auth";

export function Header() {
  const router = useRouter();
  const user = getAuthenticatedUser();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Admin Dashboard</p>
        <h1>Home Rentals</h1>
      </div>
      <div className="app-header__actions">
        {user ? (
          <div className="user-chip" aria-label={`Signed in as ${user.email}`}>
            {user.picture ? (
              <img alt="" src={user.picture} />
            ) : (
              <span>{user.email.charAt(0)}</span>
            )}
            <div>
              <strong>{user.name || "Admin"}</strong>
              <small>{user.provider === "google" ? "Google account" : user.email}</small>
            </div>
          </div>
        ) : null}
        <button className="button button--secondary" onClick={handleLogout} type="button">
          Logout
        </button>
      </div>
    </header>
  );
}
