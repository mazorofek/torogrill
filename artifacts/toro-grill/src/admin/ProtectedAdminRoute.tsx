import { type ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { LoaderCircle } from "lucide-react";
import { useAdminAuth } from "@/admin/AdminAuthProvider";

export function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const { isLoading, session } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/admin/login", { replace: true });
    }
  }, [isLoading, navigate, session]);

  if (isLoading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-background text-foreground"
      >
        <LoaderCircle className="size-6 animate-spin text-primary" />
      </main>
    );
  }

  if (!session) return null;

  return children;
}
