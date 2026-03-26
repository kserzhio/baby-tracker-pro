import { cn } from "@/lib/utils";

export function FormMessage({ message, tone = "muted" }: { message?: string; tone?: "muted" | "error" | "success" }) {
  if (!message) {
    return null;
  }

  return (
    <p
      className={cn("text-sm", {
        "text-muted-foreground": tone === "muted",
        "text-red-600": tone === "error",
        "text-emerald-700": tone === "success"
      })}
    >
      {message}
    </p>
  );
}
