import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** Bilingual on purpose: it can render without knowing which language the visitor wanted. */
export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-6xl font-bold text-navy-900">৪০৪ · 404</p>
      <h1 className="mt-6 text-2xl text-navy-900">পৃষ্ঠাটি পাওয়া যায়নি</h1>
      <p className="mt-1 text-lg text-ink-600">Page not found</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/bn" className="rounded-lg bg-brand-700 px-5 py-2.5 font-semibold text-white hover:bg-brand-800">
          হোম
        </Link>
        <Link href="/en" className="rounded-lg border border-ink-300 bg-white px-5 py-2.5 font-semibold text-navy-900">
          Home
        </Link>
      </div>
    </Container>
  );
}
