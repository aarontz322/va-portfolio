const form = document.getElementById('estimate-form');
const preview = document.getElementById('estimate-result');
const requestCopy = document.getElementById('request-copy');
const leakDetails = document.getElementById('leak-details');
const leakReason = document.getElementById('reason-leak');

function syncLeakDetails() {
  const isLeak = leakReason.checked;
  leakDetails.hidden = !isLeak;
  leakDetails.disabled = !isLeak;
  if (!isLeak) {
    form.elements.location.value = '';
    form.elements.weather.value = '';
  }
}

syncLeakDetails();
window.addEventListener('pageshow', syncLeakDetails);
form.addEventListener('change', event => {
  if (event.target.name === 'reason') syncLeakDetails();
});
form.addEventListener('input', () => { preview.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  const info = new FormData(form);
  const lines = ['Reason for inspection: ' + info.get('reason')];
  if (info.has('location')) {
    lines.push('Observed at: ' + info.get('location'), 'Weather pattern: ' + info.get('weather'));
  }
  lines.push(
    'Roof covering: ' + info.get('covering'),
    'Preferred visit window: ' + info.get('window')
  );
  const details = info.get('details').trim();
  if (details) lines.push('Additional details: ' + details);
  requestCopy.textContent = lines.join('\n');
  preview.hidden = false;
  document.getElementById('preview-title').focus();
});
document.getElementById('download-request').addEventListener('click', () => {
  SiteFile.save('slatewell-inspection-request.txt', 'SLATEWELL ROOFING / DEMO INSPECTION REQUEST\n\n' + requestCopy.textContent + '\n\nPrepared locally. A contractor has not received this request.');
});
document.getElementById('edit-request').addEventListener('click', () => {
  preview.hidden = true;
  form.querySelector('input[name="reason"]:checked').focus();
});
form.hidden = false;
