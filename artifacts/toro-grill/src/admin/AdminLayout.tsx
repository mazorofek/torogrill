import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/admin/AdminAuthProvider";

const navItems = [
  { href: "/admin", label: "סקירה כללית", icon: LayoutDashboard },
  { href: "/admin/leads", label: "לידים", icon: UsersRound },
  { href: "/admin/calendar", label: "יומן אירועים", icon: CalendarDays },
];

export function AdminLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [location] = useLocation();
  const { signOut } = useAdminAuth();
  const today = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f4ef] text-[#1f1a17]">
      <div className="min-h-screen md:grid md:grid-cols-[15rem_1fr]">
        <aside className="bg-[#070707] text-white md:min-h-screen">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-5 py-6">
              <p className="text-xs font-semibold tracking-wide text-primary">
                TORO
              </p>
              <h1 className="mt-1 text-2xl font-bold">GRILL</h1>
            </div>

            <nav className="flex gap-2 overflow-x-auto px-3 py-3 md:flex-1 md:flex-col md:gap-1 md:overflow-visible md:py-5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  location === item.href ||
                  (item.href !== "/admin" && location.startsWith(item.href));

                return (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`flex min-w-max items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-[#2f271b] text-white shadow-inner"
                          : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              <span className="hidden flex-1 md:block" />
              <span className="hidden items-center gap-3 px-4 py-3 text-sm text-white/40 md:flex">
                <Settings className="size-4" />
                הגדרות
              </span>
            </nav>

            <div className="border-t border-white/10 p-4">
              <Button
                type="button"
                variant="ghost"
                className="h-11 w-full justify-start gap-2 text-white/75"
                onClick={() => void signOut()}
              >
                <LogOut className="size-4" />
                יציאה מהמערכת
              </Button>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-[#e6dfd4] bg-white">
            <div className="flex flex-col gap-2 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <div>
                <p className="text-sm text-[#7b7066]">לוח מחוונים לניהול אירועים</p>
                <h2 className="text-2xl font-bold text-[#1f1a17]">{title}</h2>
              </div>
              <p className="text-sm font-medium text-[#4f4740]">{today}</p>
            </div>
          </header>

          <div className="px-4 py-5 md:px-7 md:py-7">{children}</div>
        </section>
      </div>
    </main>
  );
}
