# Circuits, made visible

An English-language interactive teaching deck for the IEEE Zewail City Student Branch Education Team.

## Present it

Open `index.html` directly, or run `npm run dev` and visit <http://localhost:4176/>. Use the arrow keys, footer arrows, or **Index** to move between slides. Click the highlighted controls inside each diagram to compare circuit states and waveform transformations. Each worked problem has a **Reveal the working** button so the class can attempt it first.

The deck has 47 slides: one opening slide, 15 topic explanations, 30 individually worked problems, and a final 14-question concept check.

## Topic order

1. Current, voltage, resistance, closed paths, Ohm's law
2. Series networks, voltage division, KVL
3. Parallel networks, current division, KCL
4. Silicon diode ON/OFF model
5. Diode load line and operating point
6. Half-wave rectification
7. Bridge and center-tapped full-wave rectification
8. Capacitor smoothing and ripple
9. Ideal and practical clipping
10. Series and shunt clipper paths
11. Biased clipping
12. Biased series clipping from the handout
13. Positive and negative clampers
14. Biased clampers and reference levels
15. Two-stage voltage multiplication

The source material is the five lecture PDFs supplied for the course. Administrative, syllabus, and project-only pages were omitted so the deck focuses on circuit reasoning and numerical problems.

## Model notes

- Diode examples use the lecture's approximate silicon drop of 0.7 V. Actual diode behavior is gradual.
- Rectifier average values and capacitor ripple values use the lecture approximations. Waveform plots show the piecewise diode threshold and an animated charge/discharge model; small differences from the arithmetic estimates are expected.
- The load-line Q-point is the intersection with the 0.7 V *model*, not a measured diode characteristic.
- The multiplier panel is a voltage-addition explanation, not a wiring schematic. Diode loss and load current lower practical output.

The logo and fonts are stored locally. Once downloaded, the deck needs no external network connection.
