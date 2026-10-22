
const designs = [
  { name: 'Paris', art: '<path d="M32 76h36M36 71h28M44 51h12M48 22h4l3 29 10 25H35l10-25zM41 63h18M49 13v9M43 76l7-13 7 13"/><text x="50" y="91" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="9" letter-spacing="2">PARIS</text>' },
  { name: 'New York', art: '<circle cx="50" cy="50" r="39"/><circle cx="50" cy="50" r="34"/><path d="M30 69V46h11v23m0 0V34h17v35m0 0V43h12v26M25 69h50M49 22v12M45 29h9M46 42h7m-7 7h7m-7 7h7"/><text x="50" y="82" text-anchor="middle" stroke="none" fill="currentColor" font-size="7" letter-spacing="1">NEW YORK</text>' },
  { name: 'London', art: '<circle cx="50" cy="48" r="36"/><path d="M37 75V34h26v41M34 34h32L50 16zM46 16v-6M34 75h32M43 59h14M43 65h14"/><circle cx="50" cy="44" r="8"/><path d="M50 38v6l4 3"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">LONDON</text>' },
  { name: 'Seoul', art: '<path d="M16 73h68M23 70V54h54v16M32 53V36h36v17M20 54q30-16 60 0M26 36q24-12 48 0M14 52l6 2M80 54l6-2M22 34l5 2M73 36l5-2M38 70V58h9v12M53 70V58h9v12"/><circle cx="50" cy="20" r="6"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">SEOUL</text>' },
  { name: 'Tokyo', art: '<circle cx="50" cy="44" r="34"/><path d="M26 37h48M29 43h42M35 37v35M65 37v35M25 31q25 8 50 0M30 53h40M46 37v16M54 37v16"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">TOKYO</text>' },
  { name: 'Copenhagen', art: '<path d="M12 69h76M16 66V43l9-12 9 12v23M34 66V35l10-9 10 9v31M54 66V42l10-11 10 11v24M74 66V46l9-9 7 9v20M22 47h5m-5 8h5M41 39h6m-6 9h6m-6 9h6M61 47h5m-5 8h5M12 76q8-6 16 0t16 0 16 0 16 0 16 0"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">COPENHAGEN</text>' },
  { name: 'Rome', art: '<ellipse cx="50" cy="31" rx="33" ry="12"/><path d="M17 31v34q33 19 66 0V31M17 45q33 19 66 0M17 57q33 19 66 0M27 42v10m12-7v11m13-10v11m13-12v11m10-14v10M27 57v10m12-6v11m13-10v12m13-13v11m10-15v10"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">ROME</text>' },
  { name: 'Sydney', art: '<path d="M12 72h76M17 66h66M22 65L14 44q21-1 30 21M40 65L29 24q29 6 35 41M57 65l5-33q21 9 20 33M13 79q7-6 14 0t14 0 14 0 14 0 14 0"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">SYDNEY</text>' },
  { name: 'Amsterdam', art: '<path d="M17 68V40h21v28M38 68V32h24v36M62 68V43h21v25M15 40l13-16 12 16M36 32l8-7v-6h12v6l8 7M60 43l13-15 12 15M23 47h8m-8 9h8m15-16h8m-8 10h8m-8 10h8m16-10h6m-6 9h6M12 74q38-8 76 0M12 80q38-8 76 0"/><text x="50" y="93" text-anchor="middle" stroke="none" fill="currentColor" font-family="Georgia" font-size="7" letter-spacing="1">AMSTERDAM</text>' }
];
const garden = document.getElementById('garden');
const stamps = document.getElementById('stamps');
const choices = document.getElementById('choices');
const undoButton = document.getElementById('undo');
const clearButton = document.getElementById('clear');
let selectedStamp = 0;

function stampSVG(art, gold) {
  const foil = '<defs><linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#92621e"/><stop offset=".25" stop-color="#ffe4a1"/><stop offset=".48" stop-color="#c5933d"/><stop offset=".7" stop-color="#f8d989"/><stop offset="1" stop-color="#ae7729"/></linearGradient></defs>';
  return '<svg viewBox="0 0 100 100" aria-hidden="true" style="color:#e4b85e">' + (gold ? foil : '') + art + '</svg>';
}
// Create and append a button for each design.
designs.forEach(function (design, index) {
  const button = document.createElement('button');
  button.innerHTML = stampSVG(design.art, false);
  const label = document.createElement('span');
  label.className = 'choice-name';
  label.textContent = design.name;
  button.appendChild(label);
  button.setAttribute('aria-label', design.name);
  button.title = design.name;
  button.setAttribute('aria-pressed', index === selectedStamp);
  button.addEventListener('click', function () {
    selectedStamp = index;
    choices.querySelectorAll('button').forEach(function (choice, i) {
      choice.setAttribute('aria-pressed', i === index);
    });
  });
  choices.appendChild(button);
});
function updateCount() {
  const count = stamps.children.length;
  document.getElementById('count').textContent = String(count).padStart(3, '0');
  document.getElementById('hint').classList.toggle('hidden', count > 0);
  undoButton.disabled = count === 0;
  clearButton.disabled = count === 0;
}
// Listen for a click, then find the mouse coordinates INSIDE the passport.
garden.addEventListener('click', function (event) {
  const bounds = garden.getBoundingClientRect();
  const mouseX = event.clientX - bounds.left;
  const mouseY = event.clientY - bounds.top;
  const stamp = document.createElement('div');
  stamp.classList.add('stamp');
  stamp.setAttribute('role', 'img');
  stamp.setAttribute('aria-label', designs[selectedStamp].name + ' gold stamp');
  stamp.innerHTML = stampSVG(designs[selectedStamp].art, true);
  // Percentages preserve each stamp's position when the window changes size.
  stamp.style.left = (mouseX / bounds.width * 100) + '%';
  stamp.style.top = (mouseY / bounds.height * 100) + '%';
  stamp.style.width = '110px';
  stamp.style.setProperty('--angle', '-12deg');
  stamps.appendChild(stamp);
  updateCount();
});

clearButton.addEventListener('click', function () {
  stamps.replaceChildren();
  updateCount();
});
updateCount();
