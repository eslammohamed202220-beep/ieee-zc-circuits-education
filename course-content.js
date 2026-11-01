const topics = [
  {id:'ohm',group:'01 / FOUNDATIONS',title:'THE LOOP MUST CLOSE',short:'Current & Ohm’s law',source:'Lecture 1 · pp. 8–15',lead:'Voltage is potential difference; current is charge flow. A broken path means zero current.',formula:'I = V / R',points:[
    ['Trace the path','Conventional current is drawn from source +, through the load, back to source −. Open the switch and the loop breaks.'],
    ['Use Ohm’s law','For a resistor, I = V/R. Higher V increases I; higher R reduces I. Convert kΩ to Ω before calculating.'],
    ['Check units and power','V/Ω = A; 1 A = 1000 mA. Resistor power is P = VI = I²R.']],
    insight:'Open the switch while voltage stays fixed. Explain why current stops.',problems:[
      {tag:'A / CURRENT',q:'A 6 V battery feeds a 150 Ω lamp. The switch is closed. Find I.',steps:['Closed loop → I = V/R.','I = 6/150 = 0.040 A.','0.040 A = 40 mA.'],answer:'40 mA'},
      {tag:'B / POWER',q:'A 12 V source drives a 2 kΩ resistor. Find I and P.',steps:['2 kΩ = 2000 Ω.','I = 12/2000 = 0.006 A = 6 mA.','P = VI = 12 × 0.006 = 0.072 W = 72 mW.'],answer:'6 mA · 72 mW'}]},
  {id:'series',group:'02 / NETWORKS',title:'ONE PATH, SHARED CURRENT',short:'Series & KVL',source:'Lecture 1 · pp. 16–21, 25',lead:'Series resistors share one path. Current stays the same; voltage is divided.',formula:'Rₑq = R₁ + R₂',points:[
    ['Reduce the path','Add series resistances, then calculate source current I = Vₛ/Rₑq. This current passes through every resistor.'],
    ['Find each drop','V₁ = IR₁ and V₂ = IR₂. A larger series resistance takes a larger voltage drop.'],
    ['Check KVL','The source rise equals the sum of drops: Vₛ = V₁ + V₂. Divider shortcut: V₂ = VₛR₂/(R₁+R₂).']],
    insight:'Watch one current path. Check that both displayed voltage drops sum to the source.',problems:[
      {tag:'A / DIVIDER',q:'20 V feeds 4 Ω and 6 Ω in series. Find I, V₄ and V₆.',steps:['Rₑq = 4+6 = 10 Ω.','I = 20/10 = 2 A.','V₄ = 8 V, V₆ = 12 V; check 8+12 = 20 V.'],answer:'2 A · 8 V · 12 V'},
      {tag:'B / KVL',q:'18 V feeds 3 Ω, 6 Ω and 9 Ω in series. Find all drops.',steps:['Rₑq = 18 Ω.','I = 18/18 = 1 A.','Drops are 3 V, 6 V and 9 V; sum = 18 V.'],answer:'3 V · 6 V · 9 V'}]},
  {id:'parallel',group:'03 / NETWORKS',title:'ONE VOLTAGE, MANY PATHS',short:'Parallel & KCL',source:'Lecture 1 · pp. 16–18, 22–25',lead:'Both ends of parallel branches connect to the same two nodes. The voltage is shared; current splits.',formula:'Iₜ = I₁ + I₂',points:[
    ['Find the two nodes','Each branch sees the same voltage as the source. Different resistances therefore draw different currents.'],
    ['Apply KCL','At the junction, current in equals current out: Iₜ = V/R₁ + V/R₂. Lower R draws higher I.'],
    ['Divide current','For two branches, Rₑq = R₁R₂/(R₁+R₂). If Iₜ is given, I₁ = IₜR₂/(R₁+R₂).']],
    insight:'Follow animated current into two branches, then confirm it recombines.',problems:[
      {tag:'A / KCL',q:'12 V feeds 6 Ω ∥ 3 Ω. Find branch currents and Rₑq.',steps:['Both branches have 12 V.','I₆ = 12/6 = 2 A; I₃ = 12/3 = 4 A.','Iₜ = 6 A; Rₑq = 12/6 = 2 Ω.'],answer:'2 A · 4 A · 2 Ω'},
      {tag:'B / DIVIDER',q:'10 A enters 2 Ω ∥ 3 Ω. Find each branch current.',steps:['I₂ = 10 × 3/(2+3) = 6 A.','I₃ = 10 × 2/(2+3) = 4 A.','6+4 = 10 A; both branches have 12 V.'],answer:'6 A through 2 Ω · 4 A through 3 Ω'}]},
  {id:'diode',group:'04 / DIODE MODELS',title:'DECIDE ON OR OFF FIRST',short:'Silicon diode states',source:'Lecture 3 · pp. 8–14',lead:'The approximate silicon model is a 0.7 V drop when ON, an open path when OFF.',formula:'I = (E − 0.7) / R',points:[
    ['Check direction','The bar is the cathode. Forward conventional current enters the anode and leaves the cathode.'],
    ['Try ON','If forward source voltage exceeds about 0.7 V, set Vᴅ ≈ 0.7 V, then use KVL to find resistor voltage and current.'],
    ['Try OFF','For reverse bias or insufficient forward voltage, set I = 0. The 0.7 V boundary is a simplified teaching model; real I–V is gradual.']],
    insight:'Sweep E across 0.7 V. Identify the model state, then verify with KVL.',problems:[
      {tag:'A / FORWARD',q:'5 V feeds a forward Si diode and 1 kΩ resistor. Find I and Vᵣ.',steps:['5 > 0.7, so diode ON.','Vᵣ = 5−0.7 = 4.3 V.','I = 4.3/1000 = 4.3 mA.'],answer:'4.3 mA · 4.3 V'},
      {tag:'B / BELOW THRESHOLD',q:'The same circuit receives 0.5 V. Find I, Vᵣ and Vᴅ.',steps:['0.5 < 0.7, so OFF in this model.','I = 0, hence Vᵣ = 0.','KVL gives Vᴅ = 0.5 V.'],answer:'0 A · 0 V · 0.5 V'}]},
  {id:'loadline',group:'05 / DIODE MODELS',title:'FIND THE OPERATING POINT',short:'Diode load line',source:'Lecture 3 · pp. 3–7',lead:'The source and resistor define a straight line. Its intersection with the diode curve is Q.',formula:'Iᴅ = (E − Vᴅ) / R',points:[
    ['Write KVL','E = Vᴅ + IᴅR, so Iᴅ = (E−Vᴅ)/R. This is the source-and-resistor constraint.'],
    ['Plot two intercepts','At Vᴅ = 0, Iᴅ = E/R. At Iᴅ = 0, Vᴅ = E. Join these points.'],
    ['Locate Q','Q satisfies both the load line and the diode characteristic. The 0.7 V model gives only an approximate Q; a real measured curve can shift it.']],
    insight:'Change E and watch both intercepts move. The approximate Q must remain on the line.',problems:[
      {tag:'A / INTERCEPTS',q:'E = 10 V, R = 0.5 kΩ. Find intercepts and approximate Q.',steps:['R = 500 Ω; E/R = 20 mA.','Intercepts: (0 V, 20 mA) and (10 V, 0 mA).','At Vᴅ ≈ 0.7 V: Iᴅ = 9.3/500 = 18.6 mA.'],answer:'Q ≈ (0.7 V, 18.6 mA)'},
      {tag:'B / NEW SOURCE',q:'E = 5 V, R = 1 kΩ. Find intercepts and approximate Q.',steps:['E/R = 5 mA.','Intercepts: (0 V, 5 mA) and (5 V, 0 mA).','At Vᴅ ≈ 0.7 V: Iᴅ = 4.3/1000 = 4.3 mA.'],answer:'Q ≈ (0.7 V, 4.3 mA)'}]},
  {id:'halfwave',group:'06 / AC TO DC',title:'ONE HALF-CYCLE PASSES',short:'Half-wave rectifier',source:'Lecture 4 · pp. 6–8, 15',lead:'One diode conducts on the positive half-cycle and blocks the negative one.',formula:'Vₚ(out) ≈ Vₚ(in) − 0.7',points:[
    ['Positive input','The diode is forward biased. The load follows a positive arch with approximately one silicon drop.'],
    ['Negative input','The diode is reverse biased. Current and load voltage are zero in the simple model; that half-cycle becomes a flat line.'],
    ['Read the result','Output is pulsating DC with one pulse per input period. Lecture approximation: Vavg ≈ Vₚ(out)/π. Unfiltered PIV ≈ input peak.']],
    insight:'Follow the shared time cursor through both input halves. The missing negative arch is intentional.',problems:[
      {tag:'A / PEAK',q:'12 V peak at 50 Hz feeds a Si half-wave rectifier. Find output peak, average and pulse rate.',steps:['Peak ≈ 12−0.7 = 11.3 V.','Average ≈ 11.3/π = 3.60 V.','One pulse per input period: 50 Hz.'],answer:'11.3 V · 3.60 V · 50 Hz'},
      {tag:'B / RMS',q:'A 12 V RMS secondary at 60 Hz feeds the same circuit. Estimate peak and average.',steps:['Input peak = √2 × 12 = 16.97 V.','Output peak ≈ 16.97−0.7 = 16.27 V.','Average ≈ 16.27/π = 5.18 V.'],answer:'16.27 V · 5.18 V'}]},
  {id:'fullwave',group:'07 / AC TO DC',title:'USE BOTH HALF-CYCLES',short:'Bridge & center tap',source:'Lecture 4 · pp. 9–15',lead:'The negative input lobe is turned upward at the load: two output pulses per input cycle.',formula:'Vavg ≈ 2Vₚ(out) / π',points:[
    ['Bridge','Two silicon diodes conduct on either half-cycle. Vₚ(out) ≈ whole-secondary Vₚ−1.4 V.'],
    ['Center tap','One diode conducts on either half-cycle. Use the peak across ONE HALF of the secondary, then subtract 0.7 V.'],
    ['Do not mix ratings','A 24 V peak end-to-end center-tapped secondary supplies 12 V peak per half. Both arrangements give 2f output pulses.']],
    insight:'Toggle bridge/center tap. Count diode drops and verify which winding peak is being used.',problems:[
      {tag:'A / BRIDGE',q:'A bridge receives 17 V peak at 60 Hz. Find peak, average, pulse rate and diode PIV.',steps:['Two Si drops: 17−1.4 = 15.6 V peak.','Average ≈ 2×15.6/π = 9.93 V; pulse frequency = 120 Hz.','PIV per diode ≈ Vₚ(out)+0.7 = 16.3 V in the unfiltered lecture model.'],answer:'15.6 V · 9.93 V · 120 Hz · 16.3 V PIV'},
      {tag:'B / CENTER TAP',q:'A center-tapped secondary is 24 V peak end-to-end at 50 Hz. Find load peak, average and PIV.',steps:['One half-winding is 12 V peak.','One Si drop gives 12−0.7 = 11.3 V peak.','Average ≈ 2×11.3/π = 7.19 V; pulse rate = 100 Hz. PIV ≈ 2×11.3+0.7 = 23.3 V.'],answer:'11.3 V · 7.19 V · 23.3 V PIV'}]},
  {id:'filter',group:'08 / AC TO DC',title:'THE CAPACITOR FILLS THE GAPS',short:'Smoothing & ripple',source:'Lecture 4 · pp. 16–19',lead:'A capacitor recharges near each peak and supplies the load between peaks.',formula:'Vᵣ(pp) ≈ Vₚ / (fᵣRC)',points:[
    ['Charge near peaks','The rectified source exceeds capacitor voltage only near a peak, so diodes conduct briefly and recharge C.'],
    ['Discharge between peaks','The diode turns OFF; C discharges through the load, making a small downward slope rather than a flat DC line.'],
    ['Estimate ripple','For small ripple, fᵣ = f for half-wave or 2f for full-wave; Vᵣ(pp) ≈ Vₚ/(fᵣRC); VDC ≈ Vₚ−Vᵣ(pp)/2. C must be in farads.']],
    insight:'Increase C and compare the ripple. More capacitance slows discharge.',problems:[
      {tag:'A / LECTURE CASE',q:'Bridge: 17 V peak, 60 Hz, R = 220 Ω, C = 1000 µF. Find ripple, VDC and ripple ratio.',steps:['Rectified peak = 17−1.4 = 15.6 V; fᵣ = 120 Hz.','Vᵣ(pp) ≈ 15.6/(120×220×0.001) = 0.591 V.','VDC ≈ 15.6−0.591/2 = 15.30 V. Ripple ratio ≈ 0.591/15.30 = 3.9%.'],answer:'0.591 Vpp · 15.30 V DC · 3.9%'},
      {tag:'B / NEW LOAD',q:'Bridge: 12 V peak, 50 Hz, R = 470 Ω, C = 1000 µF. Find ripple and VDC.',steps:['Rectified peak = 10.6 V; fᵣ = 100 Hz.','Ripple ≈ 10.6/(100×470×0.001) = 0.226 V.','VDC ≈ 10.6−0.226/2 = 10.49 V.'],answer:'0.226 Vpp · 10.49 V DC'}]},
  {id:'clipper',group:'09 / WAVE SHAPING',title:'CUT A PEAK, KEEP THE REST',short:'Ideal & practical clippers',source:'Clippers handout · pp. 3, 5, 8–10',lead:'An upper clipper limits values above a line; a lower clipper limits values below it.',formula:'Upper: vₒ = min(vᵢ, L)',points:[
    ['Choose the side','Upper means flatten samples ABOVE L. Lower means flatten samples BELOW L. On the allowed side, output follows input.'],
    ['Ideal vs practical','With no DC bias, an ideal shunt limit is 0 V. Silicon moves the limit to +0.7 V for upper or −0.7 V for lower clipping.'],
    ['Construct the graph','Mark zero and the limit on output axes; find crossings; flatten only the forbidden intervals. A series diode that removes a whole half-wave is also a clipper.']],
    insight:'Watch the vertical time marker: output stops at the threshold while input continues beyond it.',problems:[
      {tag:'A / IDEAL UPPER',q:'Ideal upper clipper at 0 V receives a ±8 V sine. Find output extrema.',steps:['Positive values are capped at 0 V.','Nonpositive values follow input.','Output range is −8 to 0 V.'],answer:'−8 to 0 V'},
      {tag:'B / Si LOWER',q:'Si lower clipper at −0.7 V receives a ±5 V sine. Find output extrema.',steps:['Negative values below −0.7 V flatten there.','The positive crest remains +5 V.','Output range is −0.7 to +5 V.'],answer:'−0.7 to +5 V'}]},
  {id:'biasedclip',group:'11 / WAVE SHAPING',title:'MOVE THE CLIPPING LINE',short:'Biased clippers',source:'Clippers handout · pp. 6–14',lead:'A DC reference moves the limit away from zero; orientation selects upper or lower clipping.',formula:'L = ±(Vbias + Vᴅ)',points:[
    ['Read polarity first','The upper orientation illustrated has L = +(Vbias+0.7 V); the mirrored lower orientation has L = −(Vbias+0.7 V).'],
    ['Test the crossing','When vᵢ exceeds the upper line, output flattens. When vᵢ falls below the lower line, output flattens.'],
    ['Draw consistently','Move the bias slider. The horizontal threshold and output plateau move together; the uncut half-wave never changes.']],
    insight:'Choose upper/lower, then change bias. Predict the new plateau before reading its label.',problems:[
      {tag:'A / UPPER',q:'±10 V input; upper Si clipper with +4 V bias. Find output range.',steps:['L = +4+0.7 = +4.7 V.','Values above +4.7 V flatten.','Negative trough stays −10 V.'],answer:'−10 to +4.7 V'},
      {tag:'B / LOWER',q:'±10 V input; mirrored lower Si clipper with 3 V bias. Find range.',steps:['L = −(3+0.7) = −3.7 V.','Values below −3.7 V flatten.','Positive crest stays +10 V.'],answer:'−3.7 to +10 V'}]},
  {id:'clamper',group:'13 / WAVE SHAPING',title:'SHIFT THE ENTIRE WAVE',short:'Clampers',source:'Lecture 6 · pp. 4–11',lead:'A clamper adds a DC offset while approximately preserving peak-to-peak height.',formula:'vₒ(t) ≈ vᵢ(t) + Vshift',points:[
    ['Charge','The diode conducts near one input extreme and charges the series capacitor to roughly the input peak.'],
    ['Hold','With RC much larger than signal period T, the capacitor loses little charge before the next cycle.'],
    ['Shift, do not cut','An ideal positive clamper makes ±10 V become 0…+20 V. An ideal negative clamper makes it −20…0 V. Vpp remains 20 V. Real diode drop and finite RC cause offset error and droop.']],
    insight:'The two curves keep their shape and phase; only their vertical separation changes.',problems:[
      {tag:'A / POSITIVE',q:'Ideal positive clamper with ±10 V input. Find range and Vpp.',steps:['Raise −10 V to zero: add +10 V.','Output 0…+20 V.','Vpp stays 20 V.'],answer:'0 to +20 V · 20 Vpp'},
      {tag:'B / NEGATIVE',q:'Ideal negative clamper with ±6 V input. Find range and Vpp.',steps:['Lower +6 V to zero: subtract 6 V.','Output −12…0 V.','Vpp stays 12 V.'],answer:'−12 to 0 V · 12 Vpp'}]},
  {id:'multiplier',group:'15 / WAVE SHAPING',title:'STACK STORED PEAKS',short:'Voltage multipliers',source:'Lecture 6 · pp. 12–15',lead:'Diode-capacitor stages store peak-sized voltages and combine them at the output.',formula:'Vout(ideal) ≈ N × Vₚ',points:[
    ['Charge a stage','A conducting diode lets one capacitor charge near the AC peak; it retains charge while the diode is OFF.'],
    ['Combine stages','In the lecture’s idealized two-stage model, two peak-sized voltages combine: Vout ≈ 2Vₚ.'],
    ['Apply ratings correctly','If a transformer precedes the multiplier, find secondary peak first. Real diode drops and load discharge reduce output; the diagram shows voltage addition, not a wiring schematic.']],
    insight:'Two stored 30 V peaks combine into a 60 V ideal output; no energy is created.',problems:[
      {tag:'A / TWO STAGES',q:'30 V secondary peak drives an ideal two-stage multiplier. Find Vout.',steps:['N = 2 stages.','Vout ≈ N×Vₚ = 2×30.','Ideal result is 60 V.'],answer:'60 V ideal'},
      {tag:'B / TRANSFORMER',q:'10 V primary peak, 1:3 transformer, ideal two-stage multiplier. Find Vout.',steps:['Secondary peak = 10×3 = 30 V.','Apply multiplier to secondary, not primary.','Vout ≈ 2×30 = 60 V ideal.'],answer:'30 V secondary · 60 V output'}]},
];

