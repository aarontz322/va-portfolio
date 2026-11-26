"use strict";

const views = {
  front: {
    file: "front.webp",
    alt: "Front view of The Cara in COLOR with the cream scarf tied to its handle.",
    caption: "The front silhouette",
  },
  lock: {
    file: "turn-lock.webp",
    alt: "The brushed gold turn lock and gold VERANE stamp on COLOR pebbled leather.",
    caption: "The turn lock and foil stamp",
  },
  carried: {
    file: "carried.webp",
    alt: "The Cara in COLOR hanging from the crook of an arm, with the cream scarf over the flap.",
    caption: "Carried on the forearm",
  },
};
const viewButtons = document.querySelectorAll("[data-view]");
const photo = document.querySelector("#gallery-photo");
const caption = document.querySelector("#gallery-caption");
const colors = { cognac: "Cognac", ink: "Ink Black", oxblood: "Oxblood", ivory: "Ivory" };
const colorInputs = document.querySelectorAll('input[name="color"]');
let currentColor = "cognac";
let currentView = "front";

function asset(name, color) {
  const suffix = color === "cognac" ? "" : "-" + color;
  return "/work/verane/assets/" + views[name].file.replace(".webp", suffix + ".webp");
}
function selectView(name) {
  currentView = name;
  const view = views[name];
  photo.alt = view.alt.replace("COLOR", colors[currentColor]);
  photo.src = asset(name, currentColor);
  caption.textContent = view.caption + " · " + colors[currentColor];
  for (const button of viewButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.view === name));
  }
}
function selectColor(color) {
  currentColor = color;
  document.querySelector("#selected-color").textContent = colors[color];
  document.querySelector("#body-material").textContent = "Pebbled leather in " + colors[color];
  for (const input of colorInputs) input.checked = input.value === color;
  for (const button of viewButtons) {
    button.querySelector("img").src = asset(button.dataset.view, color);
  }
  selectView(currentView);
}
for (const input of colorInputs) {
  input.addEventListener("change", () => selectColor(input.value));
}
selectColor(document.querySelector('input[name="color"]:checked').value);
for (const button of viewButtons) {
  button.addEventListener("click", () => selectView(button.dataset.view));
}
document.querySelector("[data-select-view]").addEventListener("click", (event) => {
  selectColor("cognac");
  selectView(event.currentTarget.dataset.selectView);
});
document.querySelector("#see-carried").addEventListener("click", () => {
  selectView("carried");
});

const dialog = document.querySelector("#bag");
const empty = document.querySelector("#empty-bag");
const items = document.querySelector("#bag-items");
const template = document.querySelector("#bag-row");
const status = document.querySelector("#bag-status");
const close = document.querySelector("#close-bag");
const bagKey = "verane.cara.colors.v2";
const oldKey = "verane.cara.quantity.v1";
const bag = Object.fromEntries(Object.keys(colors).map(color => [color, 0]));
const unitPrice = Number(document.querySelector("#unit-price").value);
const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});
const subtotal = document.querySelector("#subtotal");
const subtotalAmount = document.querySelector("#subtotal-amount");

function parseQuantity(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : 0;
}
function readBag() {
  try {
    const saved = localStorage.getItem(bagKey);
    const data = saved ? JSON.parse(saved) : { cognac: localStorage.getItem(oldKey) };
    for (const key of Object.keys(colors)) bag[key] = parseQuantity(data?.[key]);
  } catch { /* Keep the in-memory bag when browser storage is unavailable. */ }
}
function renderBag() {
  const count = Object.values(bag).reduce((sum, value) => sum + value, 0);
  document.querySelector("[data-count]").textContent = count;
  empty.hidden = count > 0;
  subtotal.hidden = count === 0;
  subtotalAmount.textContent = currency.format(unitPrice * count);
  const rows = document.createDocumentFragment();
  for (const [color, name] of Object.entries(colors)) {
    if (!bag[color]) continue;
    const row = template.content.firstElementChild.cloneNode(true);
    row.dataset.color = color;
    row.querySelector("img").src = asset("front", color);
    row.querySelector("select").value = color;
    row.querySelector("select").setAttribute("aria-label", "Change color for The Cara in " + name);
    row.querySelector(".quantity").setAttribute("aria-label", name + " quantity");
    row.querySelector("output").value = String(bag[color]);
    row.querySelector("[data-unit-cost]").textContent = currency.format(unitPrice);
    row.querySelector("[data-line-cost]").textContent = currency.format(unitPrice * bag[color]);
    rows.append(row);
  }
  items.replaceChildren(rows);
}
function saveBag(message, focusColor, action) {
  try {
    localStorage.setItem(bagKey, JSON.stringify(bag));
    localStorage.removeItem(oldKey);
  } catch { /* The bag remains available during this visit. */ }
  renderBag();
  status.textContent = subtotal.hidden ? "Your bag is empty." : message + " Subtotal " + subtotalAmount.textContent + ".";
  if (dialog.open && action) {
    const next = items.querySelector('[data-color="' + focusColor + '"] [data-action="' + action + '"]');
    (next || items.querySelector("select") || close).focus();
  }
}
readBag();
renderBag();
window.addEventListener("storage", (event) => {
  if (event.key === bagKey || event.key === oldKey || event.key === null) {
    readBag();
    renderBag();
    if (dialog.open && !dialog.contains(document.activeElement)) close.focus();
  }
});
document.querySelector("#add-bag").addEventListener("click", () => {
  readBag();
  bag[currentColor] += 1;
  saveBag(colors[currentColor] + " added to your bag.");
  dialog.showModal();
});
document.querySelector("#open-bag").addEventListener("click", () => dialog.showModal());
close.addEventListener("click", () => dialog.close());
document.querySelector("#continue").addEventListener("click", () => dialog.close());
items.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const color = button.closest(".bag-item").dataset.color;
  const action = button.dataset.action;
  readBag();
  if (action === "more") bag[color] += 1;
  if (action === "less") bag[color] = Math.max(0, bag[color] - 1);
  if (action === "remove") bag[color] = 0;
  saveBag(colors[color] + " quantity " + bag[color] + ".", color, action);
});
items.addEventListener("change", (event) => {
  const select = event.target.closest("select");
  if (!select) return;
  const from = select.closest(".bag-item").dataset.color;
  const to = select.value;
  if (from === to || !Object.hasOwn(colors, to)) return;
  readBag();
  bag[to] += bag[from];
  bag[from] = 0;
  saveBag("Updated to " + colors[to] + ". Quantity " + bag[to] + ".", to, "color");
});
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

const film = document.querySelector("#film");
const comparison = document.querySelector("#comparison");
const comparisonFilm = document.querySelector("#comparison-film");
document.querySelector("#open-comparison").addEventListener("click", (event) => {
  if (typeof comparison.showModal !== "function") return;
  event.preventDefault();
  film.pause();
  comparison.showModal();
  comparisonFilm.play().catch(() => { /* Visitors can also use native controls. */ });
});
comparison.querySelector(".close").addEventListener("click", () => comparison.close());
comparison.addEventListener("close", () => comparisonFilm.pause());
for (const button of document.querySelectorAll("[data-time]")) {
  button.addEventListener("click", () => {
    film.currentTime = Number(button.dataset.time);
    film.scrollIntoView({ block: "center", behavior: "instant" });
    film.focus({ preventScroll: true });
    film.play().catch(() => { /* Native playback controls remain available. */ });
  });
}
