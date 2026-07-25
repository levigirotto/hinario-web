import { notFound } from "next/navigation";
import Link from "next/link";
import SearchBarRedirect from "@/components/SearchBarRedirect";
import { getAllHymns, getHymnByNumber } from "@/lib/hymns";
import { GoArrowLeft, GoArrowRight, GoHome } from "react-icons/go";

export default async function HymnPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number: numberParam } = await params;
  const number = Number(numberParam);
  const hymn = getHymnByNumber(number);

  if (!hymn) {
    notFound();
  }

  const sorted = getAllHymns();
  const index = sorted.findIndex((h) => h.number === number);
  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  return (
    <main className="mx-auto max-w-md px-4 pb-24">
      <div className="sticky top-0 z-20 -mx-4 flex gap-1 bg-transparent px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-3 font-ui text-lg font-medium border border-ink/15 bg-white backdrop-blur-sm px-3 rounded-full shadow-sm shadow-ink/5 text-burgundy active:scale-[0.95]"
        >
          <GoArrowLeft />
          <GoHome />
        </Link>
        <SearchBarRedirect />
      </div>

      <article className="mt-4">
        <header className="mb-6 text-center">
          <p className="font-ui text-sm font-medium uppercase tracking-wide text-gold">
            Hino {hymn.number}
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink">
            {hymn.title}
          </h1>
        </header>

        <div className="flex flex-col gap-6 font-lyrics text-lg leading-relaxed text-ink">
          {hymn.structure.map((block, i) =>
            block.type === "chorus" ? (
              <div key={i} className="pl-2 italic text-ink">
                {block.lines.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            ) : (
              <div key={i}>
                {block.lines.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            )
          )}
        </div>
      </article>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-transparent px-4 py-2 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {prev ? (
            <Link
              href={`/hino/${prev.number}`}
              className="flex items-center gap-1 rounded-full border border-ink/15 bg-white px-4 py-2 font-ui text-sm font-medium text-ink active:scale-[0.95]"
            >
              <GoArrowLeft /> Anterior
            </Link>
          ) : (
            <span className="w-24" />
          )}

          <span className="font-display text-lg font-semibold text-ink-soft">
            {hymn.number}
          </span>

          {next ? (
            <Link
              href={`/hino/${next.number}`}
              className="flex items-center gap-1 rounded-full border border-ink/15 bg-white px-4 py-2 font-ui text-sm font-medium text-ink active:scale-[0.95]"
            >
              Próximo <GoArrowRight />
            </Link>
          ) : (
            <span className="w-24" />
          )}
        </div>
      </nav>
    </main>
  );
}