topics.splice(topics.findIndex(t=>t.id==='biasedclip'),0,{
  id:'seriesclip',group:'10 / WAVE SHAPING',title:'SERIES OR SHUNT?',short:'Clipper circuit paths',source:'Clippers handout · pp. 5–10',
  lead:'The diode placement changes which part of the input reaches the load.',formula:'Series pass ≠ shunt limit',points:[
    ['Series diode','The diode is IN the load path. A positive-oriented series clipper passes positive input above its forward drop and blocks the negative half: vₒ ≈ max(0,vᵢ−0.7).'],
    ['Shunt diode','The diode forms a branch ACROSS the output after a series resistor. An upper-oriented shunt clipper conducts above +0.7 V and holds output near that limit.'],
    ['Trace before drawing','For each input half-cycle, decide whether the diode is ON. An ON series diode passes current to the load; an ON shunt diode diverts current away from the output node.']],
  insight:'Toggle series/shunt: one produces positive arches, while the other removes positive peaks.',problems:[
    {tag:'A / SERIES PASS',q:'A positive series silicon clipper receives a ±8 V sine. What is its output range?',steps:['The positive half passes after a 0.7 V drop.','Positive output peak ≈ 8−0.7 = 7.3 V.','Negative input reverse-biases the diode; output is 0 V there.'],answer:'0 to +7.3 V'},
    {tag:'B / SHUNT LIMIT',q:'An upper shunt silicon clipper receives a ±8 V sine. What is its output range?',steps:['Positive values above +0.7 V make the shunt diode conduct.','Output positive peak stays near +0.7 V.','The negative half follows input down to −8 V.'],answer:'−8 to +0.7 V'}]},
);

