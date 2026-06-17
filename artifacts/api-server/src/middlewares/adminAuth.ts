import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

type SupabaseUser = {
  email?: string;
};

function parseAdminEmails(): Set<string> {
  return new Set(
    (process.env["ADMIN_EMAILS"] ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

function getBearerToken(req: Request): string | null {
  const header = req.get("authorization");
  if (!header) return null;

  const [scheme, token] = header.split(/\s+/, 2);
  return scheme?.toLowerCase() === "bearer" && token ? token : null;
}

export async function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const supabaseUrl = process.env["SUPABASE_URL"]?.replace(/\/+$/, "");
    const supabaseAnonKey = process.env["SUPABASE_ANON_KEY"];
    const adminEmails = parseAdminEmails();
    const token = getBearerToken(req);

    if (!supabaseUrl || !supabaseAnonKey || adminEmails.size === 0) {
      res.status(500).json({ message: "Admin authentication is not configured." });
      return;
    }

    if (!token) {
      res.status(401).json({ message: "Missing admin access token." });
      return;
    }

    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!authResponse.ok) {
      res.status(401).json({ message: "Invalid admin session." });
      return;
    }

    const user = (await authResponse.json()) as SupabaseUser;
    const email = user.email?.toLowerCase();

    if (!email || !adminEmails.has(email)) {
      logger.warn({ email }, "Rejected non-admin Supabase user");
      res.status(403).json({ message: "This user is not allowed to access admin." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}
