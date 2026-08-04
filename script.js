// =========================
// Resume Builder Script
// Part - 1
// =========================

// ===== Input Fields =====

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

// ===== Preview Elements =====

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

// ===== Live Preview =====

function updatePreview() {

    previewName.textContent =
        nameInput.value || "Your Name";

    previewJob.textContent =
        jobInput.value || "Job Title";

    previewEmail.textContent =
        emailInput.value || "example@email.com";

    previewPhone.textContent =
        phoneInput.value || "+91 9876543210";

    previewAddress.textContent =
        addressInput.value || "Your Address";

    previewSummary.textContent =
        summaryInput.value || "Professional Summary";

    previewEducation.textContent =
        educationInput.value || "Education Details";

    previewExperience.textContent =
        experienceInput.value || "Work Experience";

    previewProjects.textContent =
        projectsInput.value || "Projects";

}

// Live Update

[
nameInput,
jobInput,
emailInput,
phoneInput,
addressInput,
summaryInput,
educationInput,
experienceInput,
projectsInput
].forEach(input=>{

    input.addEventListener("input",updatePreview);

});

// ===== Photo Upload =====

photoInput.addEventListener("change",function(){

    const file=this.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(e){

        previewPhoto.src=e.target.result;

    }

    reader.readAsDataURL(file);

});

// Default Preview

updatePreview();
// =========================
// Part - 2
// Skills + PDF Download
// =========================

// ===== Skills Live Preview =====

skillsInput.addEventListener("input", () => {

    previewSkills.innerHTML = "";

    const skills = skillsInput.value.split(",");

    skills.forEach(skill => {

        const text = skill.trim();

        if(text !== ""){

            const li = document.createElement("li");

            li.textContent = text;

            previewSkills.appendChild(li);

        }

    });

});


// ===== Download PDF =====

document.getElementById("download").addEventListener("click", () => {

    const resume = document.getElementById("resume");

    const options = {

        margin: 5,

        filename:
        (nameInput.value || "Resume") + ".pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 3,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        }

    };

    html2pdf()
        .set(options)
        .from(resume)
        .save();

});
// =========================
// Part - 3
// Professional Print Resume
// =========================

document.getElementById("print").addEventListener("click", () => {

    const resume = document.getElementById("resume").innerHTML;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>

    <title>Print Resume</title>

    <style>

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial,sans-serif;
    }

    body{
        padding:25px;
        background:#ffffff;
    }

    #printResume{
        width:210mm;
        min-height:297mm;
        margin:auto;
    }

    img{
        max-width:120px;
        border-radius:50%;
        display:block;
        margin:auto;
    }

    h1{
        text-align:center;
        margin:10px 0;
        color:#222;
    }

    h2{
        margin-top:18px;
        margin-bottom:8px;
        color:#2563eb;
        border-bottom:2px solid #2563eb;
        padding-bottom:5px;
    }

    h3{
        text-align:center;
        color:#555;
        margin-bottom:15px;
    }

    p,li{
        font-size:15px;
        line-height:1.8;
        color:#333;
    }

    ul{
        padding-left:20px;
    }

    hr{
        margin:18px 0;
    }

    @page{
        size:A4;
        margin:10mm;
    }

    </style>

    </head>

    <body>

    <div id="printResume">

    ${resume}

    </div>

    </body>

    </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {

        printWindow.print();

        printWindow.close();

    },500);

});