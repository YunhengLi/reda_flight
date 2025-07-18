import numeric from 'numeric';

export async function POST(req: Request) {
  const { scores } = await req.json();

  // Assume we are using a predefined judgment matrix
  const judgmentMatrix = [
    [1, 3, 1/5, 1/3],
    [1/3, 1, 1/7, 1/5],
    [5, 7, 1, 3],
    [3, 5, 1/3, 1]
  ];

  const result = calculateAHP(judgmentMatrix, scores.map((score) => score.value)); // Passing the scores as a 1D array

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// AHP calculation function
function calculateAHP(judgmentMatrix: number[][], scores: number[]) {
  const matrix = numeric.clone(judgmentMatrix);

  // Use numeric.js to calculate eigenvalues and eigenvectors
  const eig = numeric.eig(matrix);
  const eigenvector = eig.E[0]; // The first eigenvector

  // Normalize the eigenvector to get the weights
  const sum = eigenvector.reduce((a: number, b: number) => a + b, 0);
  const weights = eigenvector.map((value: number) => value / sum);

  // Calculate the final score by multiplying each score with its weight and summing
  const finalScore = scores.reduce((acc: number, score: number, index: number) => {
    return acc + score * weights[index];
  }, 0);

  return {
    weights: weights,
    finalScore: finalScore,
  };
}
