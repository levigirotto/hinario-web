import Link from "next/link";
import { Hymn, getFirstLine } from "@/lib/hymns";

export default function HymnCard({ hymn }: { hymn: Hymn }) {
  return (
    <Link
      href={`/hino/${hymn.number}`}
      className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/60 p-4 transition hover:border-burgundy/40 hover:bg-white shadow-sm shadow-ink/5 active:scale-[0.95]"
    >
      <span className="w-10 shrink-0 text-right font-display text-2xl font-semibold text-burgundy">
        {hymn.number}
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold leading-snug text-ink">
          {hymn.title}
        </p>
        <p className="mt-1 truncate font-lyrics text-sm text-ink-soft">
          {getFirstLine(hymn)}
        </p>
      </div>
    </Link>
  );
}
