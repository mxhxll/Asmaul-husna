const names = [
{
id:1,
arabic:"ٱلرَّحْمَـٰنُ",
translit:"Ar-Rahman",
meaning:"Le Tout Miséricordieux",
desc:"Sa miséricorde englobe toute la création.",
usage:"À invoquer pour la miséricorde, la douceur du cœur et la baraka.",
dua:"Ya Rahman, couvre-moi de Ta miséricorde ici-bas et dans l’au-delà."
},
{
id:2,
arabic:"ٱلرَّحِيمُ",
translit:"Ar-Rahim",
meaning:"Le Très Miséricordieux",
desc:"Miséricorde مخصوصة pour les croyants.",
usage:"Pour le pardon et l’au-delà.",
dua:"Ya Rahim, pardonne-moi et fais-moi miséricorde."
},
{
id:3,
arabic:"ٱلْمَلِكُ",
translit:"Al-Malik",
meaning:"Le Souverain",
desc:"Le Roi absolu qui possède toute chose.",
usage:"Quand tu te sens impuissant ou dominé.",
dua:"Ya Malik, accorde-moi la maîtrise de moi-même et la dignité."
}
];

const app=document.getElementById("app");

function showHome(){
app.innerHTML=`
<div class="card" onclick="showList()">📖 Apprendre</div>
<div class="card">📿 Invoquer (bientôt)</div>
<div class="card">🧠 Quiz (bientôt)</div>
<div class="card" onclick="showProgress()">📊 Progression</div>
`;
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
