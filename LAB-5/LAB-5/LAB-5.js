let educationData = [], experienceData = [], skillsData = [];
let initialData = {};

async function loadData() {
  const stored = localStorage.getItem("profileData");

  if (stored) {
    const parsed = JSON.parse(stored);
    educationData = parsed.education;
    experienceData = parsed.experience;
    skillsData = parsed.skills;
  } else {
    const res = await fetch("data.json");
    const data = await res.json();
    educationData = data.education;
    experienceData = data.experience;
    skillsData = data.skills;
    initialData = JSON.parse(JSON.stringify(data));
    localStorage.setItem("profileData", JSON.stringify(data));
  }

  renderEducation();
  renderSkills();
  renderExperience();
}

function saveToStorage() {
  localStorage.setItem("profileData", JSON.stringify({
    education: educationData,
    experience: experienceData,
    skills: skillsData
  }));
}

function renderEducation() {
  const container = document.getElementById("education");
  container.innerHTML = "";
  educationData.forEach((item, index) => {
    container.innerHTML += `
      <div>
        <strong>${item.date}</strong> - ${item.school}<br/>
        <em>${item.field}</em>
        <button onclick="editEducation(${index})">Redaktə</button>
      </div><hr/>
    `;
  });
}

function renderExperience() {
  const container = document.getElementById("experience");
  container.innerHTML = "";
  experienceData.forEach((item, index) => {
    container.innerHTML += `
      <div>
        <strong>${item.date}</strong><br/>
        <strong>${item.job}</strong><br/>
        <p>${item.description}</p>
        <button onclick="editExperience(${index})">Redaktə</button>
      </div><hr/>
    `;
  });
}

function renderSkills() {
  const list = document.getElementById("skills");
  list.innerHTML = "";
  skillsData.forEach((skill, index) => {
    list.innerHTML += `
      <li>${skill} <button onclick="editSkill(${index})">Redaktə</button></li>
    `;
  });
}

function editEducation(index) {
  const item = educationData[index];
  const date = prompt("Təhsil ili:", item.date);
  const school = prompt("Məktəb və ya universitet:", item.school);
  const field = prompt("İxtisas və ya sahə:", item.field);
  if (date && school && field) {
    educationData[index] = { date, school, field };
    renderEducation();
    saveToStorage();
  }
}

function editExperience(index) {
  const item = experienceData[index];
  const date = prompt("İş ili:", item.date);
  const job = prompt("İş adı:", item.job);
  const description = prompt("Təsvir:", item.description);
  if (date && job && description) {
    experienceData[index] = { date, job, description };
    renderExperience();
    saveToStorage();
  }
}

function editSkill(index) {
  const skill = prompt("Bacarığı düzəlt:", skillsData[index]);
  if (skill) {
    skillsData[index] = skill;
    renderSkills();
    saveToStorage();
  }
}

function addEducation() {
  const date = prompt("Təhsil ili:");
  const school = prompt("Məktəb və ya universitet:");
  const field = prompt("İxtisas və ya sahə:");
  if (date && school && field) {
    educationData.push({ date, school, field });
    renderEducation();
    saveToStorage();
  }
}

function addExperience() {
  const date = prompt("İş ili:");
  const job = prompt("İş adı:");
  const description = prompt("Təsvir:");
  if (date && job && description) {
    experienceData.push({ date, job, description });
    renderExperience();
    saveToStorage();
  }
}

function addSkill() {
  const skill = prompt("Yeni bacarıq:");
  if (skill) {
    skillsData.push(skill);
    renderSkills();
    saveToStorage();
  }
}

function resetAll() {
  if (confirm("Bütün məlumatları sıfırlamaq istədiyinizə əminsiniz?")) {
    localStorage.removeItem("profileData");
    loadData();
  }
}

window.onload = function () {
  loadData();
};
