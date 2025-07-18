"use client";

import { useState } from "react";

export default function Home() {
  const [scores, setScores] = useState<any>([
    { category: "产品技术性", value: 0 },
    { category: "市场竞争力", value: 0 },
    { category: "财务健康性", value: 0 },
    { category: "风险控制能力", value: 0 },
  ]);
  const [result, setResult] = useState<any>(null);

  const handleChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index].value = value;
    setScores(newScores);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/ahp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scores }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h1>项目评审量化评分工具</h1>
      <form onSubmit={handleSubmit}>
        {scores.map((score, index) => (
          <div key={index}>
            <label>{score.category}:</label>
            <input
              type="number"
              value={score.value}
              onChange={(e) => handleChange(index, Number(e.target.value))}
            />
          </div>
        ))}
        <button type="submit">提交评分</button>
      </form>
      {result && (
        <div>
          <div>计算结果（权重）: {JSON.stringify(result.weights)}</div>
          <div>最终得分: {result.finalScore}</div>
        </div>
      )}
    </div>
  );
}
