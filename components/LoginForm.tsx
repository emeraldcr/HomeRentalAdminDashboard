"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { DEMO_EMAIL, DEMO_PASSWORD, login } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!login(email, password)) {
      setError("Invalid credentials. Use the demo admin login shown below.");
      return;
    }

    router.replace(searchParams.get("redirect") || "/");
  }

  return (
    <form className="login-card" onSubmit={handleSubmit} noValidate>
      <div className="login-card__intro">
        <p className="eyebrow">Home Rentals Admin</p>
        <h1>Welcome back</h1>
        <p>Sign in to review rental properties and location weather.</p>
      </div>

      <label>
        Email
        <input
          autoComplete="email"
          inputMode="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@homerentals.com"
          type="email"
          value={email}
        />
      </label>

      <label>
        Password
        <input
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Admin123!"
          type="password"
          value={password}
        />
      </label>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      <button className="button button--primary" type="submit">
        Sign in
      </button>

      <div className="demo-credentials">
        <strong>Demo credentials</strong>
        <span>{DEMO_EMAIL}</span>
        <span>{DEMO_PASSWORD}</span>
      </div>
    </form>
  );
}
