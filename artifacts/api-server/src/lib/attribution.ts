import { getStringField } from "./email";

const sourceLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  google: "Google",
  direct: "ישיר / לא ידוע",
};

export function getSubmissionSourceLabel(body: unknown): string {
  const source = getStringField(body, "source").toLowerCase();
  return sourceLabels[source] ?? sourceLabels["direct"];
}
