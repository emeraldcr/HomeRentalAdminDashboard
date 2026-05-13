import type { ReactNode } from "react";
import { Header } from "./Header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      <Header />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
