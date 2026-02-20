const names = NAMES;

const app=document.getElementById("app");

function showHome(){
app.innerHTML=`
<div class="card" id="learn">📖 Apprendre</div>
<div class="card">📿 Invoquer (bientôt)</div>
<div class="card">🧠 Quiz (bientôt)</div>
<div class="card" id="progress">📊 Progression</div>
`;

document.getElementById("learn").onclick = showList;
document.getElementById("progress").onclick = showProgress;
}

function showList(){
app.innerHTML="<h2>Choisis un Nom</h2>";
names.forEach(n=>{
app.innerHTML+=`<div class="card" onclick="showName(${n.id})">${n.translit}<br><small>${n.meaning}</small></div>`;
});
}

function showName(id){
const n=names.find(x=>x.id===id);
app.innerHTML=`
<button onclick="showList()">⬅ Retour</button>
<h2>${n.arabic}</h2>
<h3>${n.translit}</h3>
<p><b>${n.meaning}</b></p>
<p>${n.desc}</p>
<h4>Quand l'utiliser</h4>
<p>${n.usage}</p>
<h4>Doua</h4>
<p>${n.dua}</p>
<button onclick="memorized(${id})">⭐ J'ai mémorisé</button>
`;
}

function memorized(id){
localStorage.setItem("name_"+id,"1");
alert("Ajouté à mémorisé !");
}

function showProgress(){
let total=names.length;
let done=0;
names.forEach(n=>{
if(localStorage.getItem("name_"+n.id)) done++;
});
app.innerHTML=`
<h2>Progression</h2>
<p>${done} / ${total} noms mémorisés</p>
<button onclick="showHome()">Accueil</button>
`;
}

showHome();
