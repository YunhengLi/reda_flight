"use client";

import { useState } from 'react';

export default function Home() {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/ahp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h1>项目评审量化评分工具</h1>
      <form onSubmit={handleSubmit}>
        <label>
          输入评分:
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
        </label>
        <button type="submit">提交评分</button>
      </form>
      {result && <div>计算结果: {JSON.stringify(result)}</div>}
    </div>
  );
}
