"use client";

import { GoSearch } from "react-icons/go";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  autoFocus,
  onFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <div className="relative">
      <GoSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
      <input
        type="text"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Buscar..."
        aria-label="Buscar hino"
        autoFocus={autoFocus}
        className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-5 text-base text-ink placeholder:text-ink-soft/70 shadow-sm shadow-ink/5 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
      />
    </div>
  );
}
