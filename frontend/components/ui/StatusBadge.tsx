"use client";

import { useEffect, useState } from "react";

import { ApiError, getHealth } from "@/lib/api";
import type { HealthResponse } from "@/types/api";

type ConnectionState =
  | { phase: "loading" }
  | { phase: "connected"; data: HealthResponse }
  | { phase: "error"; message: string };

export function StatusBadge() {
  const [state, setState] = useState<ConnectionState>({ phase: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const data = await getHealth();
        if (!cancelled) {
          setState({ phase: "connected", data });
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof ApiError
              ? `API unreachable (${error.status})`
              : "API unreachable";
          setState({ phase: "error", message });
        }
      }
    }

    void checkHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.phase === "loading") {
    return (
      <span className="inline-flex items-center rounded-full border border-sf-border bg-white px-3 py-1 text-sm text-sf-muted">
        Checking API…
      </span>
    );
  }

  if (state.phase === "error") {
    return (
      <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700">
        {state.message}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-800">
      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
      API connected — {state.data.service}
    </span>
  );
}