topics.splice(topics.findIndex(t=>t.id==='multiplier'),0,{
  id:'biasedclamp',group:'14 / WAVE SHAPING',title:'CLAMP TO A REFERENCE',short:'Biased clampers',source:'Lecture 6 · pp. 6–10',
  lead:'A DC reference anchors one waveform extreme above or below zero. The whole shape shifts by the same offset.',
  formula:'Vshift = Vref − Vanchored peak',points:[
    ['Find the anchored peak','First decide whether the positive or negative input extreme is clamped to the stated reference level.'],
    ['Compute the offset','Subtract the input extreme from the target level. Add that offset to every instantaneous input value.'],
    ['Preserve the span','An ideal clamper changes the DC level, not the peak-to-peak voltage. The lecture square-wave cases keep their 20 V or 40 V span.']],
  insight:'The entire square wave moves. Unlike a clipper, neither high nor low plateau is chopped away.',problems:[
    {tag:'A / UPPER ANCHOR',q:'A ±10 V square wave has its +10 V peak clamped at +2 V. Find the full output range.',steps:['Required shift = +2−(+10) = −8 V.','High level: +10−8 = +2 V. Low level: −10−8 = −18 V.','Vpp remains 20 V, agreeing with the lecture’s 8 V capacitor-shift example.'],answer:'−18 to +2 V · 20 Vpp'},
    {tag:'B / LOWER ANCHOR',q:'A ±20 V square wave has its −20 V peak clamped at +5 V. Find the full output range.',steps:['Required shift = +5−(−20) = +25 V.','Low level: −20+25 = +5 V. High level: +20+25 = +45 V.','Vpp remains 40 V.'],answer:'+5 to +45 V · 40 Vpp'}]},
);

