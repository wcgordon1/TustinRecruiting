import"https://unpkg.com/mailgo@0.12.2/dist/mailgo.min.js";function m(){const e=document.querySelectorAll(".job-item"),t=document.getElementById("noResults");if(!t)return;let a=!1;e.forEach(n=>{n instanceof HTMLElement&&n.style.display!=="none"&&(a=!0)}),t.style.display=a?"none":"block"}const h=new MutationObserver(e=>{e.forEach(t=>{t.type==="attributes"&&t.attributeName==="style"&&m()})});document.querySelectorAll(".job-item").forEach(e=>{h.observe(e,{attributes:!0})});window.resetAllFilters=()=>{const e=document.getElementById("searchInput");e&&(e.value=""),document.querySelectorAll('input[type="radio"]').forEach(a=>{a.checked=!1}),document.querySelectorAll(".job-item").forEach(a=>{a instanceof HTMLElement&&(a.style.display="")});const t=document.getElementById("noResults");t&&(t.style.display="none")};m();document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("searchInput"),t=document.getElementById("clearButton");document.addEventListener("resetSearch",()=>{e&&(e.value="",a())});function a(){const r=document.querySelectorAll(".job-item"),c=e?.value.toLowerCase()||"";t&&t.classList.toggle("hidden",c.length<2),r.forEach(o=>{if(!(o instanceof HTMLElement))return;const i={position:o.dataset.position,location:o.dataset.location,team:o.dataset.team,description:o.dataset.description,category:o.dataset.category},l=!c||Object.values(i).some(d=>d&&d.toLowerCase().includes(c));o.style.display=l?"":"none"})}function n(){e&&(e.value="",a())}e?.addEventListener("input",a),t?.addEventListener("click",n)});let s={salary:null,team:null,category:null};function f(){document.querySelectorAll(".job-item").forEach(t=>{const a=t.dataset.team||"",n=t.dataset.category||"";parseInt(t.dataset.salary||"0");const r=!s.team||a===s.team,c=!s.category||n===s.category;if(t.style.display=r&&c?"":"none",s.salary){const o=document.querySelector(".job-list");if(!o)return;const i=Array.from(o.children);i.sort((l,d)=>{const u=parseInt(l.dataset.salary||"0"),y=parseInt(d.dataset.salary||"0");return s.salary==="high-low"?y-u:u-y}),i.forEach(l=>o.appendChild(l))}})}const p=["salary-sort","team-filter","category-filter"];p.forEach(e=>{document.querySelectorAll(`input[name="${e}"]`).forEach(t=>{t.addEventListener("change",a=>{const n=a.target,r=e.split("-")[0];s[r]=n.value,f()})})});document.getElementById("resetFilters")?.addEventListener("click",()=>{s={salary:null,team:null,category:null},document.querySelectorAll('input[type="radio"]').forEach(e=>e.checked=!1),document.dispatchEvent(new CustomEvent("resetSearch")),f()});