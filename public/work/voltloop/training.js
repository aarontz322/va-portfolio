"use strict";

const get = (id) => document.getElementById(id);
const photo = get("set-image");
const photos = {
  set: ["/work/voltloop/assets/band-set.webp", "Black, electric blue and volt yellow fabric bands stacked beside the VOLTLOOP pouch"],
  training: ["/work/voltloop/assets/training.webp", "A coach stretching the blue VOLTLOOP band between both hands"]
};
const views = document.querySelectorAll("[data-photo]");
for (const view of views) {
  view.addEventListener("click", () => {
    const key = view.dataset.photo;
    [photo.src, photo.alt] = photos[key];
    photo.dataset.view = key;
    for (const button of views) button.setAttribute("aria-pressed", String(button === view));
  });
}

const player = get("campaign-film");
const walkthroughDialog = get("walkthrough-dialog");
const walkthroughFilm = get("walkthrough-film");
get("session-preview").addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof walkthroughDialog.showModal !== "function") return;
  event.preventDefault();
  player.pause();
  walkthroughDialog.showModal();
  walkthroughFilm.play().catch(() => { /* The native controls remain available. */ });
});
walkthroughDialog.addEventListener("close", () => walkthroughFilm.pause());
let requestedTime = null;
function seek() {
  if (requestedTime === null) return;
  player.currentTime = requestedTime;
  requestedTime = null;
}
function playScene(seconds) {
  requestedTime = seconds;
  if (player.readyState >= HTMLMediaElement.HAVE_METADATA) seek();
  player.play().catch(() => {});
}
player.addEventListener("loadedmetadata", seek);
get("watch").addEventListener("click", () => playScene(0));
get("watch-band-pull").addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  playScene(Number(event.currentTarget.hash.slice(3)));
  player.focus({preventScroll: true});
  player.scrollIntoView({block: "center"});
});
for (const button of document.querySelectorAll("[data-time]")) {
  button.addEventListener("click", () => {
    playScene(Number(button.dataset.time));
    if (matchMedia("(max-width:700px)").matches) player.scrollIntoView({block:"center"});
  });
}

const fields = [get("work"), get("rest"), get("rounds")];
const clock = get("clock");
const label = get("clock-label");
const control = get("main-timer");
const reset = get("reset-timer");
let mode = "idle";
let phases = [];
let phaseIndex = 0;
let end = 0;
let remaining = 0;
let tickId;

function display(seconds) {
  const value = Math.max(0, Math.ceil(seconds));
  const minutes = String(Math.floor(value / 60)).padStart(2, "0");
  clock.textContent = minutes + ":" + String(value % 60).padStart(2, "0");
}
function prepare() {
  clearInterval(tickId);
  mode = "idle";
  phaseIndex = 0;
  phases = [];
  const [work, rest, rounds] = fields.map((field) => Number(field.value));
  for (let round = 1; round <= rounds; round += 1) {
    phases.push({name:"Work", seconds:work, round});
    if (round < rounds) phases.push({name:"Rest", seconds:rest, round});
  }
  for (const field of fields) field.disabled = false;
  label.textContent = "Total session time";
  control.textContent = "Start timer";
  reset.hidden = true;
  display(work * rounds + rest * (rounds - 1));
}
function phaseLabel() {
  const phase = phases[phaseIndex];
  return phase.name + " · Round " + phase.round + " of " + get("rounds").value;
}
function refresh() {
  if (mode !== "running") return;
  const now = Date.now();
  while (now >= end) {
    phaseIndex += 1;
    if (phaseIndex === phases.length) {
      clearInterval(tickId);
      mode = "finished";
      label.textContent = "Session complete";
      control.textContent = "Start again";
      display(0);
      return;
    }
    end += phases[phaseIndex].seconds * 1000;
    label.textContent = phaseLabel();
  }
  display((end - now) / 1000);
}
function start(milliseconds) {
  mode = "running";
  end = Date.now() + milliseconds;
  label.textContent = phaseLabel();
  control.textContent = "Pause";
  for (const field of fields) field.disabled = true;
  reset.hidden = false;
  refresh();
  tickId = setInterval(refresh, 160);
}
get("timer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (mode === "running") {
    refresh();
    if (mode === "finished") return;
    remaining = Math.max(0, end - Date.now());
    clearInterval(tickId);
    mode = "paused";
    label.textContent = "Paused · " + phaseLabel();
    control.textContent = "Resume";
    return;
  }
  if (mode === "finished") prepare();
  start(mode === "paused" ? remaining : phases[0].seconds * 1000);
});
for (const field of fields) field.addEventListener("change", prepare);
reset.addEventListener("click", () => { prepare(); control.focus(); });
document.addEventListener("visibilitychange", refresh);
prepare();
