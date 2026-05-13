import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
import { LoadingState } from "@/components/LoadingState";

export default function LoginPage() {
  return (
    <main className="login-page">
      <Suspense fallback={<LoadingState message="Loading sign in..." />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
