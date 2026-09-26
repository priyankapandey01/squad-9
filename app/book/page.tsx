import Link from "next/link";

export const metadata = {
  title: "Book Your Spot - Squad9",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/" className="text-sm text-ink-dim hover:text-ink">
          &larr; Back to Squad9
        </Link>
        <h1 className="font-display mt-6 text-3xl font-bold sm:text-4xl">
          Book your spot
        </h1>
        <p className="mt-3 max-w-md text-ink-dim">
          Fill the form below and we&apos;ll see you this Sunday, 7am, somewhere in Noida.
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSf_REPLACE_WITH_YOUR_FORM_ID/viewform?embedded=true"
            title="Squad9 event signup form"
            className="h-[900px] w-full"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </main>
  );
}