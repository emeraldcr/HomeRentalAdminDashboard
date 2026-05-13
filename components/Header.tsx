"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export function Header() {
  const router = useRouter();

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
      <button className="button button--secondary" onClick={handleLogout} type="button">
        Logout
      </button>
    </header>
  );
}