topics.splice(topics.findIndex(t=>t.id==='clamper'),0,{
  id:'seriesbias',group:'12 / WAVE SHAPING',title:'PASS ONLY ABOVE THE BIAS',short:'Biased series clipper',source:'Clippers handout · p. 6',
  lead:'An opposing DC source and a series diode create a turn-on level before the load receives any voltage.',
  formula:'vₒ ≈ max(0, vᵢ − Vbias − Vᴅ)',points:[
    ['Find the threshold','The input must overcome the opposing 3 V source before an ideal diode can conduct. A practical silicon diode also needs about 0.7 V.'],
    ['Test each instant','Below threshold, the diode is OFF and the load output is 0 V. Above threshold, subtract both drops from the input.'],
    ['Draw the new arch','Only the top portion of each positive half-wave remains. The negative half is zero. Ideal peak is 7 V; practical peak is 6.3 V for the lecture’s ±10 V, 3 V-bias example.']],
  insight:'Toggle ideal versus silicon: the onset moves right and the positive crest drops from 7 V to 6.3 V.',problems:[
    {tag:'A / IDEAL DIODE',q:'A ±10 V sine drives a positive series clipper with a 3 V opposing bias and an ideal diode. Find the output peak.',steps:['Conduction begins when vᵢ > 3 V.','During conduction vₒ = vᵢ−3 V; otherwise vₒ = 0.','At the +10 V input crest, output peak = 10−3 = 7 V.'],answer:'0 to +7 V'},
    {tag:'B / SILICON DIODE',q:'Repeat with a practical silicon diode (0.7 V model). Find threshold and output peak.',steps:['Conduction begins when vᵢ > 3+0.7 = 3.7 V.','During conduction vₒ ≈ vᵢ−3−0.7.','At the +10 V crest, output peak = 10−3.7 = 6.3 V.'],answer:'3.7 V threshold · 0 to +6.3 V'}]},
);

