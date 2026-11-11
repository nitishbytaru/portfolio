// Layouts calculated from the data, so new content never needs a code change. Client-safe.

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "YYYY-MM" to a running month number. */
export const monthIndex = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + month - 1;
};

const fromIndex = (index: number) => ({ year: Math.floor(index / 12), month: index % 12 });

export const thisMonth = (date = new Date()) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

export const monthLabel = (yearMonth: string) => {
  const { year, month } = fromIndex(monthIndex(yearMonth));
  return `${MONTH_NAMES[month]} ${year}`;
};

export const endLabel = (end: string) => (end ? monthLabel(end) : "Present");

export const rangeLabel = (start: string, end: string) => `${monthLabel(start)} - ${endLabel(end)}`;

/** Inclusive length in months; an empty end counts up to `today`. */
export const monthsLong = (start: string, end: string, today: string) =>
  monthIndex(end || today) - monthIndex(start) + 1;

// ---------------------------------------------------------------------------------------------
// Experience ruler

/** Past this many months the ruler labels years instead of months. */
const MONTH_LABEL_LIMIT = 24;

export interface RulerSpan {
  /** First month column, 0-based. */
  start: number;
  /** End column, exclusive. */
  end: number;
  /** Row for this role, so overlapping roles stack instead of colliding. */
  lane: number;
}

export interface Ruler {
  months: number;
  lanes: number;
  spans: RulerSpan[];
  labels: { text: string; from: number; to: number }[];
  /** "Jul 2025" for a column. */
  nameAt: (column: number) => string;
}

export function buildRuler(items: { start: string; end: string }[], today: string): Ruler {
  if (items.length === 0) return { months: 1, lanes: 1, spans: [], labels: [], nameAt: () => "" };

  const ranges = items.map((item) => ({ from: monthIndex(item.start), to: monthIndex(item.end || today) }));
  const first = Math.min(...ranges.map((range) => range.from));
  const last = Math.max(...ranges.map((range) => range.to));
  const months = last - first + 1;

  // Greedy lanes in start order.
  const laneEnds: number[] = [];
  const spans: RulerSpan[] = new Array(items.length);
  ranges
    .map((range, index) => ({ ...range, index }))
    .sort((a, b) => a.from - b.from || a.to - b.to)
    .forEach(({ from, to, index }) => {
      const start = from - first;
      const end = to - first + 1;
      let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = end;
      spans[index] = { start, end, lane };
    });

  const labels: Ruler["labels"] = [];
  for (let column = 0; column < months; column++) {
    const { year, month } = fromIndex(first + column);
    const text = months <= MONTH_LABEL_LIMIT ? MONTH_NAMES[month] : String(year);
    const previous = labels[labels.length - 1];
    if (previous && previous.text === text) previous.to = column + 1;
    else labels.push({ text, from: column, to: column + 1 });
  }

  return {
    months,
    lanes: Math.max(laneEnds.length, 1),
    spans,
    labels,
    nameAt: (column) => {
      const { year, month } = fromIndex(first + Math.max(0, Math.min(months - 1, column)));
      return `${MONTH_NAMES[month]} ${year}`;
    },
  };
}

// ---------------------------------------------------------------------------------------------
// Skill grid: at most three cards a row on wide screens, rows balanced, earlier rows fuller.

const XL_SPANS: Record<number, string> = { 1: "xl:col-span-12", 2: "xl:col-span-6", 3: "xl:col-span-4" };
const XL_ROWS: Record<number, string> = { 1: "xl:grid-rows-1", 2: "xl:grid-rows-2" };

export function skillGrid(count: number) {
  const rows = Math.max(1, Math.ceil(count / 3));
  const base = Math.floor(count / rows);
  const extra = count % rows;
  const spans: string[] = [];
  for (let row = 0; row < rows; row++) {
    const inRow = base + (row < extra ? 1 : 0);
    for (let i = 0; i < inRow; i++) spans.push(XL_SPANS[inRow]);
  }
  return {
    /** Up to two rows fill the viewport; more rows get a fixed card height and scroll. */
    fillsViewport: rows <= 2,
    rowsClass: XL_ROWS[rows] ?? "",
    itemClass: (index: number) => {
      // On phones and tablets the grid has two columns; an odd last card spans both.
      const wide = count % 2 === 1 && index === count - 1 ? "col-span-2 " : "";
      return wide + spans[index];
    },
  };
}

// ---------------------------------------------------------------------------------------------

export const plural = (count: number, singular: string, pluralForm = `${singular}s`) =>
  count === 1 ? singular : pluralForm;

/** "Internships" while every role is one, "Experience" once other kinds exist. */
export const experienceLabel = (kinds: string[], count: number) =>
  kinds.length > 0 && kinds.every((kind) => kind === "internship") ? plural(count, "Internship") : "Experience";
