const $ = id => document.getElementById(id);
const fields = ["name","role","phone","email","location","summary","skills","showLocation"];
const educationDefaults = [
  {title:"Bachelor of Computer Applications (BCA)",detail:"2022 – 2025"},
  {title:"Senior Secondary (Class XII)",detail:"2022 · 78%"},
  {title:"Secondary School (Class X)",detail:"2020 · 82%"}
];
const experienceDefaults = [
  {title:"Frontend Developer · BrightWeb Studio",year:"2024 – Present",detail:"Built responsive website pages, improved layouts, and maintained reusable UI components."},
  {title:"Web Design Intern · Creative Labs",year:"2023 – 2024",detail:"Created page mockups, prepared visual assets, and collaborated on website updates."}
];
let education = [...educationDefaults], experience = [...experienceDefaults], photoURL = "";
function escapeHTML(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderRepeat(type){
  const data = type==="education"?education:experience, host=$(type+"List");
  host.innerHTML="";
  data.forEach((item,i)=>{
    const div=document.createElement("div");div.className="repeat-item";
    div.innerHTML=`<button class="remove-item" type="button" aria-label="Remove item">×</button>
      <input aria-label="${type} title" placeholder="${type==="education"?"Qualification":"Role / project"}" value="${escapeHTML(item.title)}" data-key="title">
      ${type==="experience"?`<input aria-label="Years" placeholder="Year / duration" value="${escapeHTML(item.year||"")}" data-key="year">`:""}
      <input aria-label="Details" placeholder="Details" value="${escapeHTML(item.detail||"")}" data-key="detail">`;
    div.querySelector(".remove-item").onclick=()=>{data.splice(i,1);renderRepeat(type);updatePreview();};
    div.querySelectorAll("input").forEach(input=>input.addEventListener("input",()=>{data[i][input.dataset.key]=input.value;updatePreview();}));
    host.appendChild(div);
  });
}
function updatePreview(){
  const fullName=$("name").value.trim()||"YOUR NAME", parts=fullName.split(/\s+/);
  $("previewName").textContent=parts.shift().toUpperCase();
  $("previewSurname").textContent=parts.join(" ").toUpperCase();
  $("previewRole").textContent=$("role").value.toUpperCase()||"YOUR PROFESSION";
  $("previewSummary").textContent=$("summary").value;
  $("previewPhone").textContent=$("phone").value;
  $("previewEmail").textContent=$("email").value;
  $("previewLocation").textContent=$("location").value;
  $("locationLine").style.display=$("showLocation").checked?"flex":"none";
  $("previewEducation").innerHTML=education.map(x=>`<li><strong>${escapeHTML(x.title)}</strong> – ${escapeHTML(x.detail)}</li>`).join("");
  $("previewExperience").innerHTML=experience.map(x=>`<div class="experience-item"><h4>✦ ${escapeHTML(x.title)}</h4><p><span class="year">${escapeHTML(x.year||"")}</span> &nbsp; ${escapeHTML(x.detail)}</p></div>`).join("");
  const skills=$("skills").value.split(",").map(x=>x.trim()).filter(Boolean);
  $("previewSkills").innerHTML=skills.map(x=>`<span class="skill-chip">${escapeHTML(x)}</span>`).join("");
  const accent=$("accent").value;document.documentElement.style.setProperty("--accent",accent);$("resume").style.setProperty("--accent",accent);
  const resume=$("resume");resume.classList.toggle("compact",education.length>4||experience.length>2||skills.length>7||$("summary").value.length>430);
}
fields.forEach(id=>$(id).addEventListener("input",updatePreview));
$("accent").addEventListener("change",updatePreview);
document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>{
  if(btn.dataset.add==="education")education.push({title:"New qualification",detail:"Add details"});
  else experience.push({title:"New experience",year:"2026",detail:"Describe your work"});
  renderRepeat(btn.dataset.add);updatePreview();
}));
$("photo").addEventListener("change",e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(!file.type.startsWith("image/")){alert("Please choose an image file.");return;}
  if(photoURL)URL.revokeObjectURL(photoURL);photoURL=URL.createObjectURL(file);
  $("photoPreview").src=photoURL;$("photoPreview").hidden=false;$("photoPlaceholder").hidden=true;
});
$("removePhoto").addEventListener("click",()=>{
  if(photoURL)URL.revokeObjectURL(photoURL);photoURL="";
  $("photoPreview").removeAttribute("src");$("photoPreview").hidden=true;$("photoPlaceholder").hidden=false;$("photo").value="";
});
function printResume(){window.print();}
$("printBtn").addEventListener("click",printResume);
$("downloadBtn").addEventListener("click",()=>{
  // The browser's print dialog can save the exact A4 design as a PDF.
  window.print();
});
renderRepeat("education");renderRepeat("experience");updatePreview();
