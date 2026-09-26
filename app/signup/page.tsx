import Link from "next/link";
import Signup from "@/components/Signup";

export const metadata = {
  title: "Sign Up - Squad9",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-5xl px-6 pt-16">
        <Link href="/" className="text-sm text-ink-dim hover:text-ink">
          &larr; Back to Squad9
        </Link>
      </div>
      <Signup />
    </main>
  );
}
