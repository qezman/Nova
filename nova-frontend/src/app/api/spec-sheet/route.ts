import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { SPEC_SECTIONS } from "@/lib/specs";

export const dynamic = "force-dynamic";

const BRAND = "Nova";
const INK = rgb(0.09, 0.086, 0.059); // #17160f
const ACCENT = rgb(0.835, 0.227, 0.086); // #d5451b
const MUTED = rgb(0.45, 0.44, 0.39);

const stripNonWinAnsi = (text: string) => text.replace(/[^\x20-\x7E\n\r]/g, "");

export async function GET() {
  const doc = await PDFDocument.create();
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);

  const W = 595.28;
  const H = 841.89;
  const MARGIN = 56;
  const COL = W / 2 - MARGIN;

  let page = doc.addPage([W, H]);
  let y = H - MARGIN;

  const rule = () => {
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: W - MARGIN, y },
      thickness: 0.5,
      color: rgb(0.85, 0.84, 0.82),
    });
    y -= 12;
  };

  const newPageIfNeeded = (need: number) => {
    if (y - need < MARGIN) {
      page = doc.addPage([W, H]);
      y = H - MARGIN;
    }
  };

  // Header
  page.drawText(BRAND, {
    x: MARGIN,
    y,
    font: helveticaBold,
    size: 28,
    color: ACCENT,
  });
  y -= 20;
  page.drawText("Technical Specifications", {
    x: MARGIN,
    y,
    font: helvetica,
    size: 11,
    color: MUTED,
  });
  y -= 28;
  rule();
  y -= 8;

  for (const section of SPEC_SECTIONS) {
    newPageIfNeeded(40 + section.entries.length * 22);

    page.drawText(section.category.toUpperCase(), {
      x: MARGIN,
      y,
      font: helveticaBold,
      size: 8,
      color: ACCENT,
    });
    y -= 18;

    for (const entry of section.entries) {
      newPageIfNeeded(22);
      page.drawText(stripNonWinAnsi(entry.label), {
        x: MARGIN,
        y,
        font: helvetica,
        size: 10,
        color: MUTED,
      });
      page.drawText(stripNonWinAnsi(entry.value), {
        x: MARGIN + COL + 16,
        y,
        font: helveticaBold,
        size: 10,
        color: INK,
      });
      y -= 20;

      if (entry.note) {
        page.drawText(stripNonWinAnsi(entry.note), {
          x: MARGIN + COL + 16,
          y,
          font: helvetica,
          size: 8,
          color: MUTED,
        });
        y -= 14;
      }
    }

    y -= 12;
    rule();
    y -= 8;
  }

  // Footer
  const pages = doc.getPages();
  for (let i = 0; i < pages.length; i++) {
    pages[i].drawText(
      `${BRAND} - Confidential Pre-Release - ${new Date().getFullYear()}`,
      {
        x: MARGIN,
        y: MARGIN - 16,
        font: helvetica,
        size: 7,
        color: MUTED,
      },
    );
    pages[i].drawText(`${i + 1} / ${pages.length}`, {
      x: W - MARGIN - 30,
      y: MARGIN - 16,
      font: helvetica,
      size: 7,
      color: MUTED,
    });
  }

  const bytes = await doc.save();
  const buffer = Buffer.from(bytes);
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="nova-specs.pdf"',
    },
  });
}
