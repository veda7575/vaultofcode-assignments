const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const summaryInput = document.getElementById('summary');
const addEducationBtn = document.getElementById('addEducation');
const addExperienceBtn = document.getElementById('addExperience');
const clearFormBtn = document.getElementById('clearForm');
const downloadPDFBtn = document.getElementById('downloadPDF');
const skillInputField = document.getElementById('skillInput');
const skillsTagsContainer = document.getElementById('skillsTags');
const educationContainer = document.getElementById('educationContainer');
const experienceContainer = document.getElementById('experienceContainer');
const previewName = document.getElementById('previewName');
const previewEmail = document.getElementById('previewEmail');
const previewPhone = document.getElementById('previewPhone');
const previewSummary = document.getElementById('previewSummary');
const previewEducation = document.getElementById('previewEducation');
const previewExperience = document.getElementById('previewExperience');
const previewSkills = document.getElementById('previewSkills');
const resumePreview = document.getElementById('resumePreview');
const progressBar = document.getElementById('progressBar');

let skills = [];

window.addEventListener('load', () => {
  resumePreview.classList.add('visible');
});

let typingTimeout;
[nameInput, emailInput, phoneInput, summaryInput].forEach(input => {
  input.addEventListener('input', () => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(updatePreview, 150);
  });
});

function updatePreview() {
  previewName.textContent = nameInput.value;
  previewEmail.textContent = emailInput.value;
  previewPhone.textContent = phoneInput.value;
  previewSummary.textContent = summaryInput.value;
  updateEducation();
  updateExperience();
  renderSkills();
  updateProgress();
  resumePreview.classList.add('animate');
  setTimeout(() => resumePreview.classList.remove('animate'), 500);
}

addEducationBtn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.classList.add('edu-entry');
  div.innerHTML = `
    <input type="text" placeholder="Degree / Course">
    <input type="text" placeholder="Institution">
    <input type="text" placeholder="Year">
    <button type="button" class="removeBtn">Remove</button>
  `;
  educationContainer.appendChild(div);
  div.querySelectorAll('input').forEach(inp => inp.addEventListener('input', updatePreview));
  div.querySelector('.removeBtn').addEventListener('click', () => { div.remove(); updatePreview(); });
});

function updateEducation() {
  previewEducation.innerHTML = '';
  document.querySelectorAll('.edu-entry').forEach(entry => {
    const [degree, institution, year] = entry.querySelectorAll('input');
    if (degree.value || institution.value || year.value) {
      const li = document.createElement('li');
      li.textContent = `${degree.value} at ${institution.value} (${year.value})`;
      previewEducation.appendChild(li);
    }
  });
}

addExperienceBtn.addEventListener('click', () => {
  const div = document.createElement('div');
  div.classList.add('exp-entry');
  div.innerHTML = `
    <input type="text" placeholder="Job Title">
    <input type="text" placeholder="Company">
    <input type="text" placeholder="Years Worked">
    <button type="button" class="removeBtn">Remove</button>
  `;
  experienceContainer.appendChild(div);
  div.querySelectorAll('input').forEach(inp => inp.addEventListener('input', updatePreview));
  div.querySelector('.removeBtn').addEventListener('click', () => { div.remove(); updatePreview(); });
});

function updateExperience() {
  previewExperience.innerHTML = '';
  document.querySelectorAll('.exp-entry').forEach(entry => {
    const [title, company, years] = entry.querySelectorAll('input');
    if (title.value || company.value || years.value) {
      const li = document.createElement('li');
      li.textContent = `${title.value} at ${company.value} (${years.value})`;
      previewExperience.appendChild(li);
    }
  });
}

skillInputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const skill = skillInputField.value.trim();
    if (skill && !skills.includes(skill)) {
      skills.push(skill);
      skillInputField.value = '';
      renderSkills();
      updateProgress();
    }
  }
});

function renderSkills() {
  skillsTagsContainer.innerHTML = '';
  previewSkills.innerHTML = '';
  skills.forEach((skill, index) => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `${skill} <button onclick="removeSkill(${index})">&times;</button>`;
    skillsTagsContainer.appendChild(tag);

    const li = document.createElement('li');
    li.textContent = skill;
    previewSkills.appendChild(li);
  });
}

function removeSkill(index) {
  skills.splice(index, 1);
  renderSkills();
  updateProgress();
}

clearFormBtn.addEventListener('click', () => {
  document.getElementById('resumeForm').reset();
  educationContainer.innerHTML = '';
  experienceContainer.innerHTML = '';
  previewEducation.innerHTML = '';
  previewExperience.innerHTML = '';
  previewSkills.innerHTML = '';
  previewName.textContent = '';
  previewEmail.textContent = '';
  previewPhone.textContent = '';
  previewSummary.textContent = '';
  skills = [];
  skillsTagsContainer.innerHTML = '';
  progressBar.style.width = '0%';
});

function updateProgress() {
  const totalInputs = document.querySelectorAll('#resumeForm input, #resumeForm textarea').length;
  const filledInputs = [...document.querySelectorAll('#resumeForm input, #resumeForm textarea')].filter(el => el.value.trim() !== '').length;
  const percent = (filledInputs / totalInputs) * 100;
  progressBar.style.width = `${percent}%`;
}

downloadPDFBtn.addEventListener('click', () => {
  resumePreview.classList.add('visible');
  html2canvas(resumePreview).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  });
});
