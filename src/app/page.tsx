"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import HymnCard from "@/components/HymnCard";
import { getAllHymns, searchHymns } from "@/lib/hymns";

function HomeContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearchFocus() {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    setIsSearchFocused(true);
  }

  function handleSearchBlur() {
    blurTimeout.current = setTimeout(() => setIsSearchFocused(false), 200);
  }
  const shouldFocus = searchParams.get("focus") === "1";

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const hymns = useMemo(
    () => (query ? searchHymns(query) : getAllHymns()),
    [query]
  );

  return (
    <main className="mx-auto max-w-md px-4 pb-16">
      {!isSearchFocused && (
        <header className="pb-6 pt-12 text-center">
          <h1 className="font-display text-6xl font-semibold tracking-tight text-burgundy">
            Hinário
          </h1>
        </header>
      )}

      <div className="sticky top-0 z-20 -mx-4 bg-transparent px-4 py-3">
        <SearchBar
          value={query}
          onChange={setQuery}
          autoFocus={shouldFocus}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
      </div>

      <section className="mt-6 flex flex-col gap-3">
        {hymns.length === 0 ? (
          <p className="py-8 text-center font-ui text-sm text-ink-soft">
            Nenhum hino encontrado.
          </p>
        ) : (
          hymns.map((hymn) => <HymnCard key={hymn.number} hymn={hymn} />)
        )}
      </section>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
