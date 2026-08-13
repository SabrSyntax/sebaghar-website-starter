const m=document.getElementById("modal");
document.querySelectorAll(".coming").forEach(e=>e.onclick=()=>m.classList.add("show"));
document.getElementById("ok").onclick=()=>m.classList.remove("show");
m.onclick=e=>{if(e.target===m)m.classList.remove("show");};
document.addEventListener("keydown",e=>{if(e.key==="Escape")m.classList.remove("show");});
