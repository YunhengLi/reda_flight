import * as math from 'mathjs';

export async function POST(req: Request) {
  const { scores } = await req.json();

  // 假设我们根据评分标准构建一个判断矩阵
  const judgmentMatrix: number[][] = [
    [1, 3, 1 / 5, 1 / 3], // 产品技术性 vs 其他三个标准的相对重要性
    [1 / 3, 1, 1 / 7, 1 / 5], // 市场竞争力 vs 其他三个标准的相对重要性
    [5, 7, 1, 3], // 财务健康性 vs 其他三个标准的相对重要性
    [3, 5, 1 / 3, 1], // 风险控制能力 vs 其他三个标准的相对重要性
  ];

  const result = calculateAHP(judgmentMatrix, scores.map((score: any) => score.value)); // 传递 scores 的值作为一维数组

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// AHP 计算
function calculateAHP(judgmentMatrix: number[][], scores: number[]) {
  const matrix = math.matrix(judgmentMatrix);

  // 计算特征向量（权重）
  const eig = math.eigs(matrix);
  const eigenvector = eig.vectors[0];

  // 计算权重
  const weights = eigenvector.map((value: any) => value / eigenvector.reduce((a: any, b: any) => a + b, 0));

  // 计算最终得分：每个评分与其权重相乘后求和
  const finalScore = scores.reduce((acc: number, score: any, index: number) => {
    return acc + score * weights[index];
  }, 0);

  return {
    weights: weights,
    finalScore: finalScore,
  };
}

