import hymnsData from "@/data/hymns.json";

export interface HymnBlock {
  type: "verse" | "chorus";
  lines: string[];
}

export interface Hymn {
  number: number;
  title: string;
  structure: HymnBlock[];
}

export const hymns: Hymn[] = hymnsData as Hymn[];

export function getAllHymns(): Hymn[] {
  return [...hymns].sort((a, b) => a.number - b.number);
}

export function getHymnByNumber(number: number): Hymn | undefined {
  return hymns.find((h) => h.number === number);
}

export function getFirstLine(hymn: Hymn): string {
  return hymn.structure[0]?.lines[0] ?? "";
}

export function searchHymns(query: string): Hymn[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllHymns();

  const asNumber = Number(q);
  const isNumericQuery = q !== "" && !Number.isNaN(asNumber);

  return getAllHymns().filter((h) => {
    if (isNumericQuery && h.number === asNumber) return true;
    if (h.title.toLowerCase().includes(q)) return true;
    const allText = h.structure
      .flatMap((block) => block.lines)
      .join(" ")
      .toLowerCase();
    return allText.includes(q);
  });
}
