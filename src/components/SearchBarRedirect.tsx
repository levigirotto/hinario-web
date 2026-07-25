"use client";

import { useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";

export default function SearchBarRedirect() {
  const router = useRouter();

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.blur();
    router.push("/?focus=1");
  }

  return (
    <div className="relative">
      <GoSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
      <input
        type="text"
        inputMode="search"
        readOnly
        onFocus={handleFocus}
        placeholder="Buscar..."
        aria-label="Buscar hino"
        className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-5 text-base text-ink placeholder:text-ink-soft/70 shadow-sm shadow-ink/5 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
      />
    </div>
  );
}
