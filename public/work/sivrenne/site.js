"use strict";

const film = document.getElementById("fold-film");
const soundButton = document.querySelector("[data-film-sound]");
if (film && soundButton) {
  soundButton.hidden = false;
  soundButton.addEventListener("click", async () => {
    film.muted = false;
    if (film.volume === 0) film.volume = 1;
    if (film.ended) film.currentTime = 0;
    try {
      await film.play();
    } catch {
      film.focus();
    }
  });
}

const collection = {
  pendant: {
    name: "Fold Pendant",
    price: 145,
  },
  cuff: {
    name: "Fold Cuff",
    price: 185,
  },
  studs: {
    name: "Fold Studs",
    price: 95,
  },
};
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const looks = {
  crew: {
    alt: "The Fold Pendant resting over a midnight indigo crew neck.",
    note: "The dark knit gives the pendant a solid backdrop and leaves its outline easy to see.",
  },
  vneck: {
    alt: "The Fold Pendant framed by the two sides of an indigo V neck.",
    note: "The V draws the eye down the chain. A little space between the pendant and the point of the neckline keeps the two shapes distinct.",
  },
  collar: {
    alt: "The Fold Pendant worn inside the open collar of a white shirt.",
    note: "The open collar makes a soft frame. Leave the pendant inside the shirt opening so the tips of the collar sit to either side.",
  },
};

const lookPhoto = document.querySelector("#look-photo");
if (lookPhoto) {
  function showLook(key) {
    lookPhoto.src = "/work/sivrenne/assets/" + key + ".webp";
    lookPhoto.alt = looks[key].alt;
    document.querySelector("#look-note").textContent = looks[key].note;
  }
  for (const input of document.querySelectorAll('input[name="look"]')) {
    input.addEventListener("change", () => showLook(input.value));
  }
  showLook(document.querySelector('input[name="look"]:checked').value);
}

const bag = document.createElement("dialog");
bag.className = "bag";
bag.setAttribute("aria-labelledby", "bag-title");
bag.innerHTML = `
  <div class="bag-header"><h2 id="bag-title">Your bag</h2><button type="button" class="close-icon" aria-label="Close bag" autofocus>×</button></div>
  <p class="bag-empty">Your bag is empty.</p><div class="bag-items"></div>
  <template id="row-template"><article class="bag-row"><img alt="" width="80" height="88"><div>
    <h3></h3><p data-unit-price></p>
    <div class="quantity" role="group"><button data-action="less" aria-label="Decrease quantity">−</button><output aria-label="Quantity"></output><button data-action="more" aria-label="Increase quantity">+</button></div>
    <p class="line-total">Line total <strong data-line-total></strong></p>
    <button class="remove" data-action="remove">Remove</button>
  </div></article></template>
  <p class="sr-only" role="status"></p>
  <div class="bag-end"><p class="subtotal" hidden><span>Subtotal <small>USD</small></span><strong id="bag-subtotal">$0</strong></p><p>Demo prices. No orders or payments are taken.</p><button type="button" class="solid" data-continue>Continue browsing <span aria-hidden="true">→</span></button></div>`;