const slides = [{kind:'opening',short:'Opening',title:'Circuits, made visible'}, ...topics.flatMap(topic => [
  {kind:'lesson',topic,short:topic.short,title:topic.title},
  {kind:'practice',topic,problemIndex:0,short:`${topic.short} · A`,title:`Worked problem A: ${topic.short}`},
  {kind:'practice',topic,problemIndex:1,short:`${topic.short} · B`,title:`Worked problem B: ${topic.short}`},
]), {kind:'quiz',short:'Final check',title:'Prove the model'}];

const finalQuiz = [
  {topic:'Ohm',q:'12 V across 2 kΩ: what current flows?',options:['0.6 mA','6 mA','60 mA'],correct:1,why:'12/2000 = 0.006 A = 6 mA.'},
  {topic:'Series',q:'20 V across 4 Ω + 6 Ω: drop across 6 Ω?',options:['8 V','12 V','20 V'],correct:1,why:'Total I = 20/10 = 2 A; V₆ = 2×6 = 12 V.'},
  {topic:'Parallel',q:'12 V across 6 Ω ∥ 3 Ω: total current?',options:['2 A','4 A','6 A'],correct:2,why:'Branch currents are 2 A and 4 A; KCL gives 6 A.'},
  {topic:'Diode',q:'Forward Si diode receives 0.5 V. Approximate state?',options:['ON','OFF','Short'],correct:1,why:'0.5 V is below the assumed 0.7 V threshold.'},
  {topic:'Load line',q:'At Iᴅ = 0, E = 5 V load line crosses Vᴅ axis at…',options:['0 V','0.7 V','5 V'],correct:2,why:'KVL gives Vᴅ = E when Iᴅ = 0.'},
  {topic:'Half-wave',q:'A 50 Hz half-wave rectifier has pulses at…',options:['25 Hz','50 Hz','100 Hz'],correct:1,why:'One output pulse per input period.'},
  {topic:'Bridge',q:'17 V peak into Si bridge: output peak?',options:['17 V','16.3 V','15.6 V'],correct:2,why:'Two diode drops: 17−1.4 = 15.6 V.'},
  {topic:'Filter',q:'Double C; keep all else fixed. Ripple approximately…',options:['Doubles','Halves','Unchanged'],correct:1,why:'The small-ripple estimate is inversely proportional to C.'},
  {topic:'Clipper',q:'Upper clip at +4.7 V receives −10 V. Output?',options:['−10 V','0 V','+4.7 V'],correct:0,why:'Only values above +4.7 V are clipped.'},
  {topic:'Series clip',q:'Positive series Si clipper receives −8 V. Load output?',options:['−8 V','0 V','+0.7 V'],correct:1,why:'Negative input reverse-biases the series diode, opening the load path.'},
  {topic:'Bias',q:'±10 V with a 3 V opposing series bias and Si diode: peak output?',options:['7 V','6.3 V','3.7 V'],correct:1,why:'Input crest minus bias and diode drop: 10−3−0.7 = 6.3 V.'},
  {topic:'Clamper',q:'Ideal positive clamp of ±10 V gives…',options:['−10…+10 V','0…+20 V','−20…0 V'],correct:1,why:'Add +10 V to each sample; preserve 20 Vpp.'},
  {topic:'Biased clamp',q:'±10 V input; positive peak anchored at +2 V. Output low level?',options:['−18 V','−8 V','+2 V'],correct:0,why:'Shift = 2−10 = −8 V, so low = −10−8 = −18 V.'},
  {topic:'Multiplier',q:'Ideal two-stage multiplier at 30 V peak?',options:['30 V','45 V','60 V'],correct:2,why:'Two peak-sized voltages combine.'},
];
