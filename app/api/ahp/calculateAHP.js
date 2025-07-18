//const math = require('mathjs');  // Import mathjs library
//
//function calculateAHP(judgmentMatrix, scores) {
//  // Convert the judgment matrix to a math.js matrix
//  const matrix = math.matrix(judgmentMatrix);
//
//  // Calculate the eigenvector (weights)
//  const eig = math.eigs(matrix);
//  const eigenvector = eig.vectors ? eig.vectors[0] : []; // Extract the first eigenvector
//
//  // Normalize the eigenvector to calculate the weights
//  const weights = eigenvector.map((value) => value / eigenvector.reduce((a, b) => a + b, 0));
//
//  // Calculate the final score by summing up weighted scores
//  const finalScore = scores.reduce((acc, score, index) => {
//    return acc + score * weights[index];
//  }, 0);
//
//  return { weights, finalScore };
//}
//
//module.exports = { calculateAHP };  // Export the function to be used in other files
