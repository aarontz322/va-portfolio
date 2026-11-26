"use strict";

const byId = (id) => document.getElementById(id);
const photos = {
  bottle: { caption: "The bottle", alt: "Golden Drop Serum in a labeled amber glass bottle on travertine, framed by palm shadows" },
  texture: { caption: "The texture", alt: "Golden serum spread on a glass plate, with the labeled bottle and dropper behind it" },
  "in-hand": { caption: "In hand", alt: "The campaign presenter holding the AMBERLUNE bottle and lifting the glass dropper" }
};
const photoButtons = document.querySelectorAll(".view");
for (const button of photoButtons) {
  button.addEventListener("click", () => {
    const key = button.dataset.view;
    const mainPhoto = byId("product-image");
    mainPhoto.src = "/work/amberlune/assets/" + key + ".webp";
    mainPhoto.alt = photos[key].alt;
    mainPhoto.dataset.current = key;
    byId("photo-caption").textContent = photos[key].caption;
    for (const item of photoButtons) item.setAttribute("aria-pressed", String(item === button));
  });
}

const player = byId("campaign");
const sizeDialog = byId("size-dialog");
const sizeFilm = byId("size-film");
byId("size-check").addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof sizeDialog.showModal !== "function") return;
  event.preventDefault();
  player.pause();
  sizeDialog.showModal();
  sizeFilm.play().catch(() => { /* The native controls remain available. */ });
});
sizeDialog.addEventListener("close", () => sizeFilm.pause());
const chapters = Array.from(document.querySelectorAll(".chapters button"));
let requestedTime = null;
function startFilm(time) {
  requestedTime = time;
  if (player.readyState >= HTMLMediaElement.HAVE_METADATA) seekToRequest();
  player.play().catch(() => {
    // The native player remains available if playback requires another gesture.
  });
}
function seekToRequest() {
  if (requestedTime === null) return;
  player.currentTime = requestedTime;
  requestedTime = null;
}
function markChapter() {
  let active;
  if (!player.paused && !player.ended) {
    active = chapters.filter((button) => Number(button.dataset.time) <= player.currentTime).pop();
  }
  for (const button of chapters) button.toggleAttribute("data-active", button === active);
}
player.addEventListener("loadedmetadata", seekToRequest);
for (const event of ["timeupdate", "play", "pause", "ended"]) player.addEventListener(event, markChapter);
byId("watch-film").addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  startFilm(Number(event.currentTarget.hash.slice(3)));
  player.focus({preventScroll: true});
  player.scrollIntoView({block: "center"});
});
for (const button of chapters) {
  button.addEventListener("click", () => {
    startFilm(Number(button.dataset.time));
    if (window.matchMedia("(max-width: 680px)").matches) player.scrollIntoView({ block: "center" });
  });
}

const cartKey = "amberlune:golden-drop:bag:v1";
const unitPrice = 38;
const maximum = 99;
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const bag = byId("bag");
let quantity = 1;

function readCount(raw) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= maximum ? n : 0;
}
function storedCount() {
  try { return readCount(localStorage.getItem(cartKey)); }
  catch { return 0; }
}
let count = storedCount();

function render() {
  const available = maximum - count;
  quantity = Math.min(quantity, Math.max(1, available));
  byId("qty").textContent = String(quantity);
  byId("qty-less").disabled = quantity <= 1 || !available;
  byId("qty-more").disabled = quantity >= available;
  byId("add-bag").disabled = !available;
  byId("add-bag").textContent = available ? "Add to bag" : "Bag is full";
  byId("bag-count").textContent = String(count);
  byId("bag-qty").textContent = String(count);
  byId("bag-more").disabled = count >= maximum;
  byId("empty-bag").hidden = count !== 0;
  byId("filled-bag").hidden = count === 0;
  byId("line-total").textContent = money.format(unitPrice * count);
  byId("subtotal").textContent = money.format(unitPrice * count);
}
function syncCount(next) {
  count = next;
  byId("order-preview").hidden = true;
  byId("save-status").textContent = "";
  render();
  if (bag.open && !count) byId("back-to-serum").focus();
}
function setCount(next) {
  syncCount(Math.min(maximum, Math.max(0, next)));
  try { localStorage.setItem(cartKey, String(count)); }
  catch { /* The bag still works for this visit when storage is unavailable. */ }
}
window.addEventListener("storage", (event) => {
  if (event.key === cartKey || event.key === null) syncCount(readCount(event.newValue));
});
function openBag() {
  byId("order-preview").hidden = true;
  byId("save-status").textContent = "";
  bag.showModal();
}
byId("open-bag").addEventListener("click", openBag);
byId("close-bag").addEventListener("click", () => bag.close());
bag.addEventListener("click", (event) => {
  if (event.target !== bag) return;
  const box = bag.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX >= box.right || event.clientY < box.top || event.clientY >= box.bottom) bag.close();
});
byId("back-to-serum").addEventListener("click", () => {
  bag.close();
  byId("product").scrollIntoView({ block: "start" });
  byId("add-bag").focus({ preventScroll: true });
});

byId("qty-less").addEventListener("click", () => { quantity -= 1; render(); });
byId("qty-more").addEventListener("click", () => { quantity += 1; render(); });
byId("add-bag").addEventListener("click", () => {
  const added = quantity;
  quantity = 1;
  setCount(count + added);
  openBag();
});
byId("bag-less").addEventListener("click", () => setCount(count - 1));
byId("bag-more").addEventListener("click", () => setCount(count + 1));
byId("remove").addEventListener("click", () => setCount(0));
function summary() {
  const bottles = count === 1 ? "bottle" : "bottles";
  return count + " " + bottles + " of AMBERLUNE Golden Drop Serum, 30 mL each. Merchandise subtotal: " + money.format(count * unitPrice) + " USD.";
}
byId("preview-order").addEventListener("click", () => {
  byId("order-text").textContent = summary();
  byId("order-preview").hidden = false;
  byId("save-order").focus();
});
byId("save-order").addEventListener("click", () => {
  const body = ["AMBERLUNE | Demo order preview", "", summary(), "", "Illustrative portfolio order. No order was placed or payment taken."].join("\n");
  const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.download = "amberlune-demo-order.txt";
  link.href = url;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  byId("save-status").textContent = "Summary prepared for download.";
});
render();
