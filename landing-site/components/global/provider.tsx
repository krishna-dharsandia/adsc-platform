"use client";

import { logFiglet } from "@/utils/other/art";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    logFiglet('A D S C');
  }, [])

  return <>{children}</>;
}
