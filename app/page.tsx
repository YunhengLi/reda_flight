'use client';

import { useState } from 'react';

export default function Home() {
  // Define categories with their names, thresholds, and scoring standards
  const mainCategories = [
    {
      category: '1. 成熟度评估（10分）',
      thresholds: [
        { range: '8-10', description: '与公司数字化战略强关联，且能明确量化协同价值（如某补技术缺口/占领新市场）', score: '8-10' },
        { range: '5-7', description: '部分关联但价值描述模糊', score: '5-7' },
        { range: '0-4', description: '与公司数字化战略关联度低', score: '0-4' }
      ],
      scoreRange: '0-10',
    },
    {
      category: '2. 市场竞争力（8分）',
      thresholds: [
        { range: '5-7', description: '市场潜力大，能迅速形成竞争优势', score: '5-7' },
        { range: '3-4', description: '市场潜力较小，竞争优势有限', score: '3-4' },
        { range: '0-2', description: '市场竞争力不足，存在较大竞争压力', score: '0-2' }
      ],
      scoreRange: '0-8',
    },
    {
      category: '3. 创新价值（6分）',
      thresholds: [
        { range: '4-6', description: '具有明显的创新价值，具有市场竞争力', score: '4-6' },
        { range: '2-3', description: '有一定创新，但影响力较小', score: '2-3' },
        { range: '0-1', description: '无创新，缺乏市场竞争力', score: '0-1' }
      ],
      scoreRange: '0-6',
    },
    {
      category: '4. 市场潜力（6分）',
      thresholds: [
        { range: '5-6', description: '目标市场年增长率>15%，且有足够市场份额', score: '5-6' },
        { range: '3-4', description: '市场潜力中等，具有一定市场份额', score: '3-4' },
        { range: '0-2', description: '市场潜力不足，竞争激烈', score: '0-2' }
      ],
      scoreRange: '0-6',
    },
    {
      category: '5. 毛利率稳定性（10分）',
      thresholds: [
        { range: '8-10', description: '毛利率高于30%，且波动可控', score: '8-10' },
        { range: '5-7', description: '毛利率较高，波动较大', score: '5-7' },
        { range: '0-4', description: '毛利率较低，波动较大', score: '0-4' }
      ],
      scoreRange: '0-10',
    },
    {
      category: '6. 现金流稳定性（10分）',
      thresholds: [
        { range: '8-10', description: '现金流稳定，能满足短期资金需求', score: '8-10' },
        { range: '5-7', description: '现金流稳定性一般，偶尔出现资金紧张', score: '5-7' },
        { range: '0-4', description: '现金流紧张，难以维持运营', score: '0-4' }
      ],
      scoreRange: '0-10',
    },
    {
      category: '7. 成长潜力（10分）',
      thresholds: [
        { range: '8-10', description: '年增长率>20%，有较强的成长潜力', score: '8-10' },
        { range: '5-7', description: '年增长率在10%-20%之间，增长潜力一般', score: '5-7' },
        { range: '0-4', description: '年增长率低于10%，增长潜力较差', score: '0-4' }
      ],
      scoreRange: '0-10',
    },
    {
      category: '8. 项目内利率（4分）',
      thresholds: [
        { range: '3-4', description: '项目内利率高于15%，具有较强的盈利能力', score: '3-4' },
        { range: '2-3', description: '项目内利率在5%-15%之间', score: '2-3' },
        { range: '0-1', description: '项目内利率低于5%，盈利能力较弱', score: '0-1' }
      ],
      scoreRange: '0-4',
    },
    {
      category: '9. 合同保障性（8分）',
      thresholds: [
        { range: '7-8', description: '合同已签且保障性强，条款完善', score: '7-8' },
        { range: '4-6', description: '合同签订，但保障条款较弱', score: '4-6' },
        { range: '0-3', description: '合同缺乏保障，存在法律风险', score: '0-3' }
      ],
      scoreRange: '0-8',
    },
    {
      category: '10. 执行可行性（8分）',
      thresholds: [
        { range: '7-8', description: '有完整的执行体系，且有实质性推进案例', score: '7-8' },
        { range: '4-6', description: '执行体系有待加强，推进不力', score: '4-6' },
        { range: '0-3', description: '执行体系不完善，缺乏有效推进', score: '0-3' }
      ],
      scoreRange: '0-8',
    },
    {
      category: '11. 合规性保障性（6分）',
      thresholds: [
        { range: '5-6', description: '合规体系健全，所有法规和管理规程符合要求', score: '5-6' },
        { range: '3-4', description: '合规性较好，部分规程不完善', score: '3-4' },
        { range: '0-2', description: '合规性差，存在违规风险', score: '0-2' }
      ],
      scoreRange: '0-6',
    },
    {
      category: '12. 风险防范性（6分）',
      thresholds: [
        { range: '5-6', description: '风险管理体系完备，能够有效预防风险', score: '5-6' },
        { range: '3-4', description: '风险管理一般，部分风险未能预防', score: '3-4' },
        { range: '0-2', description: '风险管理薄弱，存在较大风险', score: '0-2' }
      ],
      scoreRange: '0-6',
    },
  ];

  const [scores, setScores] = useState<any[]>(mainCategories.map((cat) => ({ ...cat, value: 0 })));
  const [result, setResult] = useState<any>(null);

  // Handle score change for each category
  const handleChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index].value = value;
    setScores(newScores);
  };

  // Handle form submission and calculate the total score
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate final result by adding the scores
    const finalResult = calculateFinalScore(scores);
    setResult(finalResult);
  };

  // Function to calculate the final score by adding the category scores
  const calculateFinalScore = (scores: any) => {
    let totalScore = 0;

    // Loop through each category and add its score
    scores.forEach((score: any) => {
      if (score.value < 0 || score.value > parseInt(score.scoreRange.split('-')[1])) {
        alert(`Score for ${score.category} is out of range!`);
        return;
      }
      totalScore += score.value;
    });

    // Return the total score
    return { finalScore: totalScore };
  };

  return (
    <div>
      <h1>项目同行评审量化评分体系（满分100分）</h1>
      <form onSubmit={handleSubmit}>
        {scores.map((score, index) => (
          <div key={index}>
            <label>{score.category}:</label>
            <input
              type="number"
              value={score.value}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              min={0}
              max={parseInt(score.scoreRange.split('-')[1])} // Get max from the range
            />
            {score.thresholds.map((threshold, idx) => (
              <div key={idx}>
                <p>{threshold.description} (评分范围: {threshold.score})</p>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">提交评分</button>
      </form>

      {result && (
        <div>
          <h3>最终得分: {result.finalScore}</h3>
        </div>
      )}
    </div>
  );
}
