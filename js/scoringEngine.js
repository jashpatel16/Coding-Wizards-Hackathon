/* Deterministic & Explainable Scoring Engine (scoringEngine.js) */
function calculateUserScores(answers) {
  // answers: array of option.weights objects, one per question
  const scores = {};
  DIMENSIONS.forEach(d => scores[d] = 0);
  answers.forEach(w => {
    for (const k in w) { if (scores[k] !== undefined) scores[k] += w[k]; }
  });
  return scores;
}

function matchPercent(userScores, careerWeights) {
  const maxS = Math.max(...Object.values(userScores), 1);
  let num = 0, den = 0;
  for (const d of DIMENSIONS) {
    const w = careerWeights[d] || 0;
    const s = userScores[d] || 0;
    num += w * s;
    den += w * maxS;
  }
  if (den === 0) return 0;
  return Math.round((num / den) * 100);
}

function getRankedCareers(userScores) {
  return CAREERS.map(c => ({
    career: c,
    percent: matchPercent(userScores, c.weights)
  })).sort((a,b) => b.percent - a.percent);
}

function topAttributes(userScores, n=3) {
  return Object.entries(userScores).sort((a,b)=>b[1]-a[1]).slice(0,n).map(e=>e[0]);
}

function whyThisMatches(userScores, career) {
  const tops = topAttributes(userScores, 3);
  const strengths = tops.filter(d => (career.weights[d]||0) >= 3);
  const toDevelop = DIMENSIONS.filter(d => (career.weights[d]||0) >= 4 && (userScores[d]||0) < 5);
  const bullets = [];
  tops.forEach(d => {
    const w = career.weights[d]||0;
    if (w >= 4) bullets.push(`Strong fit: your high ${DIMENSION_LABELS[d]} matches this career's core need (${w}/5).`);
    else if (w >= 2) bullets.push(`Good support: your ${DIMENSION_LABELS[d]} helps in ${career.title} (${w}/5).`);
    else bullets.push(`Note: ${DIMENSION_LABELS[d]} is less central here (${w}/5) — your other strengths compensate.`);
  });
  return {
    bullets,
    alreadyShow: strengths.map(d => DIMENSION_LABELS[d]),
    toDevelop: toDevelop.slice(0,3).map(d => DIMENSION_LABELS[d]),
    tops: tops.map(d => DIMENSION_LABELS[d])
  };
}
