// Visual models are intentionally explicit about their approximations.
const plotX = u => 78 + 622 * u;
function tracePath(samples, zero, scale) {
  return samples.map((v,i) => `${i ? 'L' : 'M'}${plotX(i/(samples.length-1)).toFixed(1)} ${(zero-v*scale).toFixed(1)}`).join(' ');
}
function makeSamples(fn, count=361) { return Array.from({length:count},(_,i)=>fn(i/(count-1), 4*Math.PI*i/(count-1))); }
function waveBoard({eyebrow,title,input,output,inputZero=120,outputZero=311,inputScale=4.8,outputScale=4.8,inputLabel='INPUT · vᵢ(t)',outputLabel='OUTPUT · vₒ(t)',threshold=null,labels=[],readouts=[],controls=''}) {
  const inPath=tracePath(input,inputZero,inputScale), outPath=tracePath(output,outputZero,outputScale);
  const tickLabels='';
  const thresholdLine=threshold===null?'':`<path class="wave-threshold" d="M78 ${outputZero-threshold*outputScale} H700" /><text class="wave-annotation wave-annotation--gold" x="520" y="${outputZero-threshold*outputScale-7}">LIMIT ${threshold>=0?'+':''}${threshold.toFixed(1)} V</text>`;
  const scan=reducedMotion.matches?'':`<line class="wave-playhead" x1="78" x2="78" y1="51" y2="367" />`;
  return `<div class="diagram-board"><div class="diagram-board__top"><span>${eyebrow}</span><strong>${title}</strong></div>
    <svg class="diagram-svg wave-svg" viewBox="0 0 760 390" role="img" aria-label="Synchronized input and output voltage waveforms">
      <path class="wave-grid" d="M78 49 H700 M78 ${inputZero} H700 M78 190 H700 M78 221 H700 M78 ${outputZero} H700 M78 368 H700 M78 49 V368 M233 49 V368 M389 49 V368 M544 49 V368 M700 49 V368" />
      <text class="wave-axis-title" x="87" y="42">${inputLabel}</text><text class="wave-axis-title wave-axis-title--out" x="87" y="216">${outputLabel}</text>
      <text class="wave-zero" x="48" y="${inputZero+4}">0</text><text class="wave-zero" x="48" y="${outputZero+4}">0</text>
      <path class="wave-input" d="${inPath}" /><path class="wave-output" d="${outPath}" />${thresholdLine}${tickLabels}
      ${scan}
      <text class="wave-time" x="618" y="386">TIME →</text>
    </svg><div class="readouts">${readouts.map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join('')}</div></div>${controls}`;
}
function visualNetworkFixed(kind) {
  const series=kind==='series';
  const wires=series
    ? `<path class="wire" d="M120 191 V88 H314 M422 88 H622 V151 M622 231 V318 H120 V256" /><path class="resistor" d="M314 88 l10 -13 12 26 12 -26 12 26 12 -26 12 26 12 -13 10 0" /><path class="resistor" d="M622 151 l-13 9 26 12 -26 12 26 12 -26 12 13 9" />${flowDots('M120 191 V88 H622 V318 H120 V256',5,4)}`
    : `<path class="wire" d="M120 191 V88 H622 M120 256 V318 H622 M370 88 V148 M370 229 V318 M622 88 V148 M622 229 V318" /><path class="resistor" d="M370 148 l-13 9 26 12 -26 12 26 12 -26 12 13 9" /><path class="resistor" d="M622 148 l-13 9 26 12 -26 12 26 12 -26 12 13 9" />${flowDots('M120 191 V88 H370 V318 H120 V256',4,4)}<path id="branch-two" d="M370 88 H622 V318 H370" fill="none" stroke="none"/><circle class="flow-dot" r="5"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#branch-two"/></animateMotion></circle>`;
  return `<div class="diagram-board"><div class="diagram-board__top"><span>20 V source · 4 Ω and 6 Ω</span><strong>${series?'SERIES / ONE PATH':'PARALLEL / TWO PATHS'}</strong></div><svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="${series?'Series':'Parallel'} circuit with animated conventional current">
    ${wires}<path class="battery" d="M91 207 H149 M103 238 H138"/><text class="component-label" x="66" y="215">+</text><text class="component-label" x="66" y="248">−</text>
    <text class="diagram-label" x="${series?318:331}" y="${series?61:137}">4 Ω</text><text class="diagram-label" x="646" y="194">6 Ω</text><text class="diagram-label" x="120" y="367">20 V SOURCE</text>
  </svg><div class="readouts"><div><span>Equivalent R</span><strong>${series?'10 Ω':'2.4 Ω'}</strong></div><div><span>Total I</span><strong>${series?'2 A':'8.33 A'}</strong></div><div><span>${series?'V across 6 Ω':'Branch currents'}</span><strong>${series?'12 V':'5 A + 3.33 A'}</strong></div></div></div>
  <div class="visual-controls"><span class="control-hint">${series?'THE SAME CURRENT CROSSES BOTH RESISTORS':'EACH BRANCH HAS THE SAME SOURCE VOLTAGE'}</span></div>`;
}
function visualDiodeState() {
  const e=settings.diodeE, on=e>0.7, current=on?(e-0.7):0;
  const state=on?'FORWARD / ON':e===0.7?'AT THRESHOLD / I ≈ 0':'BELOW THRESHOLD / OFF';
  return `<div class="diagram-board ${on?'':'is-off'}"><div class="diagram-board__top"><span>Piecewise Si model · R = 1 kΩ</span><strong>${state}</strong></div>
  <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="Series source, silicon diode and resistor">
    <path class="wire" d="M125 200 V100 H205 M290 100 H595 V151 M595 231 V302 H125 V255" />
    <path class="battery" d="M96 214 H155 M107 244 H144" /><text class="component-label" x="65" y="220">+</text><text class="component-label" x="65" y="255">−</text>
    <path class="diode-shape ${on?'diode-shape--on':''}" d="M207 65 L207 135 L268 100 Z M270 65 V135" />
    <path class="resistor" d="M595 150 l-14 9 28 14 -28 14 28 14 -28 14 14 9" />
    <text class="diagram-label" x="192" y="160">ANODE → CATHODE</text><text class="diagram-label" x="558" y="267">1 kΩ</text>
    <text class="voltage-value" x="123" y="352">${e.toFixed(1)} V</text><text class="voltage-value ${on?'voltage-value--sum':''}" x="355" y="188">${on?'0.7 V DROP':'OPEN PATH'}</text>
    ${on?flowDots('M125 200 V100 H595 V302 H125 V255',4,4):''}
  </svg><div class="readouts"><div><span>Source</span><strong>${e.toFixed(1)} V</strong></div><div><span>Resistor V</span><strong>${current.toFixed(1)} V</strong></div><div><span>Current</span><strong>${current.toFixed(1)} mA</strong></div></div></div>
  <div class="visual-controls"><label class="slider-control slider-control--wide">SOURCE E <input data-range="diodeE" type="range" min="0" max="10" step="0.1" value="${e}" aria-label="Source voltage" /></label><span class="control-hint">APPROXIMATE 0.7 V MODEL</span></div>`;
}
function visualLoadLine() {
  const E=settings.loadE, imax=E, iq=Math.max(0,E-0.7);
  const x0=104,y0=320,xE=x0+E/12*548,yI=y0-E/12*225,xQ=x0+0.7/12*548,yQ=y0-iq/12*225;
  return `<div class="diagram-board"><div class="diagram-board__top"><span>R = 1 kΩ · 0.7 V diode model</span><strong>Q IS THE INTERSECTION</strong></div>
  <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="Load line with exact source intercepts and approximate operating point">
    <path class="axis" d="M104 320 H700 M104 320 V53" /><text class="axis-label" x="80" y="65">Iᴅ</text><text class="axis-label" x="689" y="345">Vᴅ</text>
    <path class="load-line" d="M${x0} ${yI} L${xE} ${y0}" /><path class="wave-threshold" d="M${xQ} 320 V${yQ}" />
    <circle class="q-point" cx="${xQ}" cy="${yQ}" r="8" /><circle class="load-intercept" cx="${x0}" cy="${yI}" r="6" /><circle class="load-intercept" cx="${xE}" cy="${y0}" r="6" />
    <text class="diagram-label" x="119" y="${Math.max(80,yI-18)}">I = E/R = ${imax.toFixed(1)} mA</text>
    <text class="diagram-label" x="${Math.min(565,xE+5)}" y="352">V = E = ${E.toFixed(1)} V</text>
    <text class="diagram-label" x="${xQ+20}" y="${yQ-15}">Q: 0.7 V, ${iq.toFixed(1)} mA</text>
    <text class="wave-annotation" x="432" y="73">I = (E − Vᴅ) / R</text>
    <text class="wave-annotation" x="432" y="92">STRAIGHT SOURCE CONSTRAINT</text>
  </svg><div class="readouts"><div><span>V-axis intercept</span><strong>${E.toFixed(1)} V</strong></div><div><span>I-axis intercept</span><strong>${imax.toFixed(1)} mA</strong></div><div><span>Approx. Q current</span><strong>${iq.toFixed(1)} mA</strong></div></div></div>
  <div class="visual-controls"><label class="slider-control slider-control--wide">SOURCE E <input data-range="loadE" type="range" min="2" max="10" step="0.5" value="${E}" aria-label="Load line source voltage" /></label><span class="control-hint">MODEL Q, NOT MEASURED I–V</span></div>`;
}
function visualHalfWave() {
  const amp=12, outPeak=amp-0.7;
  return waveBoard({eyebrow:'One diode · 50 Hz example',title:'POSITIVE HALF PASSES',input:makeSamples((_,t)=>amp*Math.sin(t)),output:makeSamples((_,t)=>Math.max(0,amp*Math.sin(t)-0.7)),inputScale:5,outputScale:5,labels:[[595,86,'+12 V PEAK'],[580,280,'11.3 V PEAK']],readouts:[['Input peak','12 V'],['Output peak','11.3 V'],['Pulse rate','50 Hz']]});
}
function visualFullWave() {
  const center=settings.fullMode==='center', amp=center?12:17,drop=center?0.7:1.4,peak=amp-drop;
  if(settings.fullView==='path')return visualFullWavePath(center,peak);
  return waveBoard({eyebrow:center?'Center tap · one half-winding is 12 V peak':'Bridge · whole secondary is 17 V peak',title:center?'ONE DIODE PER HALF':'TWO DIODES PER HALF',input:makeSamples((_,t)=>amp*Math.sin(t)),output:makeSamples((_,t)=>Math.max(0,amp*Math.abs(Math.sin(t))-drop)),inputScale:center?5:4,outputScale:4.9,readouts:[['Output peak',`${peak.toFixed(1)} V`],['Silicon drops',center?'0.7 V':'1.4 V'],['Pulse rate',center?'100 Hz':'120 Hz']],controls:fullControls(center)});
}
function fullControls(center){return `<div class="visual-controls visual-controls--mixed"><button class="control-button ${center?'':'is-selected'}" data-action="full-bridge" type="button">BRIDGE</button><button class="control-button ${center?'is-selected':''}" data-action="full-center" type="button">CENTER TAP</button><button class="control-button control-button--subtle" data-action="full-view" type="button">${settings.fullView==='path'?'SHOW WAVE':'TRACE PATH'}</button></div>`;}
function visualFullWavePath(center,peak){
  const first=center?['TOP END +','D1','LOAD +','CENTER TAP']:['AC A +','D2','LOAD +','D3 → AC B −'];
  const second=center?['BOTTOM END +','D2','LOAD +','CENTER TAP']:['AC B +','D4','LOAD +','D1 → AC A −'];
  const route=(items,y,n)=>`<g class="route-half">${reducedMotion.matches?'':`<animate attributeName="opacity" values="${n===1?'1;1;.25;.25;1':'.25;.25;1;1;.25'}" keyTimes="0;.46;.5;.96;1" dur="4s" repeatCount="indefinite"/>`}
    <path class="route-line" id="route-${n}" d="M77 ${y} H685"/>
    ${items.map((label,i)=>`<rect class="route-node ${i===2?'route-node--load':''}" x="${72+i*156}" y="${y-29}" width="138" height="58"/><text class="route-label" x="${141+i*156}" y="${y+6}" text-anchor="middle">${label}</text>`).join('')}
    ${reducedMotion.matches?'':`<circle class="flow-dot" r="6"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#route-${n}"/></animateMotion></circle>`}</g>`;
  return `<div class="diagram-board"><div class="diagram-board__top"><span>Conduction logic · alternating half-cycles</span><strong>${center?'CENTER TAP':'FOUR-DIODE BRIDGE'}</strong></div>
    <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="Alternating conduction routes showing how each half cycle sends current through the load in the same direction">
      <text class="diagram-label" x="78" y="59">POSITIVE HALF-CYCLE</text>${route(first,123,1)}
      <text class="diagram-label" x="78" y="226">NEGATIVE HALF-CYCLE</text>${route(second,291,2)}
      <text class="wave-annotation" x="288" y="382">LOAD POLARITY STAYS POSITIVE IN BOTH ROUTES</text>
    </svg><div class="readouts"><div><span>Output peak</span><strong>${peak.toFixed(1)} V</strong></div><div><span>Conducting diodes</span><strong>${center?'1 / HALF':'2 / HALF'}</strong></div><div><span>Pulse rate</span><strong>${center?'100 Hz':'120 Hz'}</strong></div></div></div>${fullControls(center)}`;
}
function visualFilter() {
  const C=settings.filterC*1e-6, vp=15.6,R=220,f=60,n=360, dt=2/f/n, arr=[], raw=[];
  let charge=0;
  for(let i=0;i<=n;i++){const t=4*Math.PI*i/n, r=Math.max(0,17*Math.abs(Math.sin(t))-1.4);charge=Math.max(r,charge*Math.exp(-dt/(R*C)));raw.push(r);arr.push(charge);}
  const ripple=vp/(120*R*C), dc=vp-ripple/2;
  return waveBoard({eyebrow:'17 V input peak · Si bridge · 220 Ω',title:'CAPACITOR DISCHARGES BETWEEN PEAKS',input:raw,output:arr,inputLabel:'AFTER BRIDGE · RECTIFIED',outputLabel:'AFTER CAPACITOR · FILTERED',inputZero:176,outputZero:348,inputScale:7.5,outputScale:7.5,labels:[[563,87,'RECTIFIED INPUT'],[547,258,'FILTERED OUTPUT']],readouts:[['C',`${settings.filterC} µF`],['Ripple ≈',`${ripple.toFixed(2)} Vpp`],['VDC ≈',`${dc.toFixed(2)} V`]],controls:`<div class="visual-controls"><label class="slider-control slider-control--wide">CAPACITOR <input data-range="filterC" type="range" min="100" max="2200" step="100" value="${settings.filterC}" aria-label="Filter capacitance in microfarads" /></label><span class="control-hint">SMALL-RIPPLE ESTIMATE</span></div>`});
}
function visualClip(kind) {
  const biased=kind==='biasedclip',upper=settings.clipSide==='upper',ideal=!biased&&settings.clipIdeal;
  const bias=biased?settings.clipBias:0, limit=(upper?1:-1)*(bias+(ideal?0:0.7)), amp=10;
  const input=makeSamples((_,t)=>amp*Math.sin(t)),output=input.map(v=>upper?Math.min(v,limit):Math.max(v,limit));
  return waveBoard({eyebrow:biased?'Shunt clipper · DC reference + Si diode':ideal?'Ideal shunt clipper':'Practical silicon shunt clipper',title:`${upper?'UPPER':'LOWER'} LIMIT ${limit>=0?'+':''}${limit.toFixed(1)} V`,input,output,threshold:limit,inputScale:5.1,outputScale:5.1,labels:[[576,75,'±10 V INPUT']],readouts:[['Reference',`${bias} V`],['Diode drop',`${ideal?'0':'0.7'} V`],['Clip line',`${limit>=0?'+':''}${limit.toFixed(1)} V`]],controls:`<div class="visual-controls visual-controls--mixed"><button class="control-button ${upper?'is-selected':''}" data-action="clip-upper" type="button">UPPER</button><button class="control-button ${upper?'':'is-selected'}" data-action="clip-lower" type="button">LOWER</button>${biased?`<label class="slider-control">BIAS <input data-range="clipBias" type="range" min="0" max="7" step="1" value="${bias}" aria-label="Clipper bias voltage" /></label>`:`<button class="control-button ${ideal?'is-selected':''}" data-action="clip-model" type="button">${ideal?'IDEAL':'SILICON'}</button>`}</div>`});
}
function visualClipPaths() {
  const series=settings.clipPath==='series',amp=8;
  if(settings.clipPathView==='circuit')return visualClipCircuit(series);
  const input=makeSamples((_,t)=>amp*Math.sin(t));
  const output=input.map(v=>series?Math.max(0,v-0.7):Math.min(v,0.7));
  return waveBoard({eyebrow:series?'Diode in series with the load':'Diode shunted across the output',title:series?'PASS POSITIVE / BLOCK NEGATIVE':'LIMIT POSITIVE / PASS NEGATIVE',input,output,threshold:series?null:0.7,inputScale:5.8,outputScale:5.8,readouts:[['Diode path',series?'SERIES':'SHUNT'],['Positive crest',series?'7.3 V':'0.7 V'],['Negative trough',series?'0 V':'−8 V']],controls:`${clipPathControls(series)}`});
}
function visualSeriesBias(){
  const ideal=settings.seriesBiasModel==='ideal',drop=ideal?0:0.7,threshold=3+drop,peak=10-threshold;
  return waveBoard({eyebrow:'±10 V input · 3 V opposing bias · series diode',title:ideal?'IDEAL DIODE / PEAK 7 V':'SILICON DIODE / PEAK 6.3 V',input:makeSamples((_,t)=>10*Math.sin(t)),output:makeSamples((_,t)=>Math.max(0,10*Math.sin(t)-threshold)),inputScale:5.1,outputScale:6.1,readouts:[['Bias','3 V'],['Turn-on',`${threshold.toFixed(1)} V`],['Output peak',`${peak.toFixed(1)} V`]],controls:`<div class="visual-controls visual-controls--tabs"><button class="control-button ${ideal?'is-selected':''}" data-action="seriesbias-ideal" type="button">IDEAL</button><button class="control-button ${ideal?'':'is-selected'}" data-action="seriesbias-silicon" type="button">SILICON 0.7 V</button><p>Only input above the threshold reaches the load.</p></div>`});
}
function clipPathControls(series){return `<div class="visual-controls visual-controls--mixed"><button class="control-button ${series?'is-selected':''}" data-action="clip-series" type="button">SERIES</button><button class="control-button ${series?'':'is-selected'}" data-action="clip-shunt" type="button">SHUNT</button><button class="control-button control-button--subtle" data-action="clip-view" type="button">${settings.clipPathView==='circuit'?'SHOW WAVE':'SHOW CIRCUIT'}</button></div>`;}
function visualClipCircuit(series){
  const wires=series
    ? `<path class="wire" d="M130 156 V90 H232 M303 90 H620 V148 M620 229 V305 H130 V224"/><path class="diode-shape diode-shape--on" d="M238 61 L238 119 L286 90 Z M288 60 V120"/>${flowDots('M130 156 V90 H620 V305 H130 V224',5,4)}`
    : `<path class="wire" d="M130 156 V90 H232 M340 90 H620 V148 M620 229 V305 H130 V224 M465 90 V171 M465 239 V305"/><path class="resistor" d="M232 90 l10 -13 12 26 12 -26 12 26 12 -26 12 26 12 -13 10 0"/><path class="diode-shape diode-shape--on" d="M439 175 H491 L465 218 Z M438 227 H492"/>${flowDots('M130 156 V90 H465 V305 H130 V224',5,4)}`;
  return `<div class="diagram-board"><div class="diagram-board__top"><span>${series?'Series clipper · positive interval':'Shunt clipper · conducting interval'}</span><strong>${series?'LOAD PATH CONDUCTS':'DIODE BRANCH DIVERTS CURRENT'}</strong></div>
    <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="${series?'Series':'Shunt'} silicon clipper schematic showing current path during diode conduction">
      ${wires}<circle class="ac-source" cx="130" cy="190" r="34"/><text class="ac-source-label" x="130" y="202" text-anchor="middle">~</text>
      <path class="resistor" d="M620 148 l-13 9 26 12 -26 12 26 12 -26 12 13 9" />
      <text class="diagram-label" x="84" y="255">±8 V AC</text><text class="diagram-label" x="653" y="198">LOAD</text>
      <text class="diagram-label" x="${series?228:325}" y="${series?53:153}">${series?'SERIES DIODE':'SHUNT DIODE'}</text>
      <text class="wave-annotation" x="375" y="354">${series?'DIODE ON → CURRENT THROUGH LOAD':'DIODE ON → CURRENT BYPASSES LOAD'}</text>
    </svg><div class="readouts"><div><span>Path</span><strong>${series?'SERIES':'SHUNT'}</strong></div><div><span>Positive crest</span><strong>${series?'7.3 V':'0.7 V'}</strong></div><div><span>Negative trough</span><strong>${series?'0 V':'−8 V'}</strong></div></div></div>${clipPathControls(series)}`;
}
function visualClamperCourse() {
  const positive=settings.clampSide==='positive',amp=10,shift=positive?10:-10;
  if(settings.clampViewCourse==='circuit')return visualClamperCircuit(positive);
  return waveBoard({eyebrow:'Steady-state ideal clamper · RC ≫ T',title:positive?'NEGATIVE PEAK CLAMPED TO 0':'POSITIVE PEAK CLAMPED TO 0',input:makeSamples((_,t)=>amp*Math.sin(t)),output:makeSamples((_,t)=>amp*Math.sin(t)+shift),inputScale:4.7,outputZero:positive?329:239,outputScale:4.4,readouts:[['DC shift',`${positive?'+':'−'}10 V`],['Output range',positive?'0…+20 V':'−20…0 V'],['Peak to peak','20 V']],controls:clampControls(positive)});
}
function clampControls(positive){return `<div class="visual-controls visual-controls--mixed"><button class="control-button ${positive?'is-selected':''}" data-action="clamp-positive" type="button">POSITIVE</button><button class="control-button ${positive?'':'is-selected'}" data-action="clamp-negative" type="button">NEGATIVE</button><button class="control-button control-button--subtle" data-action="clamp-view" type="button">${settings.clampViewCourse==='circuit'?'SHOW WAVE':'SHOW CIRCUIT'}</button></div>`;}
function visualClamperCircuit(positive){
  const diode=positive?`<path class="diode-shape diode-shape--on" d="M438 232 H492 L465 187 Z M438 180 H492"/>`:`<path class="diode-shape diode-shape--on" d="M438 174 H492 L465 219 Z M438 226 H492"/>`;
  const branch=positive?'M465 90 V171 M465 240 V305':'M465 90 V166 M465 235 V305';
  return `<div class="diagram-board"><div class="diagram-board__top"><span>Diode · capacitor · load resistor</span><strong>${positive?'NEGATIVE PEAK CHARGES C':'POSITIVE PEAK CHARGES C'}</strong></div>
    <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="${positive?'Positive':'Negative'} shifting clamper schematic with series capacitor and shunt diode">
      <path class="wire" d="M130 156 V90 H241 M279 90 H620 V148 M620 229 V305 H130 V224 ${branch}"/>
      <path class="capacitor" d="M250 59 V121 M270 59 V121"/>${diode}
      <path class="resistor" d="M620 148 l-13 9 26 12 -26 12 26 12 -26 12 13 9"/>
      <circle class="ac-source" cx="130" cy="190" r="34"/><text class="ac-source-label" x="130" y="202" text-anchor="middle">~</text>
      <text class="diagram-label" x="202" y="51">SERIES CAPACITOR</text><text class="diagram-label" x="324" y="203">SHUNT DIODE</text><text class="diagram-label" x="653" y="199">LOAD</text>
      <text class="wave-annotation" x="284" y="359">${positive?'DIODE CONDUCTS NEAR NEGATIVE INPUT PEAK':'DIODE CONDUCTS NEAR POSITIVE INPUT PEAK'}</text>
    </svg><div class="readouts"><div><span>Input</span><strong>±10 V</strong></div><div><span>Ideal output</span><strong>${positive?'0…+20 V':'−20…0 V'}</strong></div><div><span>RC condition</span><strong>RC ≫ T</strong></div></div></div>${clampControls(positive)}`;
}
function visualBiasedClamper(){
  const upper=settings.biasedClampMode==='upper',amp=upper?10:20,shift=upper?-8:25;
  const input=makeSamples((_,t)=>amp*(Math.sin(t)>=0?1:-1));
  const output=input.map(v=>v+shift);
  return waveBoard({eyebrow:'Lecture 6 · ideal biased square-wave clamper',title:upper?'POSITIVE PEAK → +2 V':'NEGATIVE PEAK → +5 V',input,output,inputZero:120,outputZero:upper?260:368,inputScale:upper?4.5:3.4,outputScale:upper?4.5:3,readouts:[['Input',upper?'±10 V':'±20 V'],['DC shift',upper?'−8 V':'+25 V'],['Output',upper?'−18…+2 V':'+5…+45 V']],controls:`<div class="visual-controls visual-controls--tabs"><button class="control-button ${upper?'is-selected':''}" data-action="biasedclamp-upper" type="button">ANCHOR + PEAK</button><button class="control-button ${upper?'':'is-selected'}" data-action="biasedclamp-lower" type="button">ANCHOR − PEAK</button><p>Peak-to-peak span is unchanged.</p></div>`});
}
function visualMultiplierCourse() {
  return `<div class="diagram-board"><div class="diagram-board__top"><span>Lecture 6 · ideal two-stage voltage model</span><strong>OUTPUT ≈ 2 × INPUT PEAK</strong></div>
  <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="Two stored 30 volt peaks combine into an ideal 60 volt output">
    <text class="diagram-label" x="380" y="80" text-anchor="middle">30 V SECONDARY PEAK CHARGES EACH STAGE</text>
    <rect class="doubler-stage" x="55" y="130" width="183" height="138"/><rect class="doubler-stage" x="289" y="130" width="183" height="138"/><rect class="doubler-stage doubler-stage--output" x="523" y="130" width="183" height="138"/>
    <text class="diagram-label" x="146" y="169" text-anchor="middle">STORED PEAK 1</text><text class="diagram-label" x="380" y="169" text-anchor="middle">STORED PEAK 2</text><text class="diagram-label" x="614" y="169" text-anchor="middle">IDEAL OUTPUT</text>
    <text class="voltage-value" x="146" y="230" text-anchor="middle">30 V</text><text class="voltage-value" x="380" y="230" text-anchor="middle">30 V</text><text class="voltage-value voltage-value--sum" x="614" y="230" text-anchor="middle">60 V</text>
    <text class="voltage-plus" x="264" y="222" text-anchor="middle">+</text><text class="voltage-plus" x="499" y="222" text-anchor="middle">=</text>
    <path class="doubler-flow" d="M55 312 H706"/>${flowDots('M55 312 H706',3,3.7)}
  </svg><div class="readouts"><div><span>Input peak</span><strong>30 V</strong></div><div><span>Stages</span><strong>2</strong></div><div><span>Ideal output</span><strong>60 V</strong></div></div></div><div class="visual-controls"><span class="control-hint">VOLTAGE ADDITION MODEL · NOT A WIRING DIAGRAM</span></div>`;
}
function courseVisual(id) {
  switch(id){
    case 'ohm': return visualCurrent();
    case 'series': return visualNetworkFixed('series');
    case 'parallel': return visualNetworkFixed('parallel');
    case 'diode': return visualDiodeState();
    case 'loadline': return visualLoadLine();
    case 'halfwave': return visualHalfWave();
    case 'fullwave': return visualFullWave();
    case 'filter': return visualFilter();
    case 'clipper': return visualClip('clipper');
    case 'seriesclip': return visualClipPaths();
    case 'seriesbias': return visualSeriesBias();
    case 'biasedclip': return visualClip('biasedclip');
    case 'clamper': return visualClamperCourse();
    case 'biasedclamp': return visualBiasedClamper();
    case 'multiplier': return visualMultiplierCourse();
  }
}