document.body.append(bag);
const key = "sivrenne.fold.bag.v1";
const rows = bag.querySelector(".bag-items");
const template = bag.querySelector("template");
let quantities = {};
let storageEnabled = true;
function loadBag() {
  if (!storageEnabled) return;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    quantities = {};
    for (const id of Object.keys(collection)) {
      if (Number.isSafeInteger(saved?.[id]) && saved[id] > 0) quantities[id] = saved[id];
    }
  } catch { /* Keep a working bag if browser storage is restricted. */ }
}
function renderBag() {
  const fragment = document.createDocumentFragment();
  let count = 0;
  let subtotal = 0;
  for (const [id, piece] of Object.entries(collection)) {
    const quantity = quantities[id] || 0;
    if (!quantity) continue;
    const lineTotal = piece.price * quantity;
    count += quantity;
    subtotal += lineTotal;
    const row = template.content.firstElementChild.cloneNode(true);
    row.dataset.piece = id;
    row.querySelector("img").src = "/work/sivrenne/assets/" + id + ".webp";
    row.querySelector("h3").textContent = piece.name;
    row.querySelector(".quantity").setAttribute("aria-label", piece.name + " quantity");
    row.querySelector("output").value = String(quantity);
    row.querySelector("[data-unit-price]").textContent = usd.format(piece.price) + (id === "studs" ? " per pair" : " each");
    row.querySelector("[data-line-total]").textContent = usd.format(lineTotal);
    fragment.append(row);
  }
  rows.replaceChildren(fragment);
  document.querySelector("[data-count]").textContent = count;
  bag.querySelector(".bag-empty").hidden = count > 0;
  bag.querySelector(".subtotal").hidden = count === 0;
  bag.querySelector("#bag-subtotal").textContent = usd.format(subtotal);
}
function changeBag(id, action) {
  loadBag();
  const current = quantities[id] || 0;
  if (action === "less") quantities[id] = Math.max(0, current - 1);
  if (action === "more") quantities[id] = current + 1;
  if (action === "remove") delete quantities[id];
  if (storageEnabled) {
    try { localStorage.setItem(key, JSON.stringify(quantities)); }
    catch { storageEnabled = false; }
  }
  renderBag();
  bag.querySelector("[role=status]").textContent = collection[id].name + " quantity " + (quantities[id] || 0)
    + ". Bag subtotal " + bag.querySelector("#bag-subtotal").textContent + ".";
}
function refreshBag() {
  loadBag();
  renderBag();
}
function showBag() {
  refreshBag();
  bag.showModal();
}
refreshBag();
window.addEventListener("pageshow", refreshBag);
window.addEventListener("storage", (event) => {
  if (event.key !== key && event.key !== null) return;
  refreshBag();
  if (bag.open && !bag.contains(document.activeElement)) bag.querySelector(".close-icon").focus();
});
document.querySelector(".bag-open").addEventListener("click", showBag);
bag.querySelector(".close-icon").addEventListener("click", () => bag.close());
bag.querySelector("[data-continue]").addEventListener("click", () => bag.close());
rows.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const id = target.closest(".bag-row").dataset.piece;
  changeBag(id, target.dataset.action);
  const next = rows.querySelector('[data-piece="' + id + '"] [data-action="' + target.dataset.action + '"]');
  (next || rows.querySelector("button") || bag.querySelector(".close-icon")).focus();
});

const piecePhoto = document.querySelector("#piece-photo");
if (piecePhoto) {
  const id = document.querySelector("main[data-piece]").dataset.piece;
  const piece = collection[id];
  document.querySelector("#add").addEventListener("click", () => {
    changeBag(id, "more");
    bag.showModal();
  });
  const lightbox = document.querySelector("#lightbox");
  const zoom = document.querySelector("#zoom");
  const caption = document.querySelector("#photo-caption");
  const views = document.querySelector(".photo-views");
  const buttons = views.querySelectorAll("[data-photo-view]");
  views.hidden = false;
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const worn = button.dataset.photoView === "worn";
      piecePhoto.src = "/work/sivrenne/assets/" + id + (worn ? "-worn" : "") + ".webp";
      piecePhoto.alt = button.dataset.alt;
      caption.textContent = button.dataset.caption;
      for (const choice of buttons) choice.setAttribute("aria-pressed", String(choice === button));
      zoom.setAttribute("aria-label", "Enlarge " + piece.name + (worn ? " on the model" : " product photograph"));
    });
  }
  zoom.addEventListener("click", () => {
    const selected = views.querySelector('[aria-pressed="true"]');
    document.querySelector("#zoom-title").textContent = piece.name + " · " + selected.textContent;
    document.querySelector("#zoom-image").src = piecePhoto.src;
    document.querySelector("#zoom-image").alt = piecePhoto.alt;
    lightbox.showModal();
  });
  lightbox.querySelector(".close-icon").addEventListener("click", () => lightbox.close());
}
for (const dialog of document.querySelectorAll("dialog")) {
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
}
