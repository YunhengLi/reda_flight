//import { NextResponse } from 'next/server';
//
//// AHP Calculation Logic (this should match what we discussed)
//function calculateAHP(scores) {
//  let weightedScore = 0;
//  let totalWeight = 0;
//
//  // Example: If all categories have the same weight, we use a simple weighted sum
//  scores.forEach((score) => {
//    // Each score is multiplied by a weight (for now, assuming weight = 1 for simplicity)
//    weightedScore += score.value * 1; // You can adjust the logic to include weights
//    totalWeight += 1; // You can adjust this if you need specific weights for each category
//  });
//
//  // Calculate the final score
//  const finalScore = weightedScore / totalWeight;
//
//  return { finalScore };
//}
//
//export async function POST(request) {
//  try {
//    // Parse incoming JSON from the request
//    const { scores } = await request.json();
//
//    // Validate input (make sure scores are provided)
//    if (!scores) {
//      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
//    }
//
//    // Perform the AHP calculation with the provided scores
//    const result = calculateAHP(scores);
//
//    // Return the result in a JSON response
//    return NextResponse.json(result);
//  } catch (error) {
//    // Handle any errors during the calculation
//    console.error('Error in AHP calculation:', error);
//    return NextResponse.json({ error: 'An error occurred during the calculation' }, { status: 500 });
//  }
//}
