import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/I18nProvider";
import {
  defaultLocale,
  getLocaleFromPathname,
  isLocale,
  type Locale,
} from "@/i18n/locales";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <Home />
    </I18nProvider>
  );
}

function LocalizedNotFound() {
  const locale =
    getLocaleFromPathname(window.location.pathname) ?? defaultLocale;

  return (
    <I18nProvider locale={locale}>
      <NotFound />
    </I18nProvider>
  );
}

function Router() {
  const renderLocaleRoute = (locale: string | undefined) =>
    isLocale(locale) ? (
      <LocalizedHome locale={locale} />
    ) : (
      <LocalizedNotFound />
    );

  return (
    <Switch>
      <Route path="/">
        <LocalizedHome locale={defaultLocale} />
      </Route>
      <Route path="/:locale">
        {(params) => renderLocaleRoute(params.locale)}
      </Route>
      <Route path="/:locale/">
        {(params) => renderLocaleRoute(params.locale)}
      </Route>
      <Route>
        <LocalizedNotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
