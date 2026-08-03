// ========= Input Fields =========

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const summaryInput = document.getElementById("summary");
const skillsInput = document.getElementById("skills");
const educationInput = document.getElementById("education");
const experienceInput = document.getElementById("experience");
const projectsInput = document.getElementById("projects");
const photoInput = document.getElementById("photo");

// ========= Preview Elements =========

const previewName = document.getElementById("previewName");
const previewJob = document.getElementById("previewJob");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewAddress = document.getElementById("previewAddress");
const previewSummary = document.getElementById("previewSummary");
const previewEducation = document.getElementById("previewEducation");
const previewExperience = document.getElementById("previewExperience");
const previewProjects = document.getElementById("previewProjects");
const previewSkills = document.getElementById("previewSkills");
const previewPhoto = document.getElementById("previewPhoto");

// ========= Live Preview =========

nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Your Name";
});

jobInput.addEventListener("input", () => {
    previewJob.textContent = jobInput.value || "Job Title";
});

emailInput.addEventListener("input", () => {
    previewEmail.textContent = emailInput.value || "email@example.com";
});

phoneInput.addEventListener("input", () => {
    previewPhone.textContent = phoneInput.value || "9876543210";
});

addressInput.addEventListener("input", () => {
    previewAddress.textContent = addressInput.value || "India";
});

summaryInput.addEventListener("input", () => {
    previewSummary.textContent = summaryInput.value || "Professional Summary";
});

educationInput.addEventListener("input", () => {
    previewEducation.textContent = educationInput.value || "Education";
});

experienceInput.addEventListener("input", () => {
    previewExperience.textContent = experienceInput.value || "Experience";
});

projectsInput.addEventListener("input", () => {
    previewProjects.textContent = projectsInput.value || "Projects";
});

// ========= Skills =========

skillsInput.addEventListener("input", () => {

    previewSkills.innerHTML = "";

    let skills = skillsInput.value.split(",");

    skills.forEach(skill => {

        if(skill.trim() !== ""){

            let li = document.createElement("li");
            li.textContent = skill.trim();

            previewSkills.appendChild(li);

        }

    });

});

// ========= Photo Upload =========

photoInput.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            previewPhoto.src = e.target.result;

        }

        reader.readAsDataURL(file);

    }

});

// ========= Download PDF =========

document.getElementById("download").addEventListener("click", () => {

    const resume = document.getElementById("resume");

    const options = {

        margin:0,
        filename:'Resume.pdf',
        image:{type:'jpeg',quality:1},
        html2canvas:{scale:2},
        jsPDF:{
            unit:'mm',
            format:'a4',
            orientation:'portrait'
        }

    };

    html2pdf().set(options).from(resume).save();

});

// ========= Print =========

document.getElementById("print").addEventListener("click", () => {

    window.print();

});