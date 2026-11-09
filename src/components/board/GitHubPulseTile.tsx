"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Tile from "@/components/board/Tile";
import { ContributionData, fetchContributions, fetchYearTotals, YearTotals } from "@/utils/githubApi";

const WEEKS_SHOWN = 26;

export default function GitHubPulseTile() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [years, setYears] = useState<YearTotals | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchContributions().then((result) => {
      if (!cancelled) setData(result);
    });
    fetchYearTotals().then((result) => {
      if (!cancelled) setYears(result);
    });
    return () => { cancelled = true; };
  }, []);

  const weeks = (data?.weeks ?? []).slice(-WEEKS_SHOWN).map((week) => week.reduce((sum, day) => sum + day.count, 0));
  const tallest = Math.max(...weeks, 1);
  const hasWeeks = weeks.length > 0;

  const yearRows = years
    ? [
        { year: years.previousYear, total: years.previous, bar: "bg-periwinkle" },
        { year: years.currentYear, total: years.current, bar: "bg-amber" },
      ]
    : [];
  const largest = Math.max(...yearRows.map((row) => row.total), 1);
  const change = years && years.previous > 0 ? Math.round(((years.current - years.previous) / years.previous) * 100) : null;
  const ChangeIcon = change !== null && change < 0 ? ArrowDownRight : ArrowUpRight;

  const label = years
    ? `GitHub Stats: ${years.current} contributions in ${years.currentYear} so far, ${years.previous} in ${years.previousYear}`
    : hasWeeks
      ? `GitHub Stats: ${data?.totalContributions} contributions in the last 12 months`
      : "GitHub Stats";

  return (
    <Tile
      as={Link}
      href="/analytics"
      tone="iris"
      interactive
      corner
      aria-label={label}
      className="group col-span-1 flex min-h-40 flex-col justify-between gap-2 p-4 max-md:min-h-0 max-md:p-3 lg:col-span-4 lg:min-h-0"
    >
      <span aria-hidden="true" className="flex items-center gap-2">
        <Github className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        <span className="wide text-sm font-bold">GitHub</span>
      </span>

      {years ? (
        <span aria-hidden="true" className="block">
          <span className="flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
            <span>
              <span className="wide block text-4xl font-extrabold leading-none max-md:text-2xl lg:text-3xl xl:text-4xl">{years.current}</span>
              <span className="mt-0.5 block text-xs font-semibold">contributions in {years.currentYear} so far</span>
            </span>
            {change !== null && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber px-2 py-0.5 text-xs font-bold text-ink">
                <ChangeIcon className="h-3.5 w-3.5" />
                {Math.abs(change)}%
              </span>
            )}
          </span>
          <span className="mt-2 block space-y-1">
            {yearRows.map((row) => (
              <span key={row.year} className="flex items-center gap-2 text-xs font-semibold tabular-nums">
                <span className="w-8 shrink-0">{row.year}</span>
                <span className="block h-2 min-w-0 flex-1">
                  <span
                    className={`bar-grow block h-full origin-left rounded-full ${row.bar}`}
                    style={{ width: `${Math.max(3, (row.total / largest) * 100)}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right">{row.total}</span>
              </span>
            ))}
          </span>
        </span>
      ) : hasWeeks ? (
        <span aria-hidden="true" className="block">
          <span className="wide block text-4xl font-extrabold leading-none lg:text-3xl xl:text-4xl">{data?.totalContributions}</span>
          <span className="mt-1 block text-sm">contributions in the last 12 months</span>
        </span>
      ) : (
        <span aria-hidden="true" className="flex items-center justify-between gap-2">
          <span className="wide text-2xl font-extrabold leading-tight">See my stats</span>
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}

      <span aria-hidden="true" className="flex h-7 items-end gap-[3px] max-md:hidden">
        {(hasWeeks ? weeks : Array.from({ length: WEEKS_SHOWN }, () => 0)).map((total, index) => (
          <span
            key={index}
            className={`block min-w-0 flex-1 origin-bottom rounded-t-[2px] motion-safe:transition-colors motion-safe:duration-200 ${hasWeeks ? "bar-rise group-hover:bg-amber" : ""} ${total === 0 ? "bg-periwinkle" : "bg-mint"}`}
            style={{
              height: `${Math.max(10, (total / tallest) * 100)}%`,
              animationDelay: `${index * 18}ms`,
              transitionDelay: `${index * 14}ms`,
            }}
          />
        ))}
      </span>
    </Tile>
  );
}
