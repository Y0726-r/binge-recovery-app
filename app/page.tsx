"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const characterId = useStore((state) => state.characterId);

  useEffect(() => {
    if (!characterId) {
      router.replace("/select-character");
    }
  }, [characterId, router]);

  if (!characterId) {
    return null; // リダイレクト中は何も描画しない
  }

  return (
    <main>
      <h1>記録する</h1>
      <p>今日の食事と感情を記録する</p>
    </main>
  );
}
