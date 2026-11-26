
"use strict";

const slideTrack = document.getElementById("guide-slides");
const previousSlide = document.getElementById("previous-slide");
const nextSlide = document.getElementById("next-slide");
const slidePosition = document.getElementById("slide-position");
const slideCount = slideTrack.children.length;

function currentSlideIndex() {
  return Math.max(0, Math.min(slideCount - 1, Math.round(slideTrack.scrollLeft / slideTrack.clientWidth)));
}

function syncSlideControls() {
  const index = currentSlideIndex();
  previousSlide.setAttribute("aria-disabled", String(index === 0));
  nextSlide.setAttribute("aria-disabled", String(index === slideCount - 1));
  const position = "Slide " + (index + 1) + " of " + slideCount;
  if (slidePosition.textContent !== position) slidePosition.textContent = position;
}

function moveSlide(offset) {
  const index = currentSlideIndex() + offset;
  if (index < 0 || index >= slideCount) return;
  slideTrack.scrollLeft = index * slideTrack.clientWidth;
}

previousSlide.addEventListener("click", () => moveSlide(-1));
nextSlide.addEventListener("click", () => moveSlide(1));
slideTrack.addEventListener("keydown", event => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  moveSlide(event.key === "ArrowLeft" ? -1 : 1);
});
slideTrack.addEventListener("scroll", syncSlideControls, {passive: true});
window.addEventListener("resize", syncSlideControls);
document.querySelector(".slide-controls").hidden = false;
syncSlideControls();

const guidePhoto = document.getElementById("guide-photo");
for (const item of document.querySelectorAll(".questions details")) {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    guidePhoto.src = "/work/golden-hour-realty/assets/" + item.dataset.file + ".webp";
    guidePhoto.alt = item.dataset.alt;
    document.getElementById("guide-caption").textContent = item.dataset.caption;
  });
}

const form = document.getElementById("note-form");
const nickname = document.getElementById("property");
const homeNames = new Map([
  ["glass-house", "The Glass House"],
  [
    "maple-porch-bungalow",
    "Maple Porch Bungalow"
  ],
  [
    "grove-brick-ranch",
    "Grove Brick Ranch"
  ],
  [
    "bluebird-townhouse",
    "Bluebird Townhouse"
  ]
]);
const prefill = new URLSearchParams(location.search).get("home");
if (homeNames.has(prefill)) {
  nickname.value = homeNames.get(prefill);
  document.querySelector(".nav-tour").href = "/work/golden-hour-realty?home=" + encodeURIComponent(prefill) + "#tour";
}

function fieldSheet() {
  return [...form.querySelectorAll("textarea")].map(field => ({
    question: field.dataset.question,
    answer: field.value.trim()
  }));
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const sections = fieldSheet().map(({question,answer},index) =>
    (index + 1) + ". " + question + "\n" + (answer || "________________________"));
  SiteFile.save("golden-hour-realty-field-sheet.txt",
    ["GOLDEN HOUR REALTY", nickname.value.trim() || "Home showing", ...sections].join("\n\n"));
  document.getElementById("note-status").textContent = "Your field sheet is ready to save.";
});

function renderPrintSheet() {
  const sheet = document.getElementById("print-sheet");
  sheet.replaceChildren();
  const title = document.createElement("h1");
  title.textContent = "Golden Hour Realty · Showing field sheet";
  const home = document.createElement("p");
  home.textContent = "Home: " + (nickname.value.trim() || "________________________");
  sheet.append(title,home);
  for (const [index,entry] of fieldSheet().entries()) {
    const section = document.createElement("section");
    const question = document.createElement("h2");
    question.textContent = (index + 1) + ". " + entry.question;
    const answer = document.createElement("p");
    answer.textContent = entry.answer;
    section.append(question,answer);
    sheet.append(section);
  }
}
window.addEventListener("beforeprint", renderPrintSheet);
document.getElementById("print-notes").addEventListener("click", () => {
  renderPrintSheet();
  window.print();
});
