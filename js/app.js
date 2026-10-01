let qi = 0, picked = [], lastScores = null, lastRanked = [], simScores = null, detailFrom = 'page-home';

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}
function switchTab(e,id){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  e.target.classList.add('active');
  document.querySelectorAll('.tabpanel').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// QUIZ
function startQuiz(){ qi=0; picked=new Array(QUESTIONS.length).fill(null); showPage('page-quiz'); renderQ(); }
function renderQ(){
  const q = QUESTIONS[qi];
  document.getElementById('qcount').textContent = `Question ${qi+1} of ${QUESTIONS.length} • ${Math.round((qi/QUESTIONS.length)*100)}% complete`;
  document.getElementById('pbar').style.width = `${(qi/QUESTIONS.length)*100}%`;
  document.getElementById('qtext').textContent = q.text;
  const box = document.getElementById('opts'); box.innerHTML='';
  q.options.forEach((o,i)=>{
    const b=document.createElement('button');
    const letter=['A','B','C','D'][i];
    b.innerHTML = `<span class="opt-letter">${letter}</span><span>${o.text}</span>`;
    if(picked[qi]===i) b.classList.add('sel');
    b.onclick=()=>{ picked[qi]=i; renderQ(); };
    box.appendChild(b);
  });
  document.getElementById('backBtn').disabled = qi===0;
  document.getElementById('nextBtn').textContent = qi===QUESTIONS.length-1 ? 'See Results ✓' : 'Next →';
}
function prevQ(){ if(qi>0){qi--; renderQ();} }
function nextQ(){
  if(picked[qi]===null){ alert('Please choose an option to continue.'); return; }
  if(qi < QUESTIONS.length-1){ qi++; renderQ(); }
  else finishQuiz();
}
function finishQuiz(){
  const answers = picked.map((optIdx,qIdx)=> QUESTIONS[qIdx].options[optIdx].weights);
  lastScores = calculateUserScores(answers);
  lastRanked = getRankedCareers(lastScores);
  simScores = {...lastScores};
  renderResults();
  showPage('page-results');
}
function dimBarHTML(scores){
  const max = Math.max(...Object.values(scores));
  return Object.entries(scores).map(([d,v])=>
    `<div class="bar"><span style="width:130px">${DIMENSION_LABELS[d]}</span><div class="track"><div class="fill" style="width:${max?Math.round(v/max*100):0}%"></div></div><b>${v}</b></div>`
  ).join('');
}
function renderResults(){
  const tops = topAttributes(lastScores,3).map(d=>DIMENSION_LABELS[d]).join(', ');
  document.getElementById('profileLine').textContent =
    `Your strongest dimensions: ${tops}. Match% = round( Σ(w_career×s_user) / Σ(w_career×max(s)) ×100 ) — deterministic & explainable.`;
  document.getElementById('dimBars').innerHTML = dimBarHTML(lastScores);
  const top3 = lastRanked.slice(0,3);
  const medals = ['🥇 #1 Best Fit','🥈 #2 Strong Fit','🥉 #3 Emerging Fit'];
  document.getElementById('topCards').innerHTML = top3.map((r,i)=>`
    <div class="card"><span class="rank">${medals[i]}</span>
    <div class="card-top">
      <div class="ring" style="--p:${r.percent}"><b>${r.percent}%</b></div>
      <div><div style="font-size:30px">${r.career.icon}</div>
      <h3 style="margin:2px 0">${r.career.title}</h3>
      <span class="match">✦ ${r.percent}% match • ${r.career.growth} growth</span></div>
    </div>
    <p>${r.career.tagline}</p>
    <p class="muted" style="font-size:12px">${r.career.salary} • ${r.career.education}</p>
    <button class="ghost" onclick="openDetail('${r.career.id}','page-results')">View Roadmap →</button></div>`).join('');
  // WHY
  const best = top3[0].career;
  const why = whyThisMatches(lastScores, best);
  document.getElementById('tab-why').innerHTML = `
    <h3>Why ${best.title} (${top3[0].percent}%) matches you</h3>
    <ul>${why.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
    <p><b>✅ Skills you already show:</b> ${why.alreadyShow.map(s=>`<span class="pill">${s}</span>`).join(' ')||'—'}</p>
    <p><b>🌱 Skills you can develop:</b> ${why.toDevelop.map(s=>`<span class="pill">${s}</span>`).join(' ')||'—'}</p>
    <p><b>📘 Recommended courses:</b></p><ul>${best.courses.map(c=>`<li>${c}</li>`).join('')}</ul>`;
  // ROADMAP
  document.getElementById('tab-road').innerHTML = `
    <h3>Visual Learning Roadmap — ${best.icon} ${best.title}</h3>
    <div class="timeline">${best.roadmap.map(s=>`<div>${s}</div>`).join('')}</div>`;
  renderSim(); renderComp();
  document.getElementById('chatBox').innerHTML = `<div class="msg bot">Hi! I'm your CareerCompass Mentor 🤖. Your top match is <b>${best.title} (${top3[0].percent}%)</b>. Ask me about salary, courses, roadmap or compare careers!</div>`;
}

// SIMULATOR
function renderSim(){
  document.getElementById('simSliders').innerHTML = DIMENSIONS.map(d=>`
    <div class="slider-row"><span>${DIMENSION_LABELS[d]}</span>
    <input type="range" min="0" max="15" value="${simScores[d]}" oninput="simScores['${d}']=+this.value;renderSimOut()" />
    <b>${simScores[d]}</b></div>`).join('');
  renderSimOut();
}
function renderSimOut(){
  const ranked = getRankedCareers(simScores).slice(0,3);
  document.getElementById('simOut').innerHTML = '<h4>⚡ Live Match% — same formula, updated instantly</h4>' +
    ranked.map(r=>`<div class="bar"><span style="width:200px">${r.career.icon} ${r.career.title}</span><div class="track"><div class="fill" style="width:${r.percent}%"></div></div><b>${r.percent}%</b></div>`).join('');
  // refresh slider numbers without full re-render loop
  const rows = document.querySelectorAll('#simSliders .slider-row b');
  DIMENSIONS.forEach((d,i)=>{ if(rows[i]) rows[i].textContent = simScores[d]; });
}

// COMPARISON
function renderComp(){
  const top3 = lastRanked.slice(0,3);
  document.getElementById('tab-comp').innerHTML = `
  <h3>Career Comparison Matrix</h3>
  <table><tr><th>Criteria</th>${top3.map(r=>`<th>${r.career.icon} ${r.career.title}<br>${r.percent}%</th>`).join('')}</tr>
  <tr><td>Salary</td>${top3.map(r=>`<td>${r.career.salary}</td>`).join('')}</tr>
  <tr><td>Growth</td>${top3.map(r=>`<td>${r.career.growth}</td>`).join('')}</tr>
  <tr><td>Education</td>${top3.map(r=>`<td>${r.career.education}</td>`).join('')}</tr>
  <tr><td>Work-Life</td>${top3.map(r=>`<td>${r.career.workLife}</td>`).join('')}</tr>
  <tr><td>Skills</td>${top3.map(r=>`<td>${r.career.skills.join(', ')}</td>`).join('')}</tr>
  </table>`;
}

// LIBRARY + DETAIL
function showLibrary(){ detailFrom='page-library'; showPage('page-library'); renderLibrary(); }
function renderLibrary(){
  const q=(document.getElementById('search').value||'').toLowerCase();
  const list = CAREERS.filter(c=> (c.title+c.description+c.skills.join(' ')+c.courses.join(' ')).toLowerCase().includes(q));
  document.getElementById('libGrid').innerHTML = list.map(c=>`
    <div class="card"><div style="font-size:32px">${c.icon}</div><h3>${c.title}</h3>
    <p>${c.tagline}</p><p><span class="pill">💰 ${c.salary}</span><span class="pill">📈 ${c.growth}</span></p>
    <button class="ghost" onclick="openDetail('${c.id}','page-library')">View Roadmap →</button></div>`).join('');
}
function openDetail(id,from){
  detailFrom = from || 'page-library';
  const c = CAREERS.find(x=>x.id===id);
  let whyHTML='';
  if(lastScores){ const w=whyThisMatches(lastScores,c); const pct=matchPercent(lastScores,c.weights);
    whyHTML=`<h3>💡 Why this ${pct}% matches you</h3><ul>${w.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`; }
  document.getElementById('detailBody').innerHTML = `
    <h2>${c.icon} ${c.title}</h2><p>${c.description}</p>
    <p><span class="pill">${c.salary}</span><span class="pill">${c.growth}</span><span class="pill">${c.education}</span><span class="pill">${c.workLife}</span></p>
    ${whyHTML}
    <h3>🗺️ Visual Learning Roadmap</h3><div class="timeline">${c.roadmap.map(s=>`<div>${s}</div>`).join('')}</div>
    <h3>📘 Courses</h3><ul>${c.courses.map(x=>`<li>${x}</li>`).join('')}</ul>
    <h3>🧰 Key Skills</h3><p>${c.skills.map(s=>`<span class="pill">${s}</span>`).join(' ')}</p>`;
  showPage('page-detail');
}
function backFromDetail(){ showPage(detailFrom); }

// AI MENTOR (rule-based, offline)
function sendChat(){
  const inp=document.getElementById('chatInput');
  const q=inp.value.trim(); if(!q) return;
  const box=document.getElementById('chatBox');
  box.innerHTML+=`<div class="msg me">${q}</div>`;
  inp.value='';
  box.innerHTML+=`<div class="msg bot">${mentorReply(q.toLowerCase())}</div>`;
  box.scrollTop=box.scrollHeight;
}
function mentorReply(q){
  const findCareer = CAREERS.find(c=> q.includes(c.title.toLowerCase().split(' ')[0]) || q.includes(c.id));
  if(q.includes('salary')||q.includes('pay')||q.includes('package')){
    if(findCareer) return `${findCareer.icon} <b>${findCareer.title}</b> salary: <b>${findCareer.salary}</b>, growth: ${findCareer.growth}.`;
    return `Salaries — `+CAREERS.slice(0,5).map(c=>`${c.icon} ${c.title}: ${c.salary}`).join('<br>');
  }
  if(q.includes('course')||q.includes('study')||q.includes('learn')||q.includes('degree')){
    const c = findCareer || (lastRanked[0]?.career);
    if(c) return `For <b>${c.title}</b>:<br>• ${c.courses.join('<br>• ')}<br>Education: ${c.education}`;
    return 'Tell me a career name, e.g. "courses for data scientist?"';
  }
  if(q.includes('roadmap')||q.includes('how to become')||q.includes('become')||q.includes('ias')||q.includes('upsc')){
    const c = findCareer || CAREERS.find(c=>q.includes('ias')||q.includes('civil')) || lastRanked[0]?.career;
    if(c) return `Roadmap for <b>${c.title}</b>:<br>• ${c.roadmap.join('<br>• ')}`;
  }
  if(q.includes('compare')||q.includes('better')||q.includes('vs')){
    if(!lastRanked.length) return 'Please take the quiz first, then ask me to compare your top careers!';
    const t=lastRanked.slice(0,3);
    return `Top comparison:<br>`+t.map(r=>`${r.career.icon} ${r.career.title}: ${r.percent}% — ${r.career.salary}, ${r.career.growth}`).join('<br>');
  }
  if(q.includes('hello')||q.includes('hi')) return `Hello! Ask me about any career — salary, courses, roadmap. Your top match is <b>${lastRanked[0]?.career.title||'—'}</b>.`;
  if(findCareer) return `${findCareer.icon} <b>${findCareer.title}</b> — ${findCareer.description}<br>Skills: ${findCareer.skills.join(', ')}<br>Salary: ${findCareer.salary}`;
  return `Great question! Based on your profile (<b>${lastRanked[0]?.career.title||'take the quiz first'} — ${lastRanked[0]?.percent||''}%)</b>, I suggest focusing on <b>${(lastRanked[0]&&whyThisMatches(lastScores,lastRanked[0].career).alreadyShow.join(', '))||'your strengths'}</b>. Ask me: "salary of...", "courses for...", "roadmap for..."`;
}
