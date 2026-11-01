const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const pad = n => String(n).padStart(2, '0');
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const settings = {
  voltage: 9, resistance: 300, switchClosed: true,
  diodeE: 5,
  clipSide: 'upper', clipBias: 5,
  clampSide: 'positive',
};
let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.match(/slide-(\d+)/)?.[1] || 1) - 1));
let moving = false;
let queued = null;
let quizIndex = 0;
let quizChoices = Array(finalQuiz.length).fill(null);
let quizComplete = false;

function flowDots(path, count = 4, duration = 3.8) {
  return `<path id="flow-path" d="${path}" fill="none" stroke="none" />${Array.from({ length: count }, (_, i) => `<circle class="flow-dot" r="5"><animateMotion dur="${duration}s" begin="-${(i * duration / count).toFixed(2)}s" repeatCount="indefinite"><mpath href="#flow-path" /></animateMotion></circle>`).join('')}`;
}

function visualCurrent() {
  const closed = settings.switchClosed;
  const powered = closed && settings.voltage > 0;
  const milliamps = settings.voltage / settings.resistance * 1000;
  const duration = Math.max(1.7, 5.4 - milliamps / 13);
  return `<div class="diagram-board ${powered ? '' : 'is-off'}">
    <div class="diagram-board__top"><span>Ohm's law in motion</span><strong>${closed ? settings.voltage > 0 ? 'CLOSED CIRCUIT' : 'CLOSED · ZERO SOURCE' : 'OPEN CIRCUIT'}</strong></div>
    <svg class="diagram-svg" viewBox="0 0 760 390" role="img" aria-label="Battery, switch and lamp in a loop with animated conventional current">
      <path class="wire" d="M142 197 V86 H382 M430 86 H622 V174 M622 244 V320 H142 V264" />
      <path class="wire-soft" d="M382 86 H430" />
      <path class="switch-arm ${closed ? 'switch-arm--closed' : ''}" d="M382 86 L${closed ? '430 86' : '426 58'}" />
      <circle class="joint" cx="382" cy="86" r="5" /><circle class="joint" cx="430" cy="86" r="5" />
      <path class="battery" d="M111 210 H173 M124 238 H160" /><text class="component-label" x="72" y="217">+</text><text class="component-label" x="72" y="246">−</text>
      <circle class="lamp ${powered ? 'lamp--on' : ''}" cx="622" cy="209" r="35" /><path class="lamp-filament" d="M604 224 L614 193 L625 224 L637 193" />
      <text class="diagram-label" x="280" y="68">SWITCH</text><text class="diagram-label" x="652" y="215">LOAD</text><text class="diagram-label" x="115" y="365">SOURCE</text>
      ${flowDots('M142 197 V86 H622 V320 H142 V264', 5, duration)}
    </svg>
    <div class="readouts"><div><span>Voltage</span><strong data-readout="voltage">${settings.voltage.toFixed(1)} V</strong></div><div><span>Resistance</span><strong data-readout="resistance">${settings.resistance} Ω</strong></div><div><span>Current</span><strong data-readout="current">${powered ? milliamps.toFixed(1) : '0.0'} mA</strong></div></div>
  </div><div class="visual-controls"><label class="slider-control">V <input data-range="voltage" type="range" min="0" max="12" step="0.5" value="${settings.voltage}" aria-label="Source voltage" /></label><label class="slider-control">R <input data-range="resistance" type="range" min="50" max="600" step="10" value="${settings.resistance}" aria-label="Resistance" /></label><button class="control-button" data-action="switch" type="button">${closed ? 'OPEN SWITCH' : 'CLOSE SWITCH'}</button></div>`;
}
