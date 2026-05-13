"use client";

import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { DEMO_EMAIL, DEMO_PASSWORD, login, loginWithGoogle } from "@/lib/auth";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleIdentityServices = {
  accounts: {
    id: {
      initialize: (options: {
        callback: (response: GoogleCredentialResponse) => void;
        client_id: string;
      }) => void;
      renderButton: (
        parent: HTMLElement,
        options: {
          logo_alignment?: "left" | "center";
          shape?: "pill" | "rectangular" | "circle" | "square";
          size?: "large" | "medium" | "small";
          text?: "signin_with" | "signup_with" | "continue_with" | "signin";
          theme?: "outline" | "filled_blue" | "filled_black";
          width?: number;
        },
      ) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  const redirectAfterLogin = useCallback(() => {
    router.replace(searchParams.get("redirect") || "/");
  }, [router, searchParams]);

  const handleGoogleCredential = useCallback(
    (response: GoogleCredentialResponse) => {
      setGoogleError("");

      if (!response.credential || !loginWithGoogle(response.credential)) {
        setGoogleError("We could not verify your Google account. Please try again.");
        return;
      }

      redirectAfterLogin();
    },
    [redirectAfterLogin],
  );

  useEffect(() => {
    if (!googleClientId || !isGoogleReady || !googleButtonRef.current || !window.google) {
      return;
    }

    googleButtonRef.current.innerHTML = "";
    window.google.accounts.id.initialize({
      callback: handleGoogleCredential,
      client_id: googleClientId,
    });
    window.google.accounts.id.renderButton(googleButtonRef.current, {
      logo_alignment: "left",
      shape: "pill",
      size: "large",
      text: "continue_with",
      theme: "outline",
      width: googleButtonRef.current.offsetWidth || 320,
    });
  }, [handleGoogleCredential, isGoogleReady]);

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

    redirectAfterLogin();
  }

  return (
    <section className="login-layout" aria-label="Home Rentals admin sign in">
      {googleClientId ? (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={() => setIsGoogleReady(true)}
          onError={() => setGoogleError("Google sign-in is unavailable right now.")}
        />
      ) : null}

      <aside className="login-showcase" aria-hidden="true">
        <div className="login-showcase__badge">Live portfolio overview</div>
        <div className="login-showcase__content">
          <p className="eyebrow eyebrow--light">Admin workspace</p>
          <h2>Manage every stay from one polished dashboard.</h2>
          <p>
            Track property status, review weather conditions, and keep bookings moving
            with a focused admin experience.
          </p>
        </div>

        <div className="login-showcase__stats">
          <div>
            <strong>24</strong>
            <span>Homes tracked</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>Occupancy health</span>
          </div>
          <div>
            <strong>12</strong>
            <span>Weather alerts</span>
          </div>
        </div>
      </aside>

      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="login-card__intro">
          <p className="eyebrow">Home Rentals Admin</p>
          <h1>Welcome back</h1>
          <p>Sign in with Google or use the demo credentials to review rentals.</p>
        </div>

        <div className="google-signin-panel">
          <div className="google-signin-panel__button" ref={googleButtonRef}>
            {!googleClientId ? (
              <span>Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google sign-in.</span>
            ) : null}
          </div>
          {googleError ? <p className="form-error" role="alert">{googleError}</p> : null}
        </div>

        <div className="login-divider">
          <span>or continue with demo access</span>
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
    </section>
  );
}
