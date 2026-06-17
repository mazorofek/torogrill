import { type FormEvent, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { LockKeyhole, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/admin/AdminAuthProvider";

export default function AdminLoginPage() {
  const [, navigate] = useLocation();
  const { isConfigured, isLoading, session, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && session) {
      navigate("/admin/leads", { replace: true });
    }
  }, [isLoading, navigate, session]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      navigate("/admin/leads", { replace: true });
    } catch (nextError) {
      setError(
        nextError instanceof Error ? nextError.message : "ההתחברות נכשלה",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground"
    >
      <section className="w-full max-w-md border border-white/10 bg-black/60 p-6 shadow-2xl md:p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center bg-primary text-white">
            <LockKeyhole className="size-5" />
          </div>
          <div>
            <p className="text-sm text-white/45">Toro Grill</p>
            <h1 className="text-2xl font-semibold text-white">כניסת מנהלים</h1>
          </div>
        </div>

        {!isConfigured ? (
          <p className="border border-primary/40 bg-primary/10 p-4 text-sm text-white">
            חסרים משתני הסביבה של Supabase בצד הלקוח.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm text-white/60">אימייל</span>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                required
                className="h-12 bg-white/5 text-white"
                dir="ltr"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-white/60">סיסמה</span>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                required
                className="h-12 bg-white/5 text-white"
                dir="ltr"
              />
            </label>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="h-12 w-full gap-2"
            >
              {(isSubmitting || isLoading) && (
                <LoaderCircle className="size-4 animate-spin" />
              )}
              כניסה
            </Button>

            <div className="min-h-6 text-sm" aria-live="polite">
              {error && <p className="text-primary">{error}</p>}
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
