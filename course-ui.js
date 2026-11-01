Object.assign(settings,{loadE:5,fullMode:'bridge',fullView:'wave',filterC:1000,clipIdeal:false,clipPath:'series',clipPathView:'wave',seriesBiasModel:'ideal',clampViewCourse:'wave',biasedClampMode:'upper'});
let problemOpen=false;

function renderOpening() {
  return `<section class="opening" aria-label="Slide 1: Introduction">
    <div class="opening__copy"><div class="opening__meta">TEAM EDUCATION <span class="opening__meta-divider">/</span> IEEE ZC-SB</div><h1>CIRCUITS,<br><em>MADE VISIBLE.</em></h1>
      <p>A complete visual course: circuit laws, diodes, AC-to-DC conversion and wave shaping.<br>15 focused topics · 30 worked problems · animated input/output models.</p>
      <button class="start-button" data-go="1" type="button">ENTER THE COURSE <span>↗</span></button><div class="opening__topics">PREDICT <i>·</i> TRACE THE WAVE <i>·</i> SOLVE <i>·</i> CHECK</div></div>
    <div class="opening__art" aria-hidden="true"><div class="opening__art-title">THE SIGNAL PATH</div><svg viewBox="0 0 700 700"><path class="opening__wire" d="M170 260 V100 H520 V270 H630 V530 H170 V440" /><path class="opening__wire opening__wire--inner" d="M170 260 H330 V440 H170" /><path class="opening__component" d="M135 296 H205 M145 322 H195 M520 304 l-20 13 40 20 -40 20 40 20 -20 13" /><circle class="opening__node" cx="520" cy="100" r="12" /><circle class="opening__node" cx="630" cy="530" r="12" /><circle class="opening__node" cx="330" cy="440" r="12" /><circle class="opening__node" cx="170" cy="100" r="12" />${flowDots('M170 260 V100 H520 V270 H630 V530 H170 V440',6,5.8)}</svg><div class="opening__formula">V = I × R</div></div>
  </section>`;
}

function renderLesson(slide) {
  const t=slide.topic;
  return `<section class="lesson course-lesson" aria-label="${esc(t.short)} explanation">
    <div class="lesson-head"><div class="lesson-head__number">${esc(t.group)} <span>/</span> ${esc(t.source)}</div><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p></div>
    <div class="lesson-grid"><div class="visual-panel">${courseVisual(t.id)}</div>
      <aside class="course-explain"><div class="course-explain__top"><span>THE MODEL</span><strong>${esc(t.formula)}</strong></div>
        <div class="course-explain__steps">${t.points.map(([title,body],i)=>`<div class="course-step"><span>${pad(i+1)}</span><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></div>`).join('')}</div>
        <details class="presenter-cue"><summary>ASK THE ROOM</summary><p>${esc(t.insight)}</p></details>
        <button class="panel-next" data-go="${current+1}" type="button">WORK PROBLEM A <span>↗</span></button></aside></div>
  </section>`;
}

function renderPractice(slide) {
  const t=slide.topic,p=t.problems[slide.problemIndex],next=slide.problemIndex===0?'PROBLEM B':current===slides.length-2?'FINAL CHECK':'NEXT TOPIC';
  return `<section class="course-practice workshop-slide" aria-label="${esc(t.short)}: worked problem ${slide.problemIndex+1}">
    <div class="practice-head"><div class="lesson-head__number">${esc(t.group)} <span>/</span> ${esc(t.source)}</div>
      <div class="practice-head__row"><div><h1>${problemOpen?'WORK IT THROUGH.':'STOP. PREDICT. SOLVE.'}</h1><p>${esc(t.short)} · Worked problem ${slide.problemIndex+1} of 2</p></div><div class="practice-formula">${esc(t.formula)}</div></div></div>
    <div class="workshop-grid"><div class="workshop-question"><div class="practice-card__tag"><span>${esc(p.tag)}</span><strong>${pad(slide.problemIndex+1)} / 02</strong></div>
      <h2>${esc(p.q)}</h2><div class="workshop-rule"></div><p class="workshop-prompt">Identify the model first. Then calculate. Can the answer be right from its units and waveform shape?</p>
      <button class="practice-reveal" data-reveal="true" type="button">${problemOpen?'HIDE THE WORKING':'REVEAL THE WORKING'} <span>↗</span></button></div>
      <div class="workshop-answer ${problemOpen?'is-open':''}"><div class="workshop-answer__top"><span>${problemOpen?'STEP-BY-STEP SOLUTION':'YOUR TURN'}</span><strong>IEEE EDUCATION</strong></div>
        ${problemOpen?`<ol>${p.steps.map((step,i)=>`<li><span>${pad(i+1)}</span><p>${esc(step)}</p></li>`).join('')}</ol><div class="workshop-answer__result"><span>CHECKED RESULT</span><strong>${esc(p.answer)}</strong></div>`:
        `<div class="workshop-answer__wait"><strong>?</strong><p>Pause here and ask the room for the first equation and the expected graph shape.</p></div>`}
      </div></div>
    <div class="practice-bottom"><div><span>TEACHING CHECK</span><p>${esc(t.insight)}</p></div><button data-go="${current+1}" type="button">${next} <span>→</span></button></div>
  </section>`;
}

