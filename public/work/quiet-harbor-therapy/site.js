"use strict";

const scene = document.getElementById("harbor-motion");
const motionButton = document.getElementById("motion-toggle");
const motionLabel = document.getElementById("motion-label");
const campaign = document.getElementById("campaign");
const planner = document.getElementById("planner");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let motionWanted = !reduceMotion.matches && !navigator.connection?.saveData;
let sceneVisible = false;

function showMotionState() {
  motionButton.toggleAttribute("data-playing", !scene.paused);
  motionLabel.textContent = scene.paused ? "Play harbor scene" : "Pause harbor scene";
}

function syncMotion() {
  if (!motionWanted || !sceneVisible || document.hidden || planner.open || !campaign.paused) {
    scene.pause();
    return;
  }
  if (!scene.hasAttribute("src")) scene.src = scene.dataset.src;
  scene.play().catch(showMotionState);
}

motionButton.hidden = false;
motionButton.addEventListener("click", () => {
  motionWanted = scene.paused;
  if (motionWanted && !campaign.paused) campaign.pause();
  syncMotion();
});
scene.addEventListener("playing", () => {
  scene.classList.add("has-frame");
  showMotionState();
});
scene.addEventListener("pause", showMotionState);
scene.addEventListener("error", () => {
  scene.classList.remove("has-frame");
  motionButton.hidden = true;
});
reduceMotion.addEventListener("change", () => {
  motionWanted = !reduceMotion.matches && !navigator.connection?.saveData;
  syncMotion();
});
new IntersectionObserver(([entry]) => {
  sceneVisible = entry.isIntersecting;
  syncMotion();
}, {threshold: 0.05}).observe(scene);
document.addEventListener("visibilitychange", syncMotion);
campaign.addEventListener("play", syncMotion);
campaign.addEventListener("pause", syncMotion);

const form = document.getElementById("plan-form");
const choices = document.getElementById("choices");
const result = document.getElementById("result");
const count = document.getElementById("count");
const review = document.getElementById("review");
const questionList = document.getElementById("question-list");
const downloadStatus = document.getElementById("download-status");
const questions = [...form.querySelectorAll('input[name="question"]')];

function selectedQuestions() {
  return questions.filter(input => input.checked).map(input => input.labels[0].innerText.trim());
}
function updateCount() {
  const total = questions.filter(input => input.checked).length;
  count.textContent = total + " selected";
  review.disabled = total === 0;
}
function showStep(showResult) {
  choices.hidden = showResult;
  result.hidden = !showResult;
  const heading = document.getElementById(showResult ? "result-title" : "plan-title");
  planner.setAttribute("aria-labelledby", heading.id);
  planner.scrollTop = 0;
  heading.focus({preventScroll: true});
}
document.querySelectorAll("[data-plan]").forEach(button => {
  button.addEventListener("click", () => {
    const suggested = questions.find(input => input.value === button.dataset.plan);
    if (suggested) suggested.checked = true;
    updateCount();
    campaign.pause();
    planner.showModal();
    showStep(false);
    syncMotion();
  });
});
form.addEventListener("change", updateCount);
form.addEventListener("submit", event => {
  event.preventDefault();
  const selected = selectedQuestions();
  if (!selected.length) return;
  questionList.replaceChildren(...selected.map(question => {
    const line = document.createElement("li");
    line.textContent = question;
    return line;
  }));
  downloadStatus.textContent = "";
  showStep(true);
});
document.getElementById("edit").addEventListener("click", () => showStep(false));
document.getElementById("close-plan").addEventListener("click", () => planner.close());
planner.addEventListener("close", syncMotion);
document.getElementById("download").addEventListener("click", () => {
  const lines = [...questionList.children].map(item => "• " + item.textContent);
  SiteFile.save("Quiet-Harbor-Therapy-Call-Notes.txt", [
    "Quiet Harbor Therapy", "My questions for an introductory call", "", ...lines, "",
    "Personal call notes from a fictional portfolio practice. No appointment has been booked."
  ].join("\n"));
  downloadStatus.textContent = "Your text file is ready to save.";
});
window.addEventListener("pageshow", updateCount);
