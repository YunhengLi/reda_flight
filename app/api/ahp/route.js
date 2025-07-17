export async function POST(req: Request) {
  const { score } = await req.json();

  // 计算 AHP 结果
  const result = calculateAHP(score);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}

function calculateAHP(score: number) {
  // 实现AHP计算逻辑
  return {
    finalScore: score * 0.8, // 示例：假设基于评分计算一个权重值
  };
}
