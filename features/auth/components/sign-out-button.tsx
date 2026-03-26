import { signOut } from "@/features/auth/actions/sign-out";

export function SignOutButton({ label }: { label: string }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
      >
        {label}
      </button>
    </form>
  );
}
