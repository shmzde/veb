/// Təhsil, təcrübə və bacarıq məlumatları üçün massivlər (array)
const educationData = [
    {
        date: "2012 - 2024",
        school: "Qax rayonu, E.Babayev adına 4 nömrəli məktəb",
        field: "Azərbaycan Texniki Universiteti - İnformasiya Təhlükəsizliyi"
    }
]; // Təhsil məlumatlarını saxlayır

const experienceData = [
    {
        date: "2025 - ...",
        job: "Təcrübəçi, Cyber Security şirkəti",
        description: "Web tətbiqlərin təhlükəsizlik testləri aparılır"
    }
];// İş təcrübələri 

const skillsData = [
    "C proqramlaşdırma dili",
    "C++ proqramlaşdırma dili",
    "HTML və CSS",
    "Web app hacking (fundamental)",
    "Kali Linux və Windows-da işləmə",
    "Analitik düşüncə",
    "Komanda ilə işləmə",
    "Networking bilikləri"
];// Bacarıqlar

// Təhsil hissəsini HTML-ə yazdırmaq üçün funksiya
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

// Bacarıqları HTML siyahıya yazdırır
function renderSkills() {
    const list = document.getElementById("skills");
    list.innerHTML = "";
    skillsData.forEach((skill, index) => {
        list.innerHTML += `
            <li>${skill} <button onclick="editSkill(${index})">Redaktə</button></li>
        `;
    });
}

// Yeni təhsil məlumatı əlavə edir
function addEducation() {
    const date = prompt("Təhsil ili:");
    const school = prompt("Məktəb və ya universitet:");
    const field = prompt("İxtisas və ya sahə:");
    if (date && school && field) {
        educationData.push({ date, school, field });
        renderEducation();
    }
}

// Yeni bacarıq əlavə edir
function addSkill() {
    const skill = prompt("Yeni bacarıq:");
    if (skill) {
        skillsData.push(skill);
        renderSkills();
    }
}

// Təhsili redaktə etmək
function editEducation(index) {
    const item = educationData[index];
    const date = prompt("Təhsil ili:", item.date);
    const school = prompt("Məktəb:", item.school);
    const field = prompt("İxtisas:", item.field);
    if (date && school && field) {
        educationData[index] = { date, school, field };
        renderEducation();
    }
}

// Bacarıq redaktəsi
function editSkill(index) {
    const skill = prompt("Bacarığı düzəlt:", skillsData[index]);
    if (skill) {
        skillsData[index] = skill;
        renderSkills();
    }
}

// Açılıb bağlanma funksiyası
function toggleSection(id) {
    const el = document.getElementById(id);
    if (el.style.display === "none" || el.style.display === "") {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
}

// Səhifə yüklənəndə göstər
window.onload = function () {
    renderEducation();
    renderSkills();
};
