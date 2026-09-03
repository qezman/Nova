"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DownloadSpecSheet() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/spec-sheet");
      if (!res.ok) throw new Error("Failed to generate PDF");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nova-specs.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silently fail - user can retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleDownload}
      disabled={loading}
      aria-label="Download Nova specification sheet as PDF"
      className="shrink-0"
    >
      {loading ? "Generating…" : "Download spec sheet"}
    </Button>
  );
}
