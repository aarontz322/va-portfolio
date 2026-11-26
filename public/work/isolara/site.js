"use strict";

const dayList = document.querySelector(".day-list");
const photo = document.getElementById("day-photo");
const caption = document.getElementById("day-caption");
function showPhoto(day) {
  photo.src = "/work/isolara/assets/" + day.image;
  photo.alt = day.alt;
  caption.textContent = day.caption;
}

const film = document.getElementById("campaign-film");
const playButton = document.getElementById("sound-button");
const soundLabel = document.getElementById("sound-label");
function updatePlayLabel() {
  soundLabel.textContent = film.paused || film.ended ? "Play film with sound" : film.muted || film.volume === 0 ? "Turn sound on" : "Pause film";
}
playButton.hidden = false;
for (const event of ["play", "pause", "volumechange", "ended"]) film.addEventListener(event, updatePlayLabel);
playButton.addEventListener("click", async () => {
  if (!film.paused && !film.ended && !film.muted && film.volume > 0) {
    film.pause();
    return;
  }
  film.muted = false;
  if (film.volume === 0) film.volume = 1;
  if (film.ended) film.currentTime = 0;
  try {
    await film.play();
  } catch {
    film.focus();
  }
  updatePlayLabel();
});

const form = document.getElementById("brief-form");
const result = document.getElementById("brief-result");
const title = document.getElementById("result-title");
const summary = document.getElementById("result-summary");
const plan = document.getElementById("result-plan");
const stays = {3:"Three nights", 5:"Five nights", 7:"Seven nights"};
const parties = {solo:"Solo traveler", two:"Two travelers", group:"Family or friends"};
const priorities = {water:"Time by the water", food:"Local food", drives:"Coastal drives"};
const partyNotes = {
  solo:"Ask for flexible pickup times so you can set your own pace.",
  two:"Choose one dinner together before planning the rest of the stay.",
  group:"Agree on a meeting time for dinner so everyone can spend the afternoon their own way.",
};
const routeTools = document.getElementById("route-tools");
const routeLengths = [...routeTools.querySelectorAll("[name=route-nights]")];
const routePriority = document.getElementById("route-priority");
const resultDays = document.getElementById("result-days");
let savedBrief = null;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function currentBrief() {
  const {nights, party, priority} = form.elements;
  return {
    nights: nights.value,
    priority: priority.value,
    summary: [stays[nights.value], parties[party.value], priorities[priority.value]].join(" · "),
    partyNote: partyNotes[party.value],
    days: coastalDays(nights.value, priority.value)
  };
}

function updateItinerary(announce) {
  const brief = currentBrief();
  for (const radio of routeLengths) radio.checked = radio.value === brief.nights;
  routePriority.value = brief.priority;
  document.getElementById("route-length-text").textContent = stays[brief.nights];
  const fragment = document.createDocumentFragment();
  for (const [index, day] of brief.days.entries()) {
    const row = element("details");
    row.setAttribute("name", "itinerary-day");
    const heading = element("summary");
    const icon = element("i");
    icon.setAttribute("aria-hidden", "true");
    heading.append(element("span", "Day " + (index + 1), "day-label"), element("span", day.title), icon);
    const description = element("div", "", "day-content");
    description.append(element("p", day.plan));
    row.append(heading, description);
    row.addEventListener("toggle", () => {
      if (!row.open || !row.isConnected) return;
      for (const other of dayList.querySelectorAll("details[open]")) {
        if (row !== other) other.open = false;
      }
      showPhoto(day);
    });
    if (index === 0) row.open = true;
    fragment.append(row);
  }
  dayList.replaceChildren(fragment);
  showPhoto(brief.days[0]);
  if (announce) {
    document.getElementById("route-status").textContent =
      brief.days.length + " days. " + stays[brief.nights] + ". " + priorities[brief.priority] + ".";
  }
}

function reopenForm() {
  savedBrief = null;
  result.hidden = true;
  form.hidden = false;
}
routeTools.addEventListener("change", () => {
  form.elements.nights.value = routeLengths.find(radio => radio.checked).value;
  form.elements.priority.value = routePriority.value;
  reopenForm();
  updateItinerary(true);
});
form.addEventListener("change", event => {
  if (event.target.name === "nights" || event.target.name === "priority") updateItinerary(false);
});
updateItinerary(false);
routeTools.hidden = false;

form.addEventListener("submit", event => {
  event.preventDefault();
  const brief = currentBrief();
  savedBrief = brief;
  summary.textContent = brief.summary;
  plan.textContent = brief.partyNote;
  const rows = brief.days.map((day, index) => {
    const row = element("li");
    const copy = element("div");
    copy.append(element("h4", day.title), element("p", day.plan));
    row.append(element("span", "Day " + (index + 1), "day-label"), copy);
    return row;
  });
  resultDays.replaceChildren(...rows);
  form.hidden = true;
  result.hidden = false;
  title.focus();
});
document.getElementById("edit-brief").addEventListener("click", () => {
  reopenForm();
  form.elements.nights.focus();
});
document.getElementById("print-brief").addEventListener("click", () => window.print());
document.getElementById("download-brief").addEventListener("click", () => {
  if (!savedBrief) return;
  const body = ["ISOLARA PRIVATE JOURNEYS", title.textContent, savedBrief.summary, savedBrief.partyNote,
    ...savedBrief.days.map((day, index) => "Day " + (index + 1) + " | " + day.title + "\r\n" + day.plan),
    document.querySelector(".brief-disclosure").textContent].join("\r\n\r\n");
  const url = URL.createObjectURL(new Blob([body], {type:"text/plain;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "ISOLARA-Journey-Brief.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
form.hidden = false;