function renderQuiz() {
  const q=finalQuiz[quizIndex],chosen=quizChoices[quizIndex];
  const score=quizChoices.reduce((sum,value,i)=>sum+(value===finalQuiz[i].correct?1:0),0);
  const card=quizComplete
    ? `<div class="quiz-card quiz-card--summary"><div class="quiz-card__top"><span>FINAL RESULT</span><strong>IEEE EDUCATION</strong></div><div class="quiz-score">${score}<small>/ ${finalQuiz.length}</small></div><h2>${score===finalQuiz.length?'EXCELLENT REASONING.':score>=8?'STRONG FOUNDATION.':'REVISIT THE MODELS.'}</h2><p>${score===finalQuiz.length?'Pick a worked problem and explain every step aloud.':'Use the chapter index to revisit the topics you missed.'}</p><div class="quiz-review">${finalQuiz.map((item,i)=>`<span class="${quizChoices[i]===item.correct?'is-right':'is-missed'}">${pad(i+1)} ${esc(item.topic)}</span>`).join('')}</div><button class="panel-next" data-quiz-reset="true" type="button">RUN THE CHECK AGAIN <span>↗</span></button></div>`
    : `<div class="quiz-card"><div class="quiz-card__top"><span>${pad(quizIndex+1)} / ${pad(finalQuiz.length)}</span><strong>${esc(q.topic)}</strong></div><h2>${esc(q.q)}</h2><div class="quiz-options">${q.options.map((option,i)=>`<button data-answer="${i}" class="quiz-option ${chosen===null?'':i===q.correct?'is-correct':i===chosen?'is-wrong':''}" type="button" ${chosen===null?'':'disabled'}><span>${String.fromCharCode(65+i)}</span>${esc(option)}</button>`).join('')}</div>${chosen===null?'<p class="quiz-hint">Commit to an answer before checking the calculation.</p>':`<div class="quiz-feedback"><strong>${chosen===q.correct?'Correct.':'Check the model.'}</strong><p>${esc(q.why)}</p></div><button class="panel-next" data-quiz-next="true" type="button">${quizIndex===finalQuiz.length-1?'SEE YOUR SCORE':'NEXT QUESTION'} <span>↗</span></button>`}</div>`;
  return `<section class="quiz-scene" aria-label="Final concept check"><div class="quiz-head"><div class="lesson-head__number">FINAL CHECK <span>/</span> ${pad(finalQuiz.length)} QUESTIONS</div><h1>PROVE THE MODEL.</h1><p>Predict first. Calculate second. Use the graph to test your answer.</p></div>
    <div class="quiz-layout"><div class="formula-sheet"><h2>THE METHOD</h2><div class="formula-grid">
      <div><span>01 · PATH</span><strong>IS THE LOOP CLOSED?</strong></div><div><span>02 · STATE</span><strong>WHICH DIODE IS ON?</strong></div>
      <div><span>03 · LAW</span><strong>OHM · KVL · KCL</strong></div><div><span>04 · WAVE</span><strong>WHAT HAPPENS AT EACH INSTANT?</strong></div>
      <div><span>05 · APPROXIMATION</span><strong>COUNT DIODE DROPS</strong></div><div><span>06 · CHECK</span><strong>UNITS · LIMITS · SHAPE</strong></div>
    </div><div class="formula-sheet__end">${quizChoices.every(x=>x!==null)?`${score} / ${finalQuiz.length} CORRECT`:'A REASONED ANSWER BEATS A GUESS'}</div></div>${card}</div></section>`;
}

