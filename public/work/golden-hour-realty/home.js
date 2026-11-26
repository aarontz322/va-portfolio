
"use strict";

const city = document.getElementById("city");
const bedrooms = document.getElementById("bedrooms");
const clear = document.getElementById("clear-filters");
const cards = [...document.querySelectorAll(".home-card")];

function filterHomes() {
  let visible = 0;
  for (const card of cards) {
    const matchesCity = !city.value || card.dataset.city === city.value;
    const hasBedrooms = Number(card.dataset.beds) >= Number(bedrooms.value);
    card.hidden = !(matchesCity && hasBedrooms);
    if (!card.hidden) visible += 1;
  }
  document.getElementById("listing-count").textContent = visible + (visible === 1 ? " home" : " homes");
  document.getElementById("no-homes").hidden = visible > 0;
  clear.hidden = !city.value && bedrooms.value === "0";
}
city.addEventListener("change", filterHomes);
bedrooms.addEventListener("change", filterHomes);
clear.addEventListener("click", () => {
  city.value = "";
  bedrooms.value = "0";
  filterHomes();
  city.focus();
});
window.addEventListener("pageshow", filterHomes);

const tourForm = document.getElementById("tour-form");
const tourHome = document.getElementById("tour-home");
const tourResult = document.getElementById("tour-result");
const tourSummary = document.getElementById("tour-summary");
const tourStatus = document.getElementById("tour-status");
const requestedListing = new URLSearchParams(location.search).get("home");
if ([...tourHome.options].some(option => option.value === requestedListing)) {
  tourHome.value = requestedListing;
}
function hidePreview() {
  tourResult.hidden = true;
  tourStatus.textContent = "";
}
tourForm.addEventListener("input", hidePreview);
tourForm.addEventListener("change", hidePreview);
tourForm.addEventListener("submit", event => {
  event.preventDefault();
  const values = new FormData(tourForm);
  const homeName = tourHome.selectedOptions[0].textContent;
  const lines = [homeName, values.get("day") + " · " + values.get("time")];
  if (values.get("question").trim()) lines.push("Question: " + values.get("question").trim());
  tourSummary.textContent = lines.join("\n");
  document.getElementById("tour-field-sheet").href = "/work/golden-hour-realty/showing-guide.html?home=" + encodeURIComponent(tourHome.value) + "#notes";
  tourResult.hidden = false;
  tourStatus.textContent = "";
});
document.getElementById("download-tour").addEventListener("click", () => {
  SiteFile.save("golden-hour-realty-tour-request.txt", "GOLDEN HOUR REALTY / TOUR REQUEST\n\n" + tourSummary.textContent + "\n\nDemo request prepared on this device.");
  tourStatus.textContent = "Your tour request is ready to save.";
});
tourForm.hidden = false;

const film = document.getElementById("property-film");
document.querySelector(".film-trigger").addEventListener("click", () => {
  film.focus({ preventScroll: true });
  // Native controls remain available if the browser requires a second gesture.
  film.play().catch(() => {});
});
document.getElementById("view-glass-house").addEventListener("click", () => {
  tourHome.value = "glass-house";
  hidePreview();
});
