"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

const emotions = [
  "落ち着いていた",
  "集中していた",
  "ぼんやりしていた",
  "無感情だった",
  "焦っていた",
  "急いでいた",
  "緊張していた",
  "楽しかった",
  "味に意識が向いていた",
];

export default function AddMealPage() {
  const addMeal = useStore((s) => s.addMeal);

  const [mealType, setMealType] = useState("");
  const [content, setContent] = useState("");
  const [hunger, setHunger] = useState(3);
  const [satisfaction, setSatisfaction] = useState(3);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  function toggleEmotion(e: string) {
    setSelectedEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  }

  function save() {
    addMeal({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      mealType,
      content,
      hunger,
      satisfaction,
      emotions: selectedEmotions,
    });

    // 何も言わずに戻す
    history.back();
  }

  return (
    <main style={{ padding: 16 }}>
      <h2>食事記録</h2>

      <select onChange={(e) => setMealType(e.target.value)}>
        <option value="">食事区分</option>
        <option>朝</option>
        <option>昼</option>
        <option>夜</option>
        <option>間食</option>
      </select>

      <textarea
        placeholder="食事内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div>
        食前の空腹感：{hunger}
        <input type="range" min={1} max={5} value={hunger} onChange={(e) => setHunger(Number(e.target.value))} />
      </div>

      <div>
        食後の満足感：{satisfaction}
        <input type="range" min={1} max={5} value={satisfaction} onChange={(e) => setSatisfaction(Number(e.target.value))} />
      </div>

      <div>
        {emotions.map((e) => (
          <label key={e}>
            <input type="checkbox" checked={selectedEmotions.includes(e)} onChange={() => toggleEmotion(e)} />
            {e}
          </label>
        ))}
      </div>

      <button onClick={save}>保存する</button>
    </main>
  );
}