function updateChrome() {
  $('#slide-count').textContent=`${pad(current+1)} / ${pad(slides.length)}`;
  $('#progress-fill').style.width=`${(current+1)/slides.length*100}%`;
  $('#prev').disabled=current===0; $('#next').disabled=current===slides.length-1;
  $('.topbar__course').innerHTML=`<span class="topbar__pulse" aria-hidden="true"></span> TEAM EDUCATION <span class="topbar__slash">/</span> ${esc(slides[current].short).toUpperCase()}`;
  $$('.index-item').forEach((item,i)=>item.classList.toggle('is-current',i===current));
  const topicIndex=Math.max(0,Math.floor((current-1)/3));
  $('#app').dataset.tone=current===0||current===slides.length-1?'deep':(['deep','blue','paper'][topicIndex%3]);
}
function render() {
  const slide=slides[current];
  $('#stage').innerHTML=slide.kind==='opening'?renderOpening():slide.kind==='practice'?renderPractice(slide):slide.kind==='quiz'?renderQuiz():renderLesson(slide);
  updateChrome();$('#stage').scrollTop=0;
  history.replaceState(null,'',`#slide-${current+1}`);
}
function closeIndex(){const panel=$('#index');panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');panel.inert=true;}
function navigate(target){
  target=Math.max(0,Math.min(slides.length-1,target));
  if(target===current){closeIndex();return;}
  if(moving){queued=target;return;}
  closeIndex();
  const apply=()=>{current=target;problemOpen=false;render();};
  if(reducedMotion.matches){apply();return;}
  moving=true;const transition=$('#transition');transition.classList.remove('is-leaving');transition.classList.add('is-visible');
  setTimeout(()=>{apply();transition.classList.add('is-leaving');setTimeout(()=>{transition.classList.remove('is-visible','is-leaving');moving=false;if(queued!==null&&queued!==current){const next=queued;queued=null;navigate(next);}},440);},760);
}

$('#index-grid').innerHTML=slides.map((slide,i)=>`<button class="index-item ${i===current?'is-current':''}" data-go="${i}" type="button"><span>${pad(i+1)}${slide.kind==='practice'?' · WORKSHOP':''}</span><strong>${esc(slide.short)}</strong><small>${esc(slide.title)}</small></button>`).join('');
render();
document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.id==='home'){navigate(0);return;}
  if(button.id==='prev'){navigate(current-1);return;}
  if(button.id==='next'){navigate(current+1);return;}
  if(button.id==='index-open'){const panel=$('#index');panel.inert=false;panel.setAttribute('aria-hidden','false');panel.classList.add('is-open');$('#index-close').focus();return;}
  if(button.id==='index-close'){closeIndex();$('#index-open').focus();return;}
  if(button.dataset.go!==undefined){navigate(Number(button.dataset.go));return;}
  if(button.dataset.reveal){problemOpen=!problemOpen;render();return;}
  if(button.dataset.action){switch(button.dataset.action){
    case 'switch':settings.switchClosed=!settings.switchClosed;break;
    case 'full-bridge':settings.fullMode='bridge';break;
    case 'full-center':settings.fullMode='center';break;
    case 'full-view':settings.fullView=settings.fullView==='wave'?'path':'wave';break;
    case 'clip-upper':settings.clipSide='upper';break;
    case 'clip-lower':settings.clipSide='lower';break;
    case 'clip-series':settings.clipPath='series';break;
    case 'clip-shunt':settings.clipPath='shunt';break;
    case 'clip-view':settings.clipPathView=settings.clipPathView==='wave'?'circuit':'wave';break;
    case 'seriesbias-ideal':settings.seriesBiasModel='ideal';break;
    case 'seriesbias-silicon':settings.seriesBiasModel='silicon';break;
    case 'clip-model':settings.clipIdeal=!settings.clipIdeal;break;
    case 'clamp-positive':settings.clampSide='positive';break;
    case 'clamp-negative':settings.clampSide='negative';break;
    case 'clamp-view':settings.clampViewCourse=settings.clampViewCourse==='wave'?'circuit':'wave';break;
    case 'biasedclamp-upper':settings.biasedClampMode='upper';break;
    case 'biasedclamp-lower':settings.biasedClampMode='lower';break;
  }render();return;}
  if(button.dataset.answer!==undefined){if(quizChoices[quizIndex]===null){quizChoices[quizIndex]=Number(button.dataset.answer);render();}return;}
  if(button.dataset.quizNext){if(quizIndex<finalQuiz.length-1)quizIndex++;else quizComplete=true;render();return;}
  if(button.dataset.quizReset){quizIndex=0;quizChoices=Array(finalQuiz.length).fill(null);quizComplete=false;render();}
});
document.addEventListener('input',event=>{
  const key=event.target.dataset.range;if(!key)return;settings[key]=Number(event.target.value);
  if(key==='voltage'||key==='resistance'){const I=settings.switchClosed?settings.voltage/settings.resistance*1000:0;$('[data-readout="voltage"]').textContent=`${settings.voltage.toFixed(1)} V`;$('[data-readout="resistance"]').textContent=`${settings.resistance} Ω`;$('[data-readout="current"]').textContent=`${I.toFixed(1)} mA`;}
});
document.addEventListener('change',event=>{if(event.target.matches('[data-range]'))render();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&$('#index').classList.contains('is-open')){closeIndex();$('#index-open').focus();return;}
  if($('#index').classList.contains('is-open')||event.target.matches('input,button'))return;
  if(event.key==='ArrowRight'||event.key==='PageDown'){event.preventDefault();navigate(current+1);}
  if(event.key==='ArrowLeft'||event.key==='PageUp'){event.preventDefault();navigate(current-1);}
});
window.addEventListener('hashchange',()=>{const target=Number(location.hash.match(/slide-(\d+)/)?.[1]);if(target&&target-1!==current)navigate(target-1);});
