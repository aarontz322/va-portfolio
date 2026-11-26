"use strict";

const stages = [...document.querySelectorAll(".stage-list details")];
const stageImage = document.getElementById("stage-image");
const stageCaption = document.getElementById("stage-caption");
for (const stage of stages) {
  stage.addEventListener("toggle", () => {
    if (!stage.open) return;
    for (const other of stages) if (other !== stage) other.open = false;
    stageImage.src = "/work/corvane-precision/assets/" + stage.dataset.image;
    stageImage.alt = stage.dataset.alt;
    stageCaption.textContent = stage.dataset.caption;
  });
}

const film = document.getElementById("campaign");
const player = document.getElementById("player");
const formats = document.getElementById("formats");
const filmFiles = {portrait: "corvane_v1.mp4", square: "corvane_v1_1x1.mp4"};
let pendingPlayback = null;
formats.addEventListener("click", event => {
  const choice = event.target.closest("button[data-format]");
  if (!choice || choice.getAttribute("aria-pressed") === "true") return;
  const format = choice.dataset.format;
  pendingPlayback ??= {time: film.ended ? 0 : film.currentTime, playing: !film.paused && !film.ended};
  film.pause();
  for (const button of formats.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button === choice));
  }
  player.classList.toggle("square", format === "square");
  film.poster = format === "square" ? "/work/corvane-precision/assets/presenter-square.webp" : "/work/corvane-precision/assets/presenter.webp";
  film.src = "/work/corvane-precision/assets/" + filmFiles[format];
});
film.addEventListener("loadedmetadata", () => {
  if (!pendingPlayback) return;
  const {time, playing} = pendingPlayback;
  pendingPlayback = null;
  if (time > 0 && time < film.duration) film.currentTime = time;
  if (playing) film.play().catch(() => {});
});
formats.hidden = false;

const form = document.getElementById("quote-form");
const part = document.getElementById("part");
const sample = document.getElementById("sample");
const file = document.getElementById("drawing");
const clearFile = document.getElementById("clear-file");
const formStatus = document.getElementById("form-status");
const result = document.getElementById("result");
const lines = document.getElementById("brief-lines");
const downloadStatus = document.getElementById("download-status");
let reviewed = [];

function refreshForm() {
  part.setCustomValidity(part.value && !part.value.trim() ? "Enter a part name or drawing number." : "");
  clearFile.hidden = !file.files.length;
  sample.hidden = [...form.querySelectorAll("input, textarea")].some(field => field.value.trim());
}
form.addEventListener("input", () => {
  formStatus.textContent = "";
  refreshForm();
});
file.addEventListener("change", refreshForm);
clearFile.addEventListener("click", () => {
  file.value = "";
  refreshForm();
  file.focus();
});
sample.addEventListener("click", () => {
  part.value = "Mounting bracket BRK-204";
  form.elements.revision.value = "B";
  form.elements.quantity.value = "24";
  form.elements.material.value = "Aluminum, grade per drawing";
  form.elements.notes.value = "Include the mounting hole spacing in the batch inspection report.";
  refreshForm();
  formStatus.textContent = "Sample bracket loaded. You can edit every field.";
  part.focus();
});
form.addEventListener("submit", event => {
  event.preventDefault();
  refreshForm();
  if (!form.reportValidity()) return;
  reviewed = [
    ["Part reference", part.value.trim()],
    ["Revision", form.elements.revision.value.trim()],
    ["Quantity", String(form.elements.quantity.valueAsNumber)],
    ["Material", form.elements.material.value.trim()],
    ["Drawing file", file.files[0]?.name || ""],
    ["Notes", form.elements.notes.value.trim()]
  ].filter(([, value]) => value);
  lines.replaceChildren(...reviewed.map(([label, value]) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    row.append(term, description);
    return row;
  }));
  downloadStatus.textContent = "";
  form.hidden = true;
  result.hidden = false;
  document.getElementById("result-title").focus();
});
document.getElementById("edit").addEventListener("click", () => {
  result.hidden = true;
  form.hidden = false;
  part.focus();
});
document.getElementById("download").addEventListener("click", () => {
  if (!reviewed.length) return;
  const body = ["CORVANE PRECISION", "Drawing brief", "",
    ...reviewed.map(([label, value]) => label + ": " + value), "",
    "Attach the current drawing separately when contacting a supplier.",
    "Fictional portfolio project. No quote request has been sent."];
  SiteFile.save("Corvane-Precision-Drawing-Brief.txt", body.join("\n"));
  downloadStatus.textContent = "Your brief is ready to save.";
});
refreshForm();
form.hidden = false;
