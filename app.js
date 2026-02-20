const names = NAMES;
const app = document.getElementById("app");
const app = document.getElementById("app");
// déblocage audio iOS
let audioUnlocked = false;

function unlockAudio(){
if(audioUnlocked) return;

const audio = new Audio();
audio.src = "data:audio/mp3;base64,//uQxAAAA"; // micro son vide
audio.play().then(()=>{
audioUnlocked = true;
}).catch(()=>{});
}

document.body.addEventListener("touchstart", unlockAudio, {once:true});
document.body.addEventListener("click", unlockAudio, {once:true});
function saveMemorized(id){
localStorage.setItem("memorized_"+id,"1");
showName(id);
}

function isMemorized(id){
return localStorage.getItem("memorized_"+id)=="1";
}

function progress(){
let done = names.filter(n=>isMemorized(n.id)).length;
return Math.round(done/names.length*100);
}

function playAudio(name){

let id = String(name.id).padStart(3,'0');
let url = `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${id}.mp3`;

const audio = new Audio(url);
audio.play();
}
function showHome(){
app.innerHTML = `
<h2>Asma ul Husna</h2>
<p>Progression : ${progress()}%</p>

<div class="card" onclick="showList()">📖 Apprendre</div>
<div class="card" onclick="showQuiz()">🧠 Quiz</div>
`;
}

function showList(){
app.innerHTML=`
<button onclick="showHome()">🏠 Menu</button>
<h2>Choisis un Nom</h2>
`;

names.forEach(n=>{
app.innerHTML+=`
<div class="card" onclick="showName(${n.id})">
${n.translit} ${isMemorized(n.id)?"✅":""}
</div>`;
});
}
function showName(id){
const n = names.find(x=>x.id===id);
const d = DUAS[id];

app.innerHTML=`
<button onclick="showList()">⬅ Retour</button>

<h2>${n.arabic}</h2>
<h3>${n.translit}</h3>
<p>${n.meaning}</p>

<button onclick="playAudio(${n.id})">🔊 Écouter</button>

${d?`
<h4>Description</h4><p>${d.desc}</p>
<h4>Quand l'utiliser</h4><p>${d.usage}</p>
<h4>Doua</h4>
<p>${d.arabic}</p>
<p><i>${d.phonetic}</i></p>
<p>${d.fr}</p>
`:"<p>Contenu en préparation</p>"}

<br>
<button onclick="saveMemorized(${id})">
${isMemorized(id)?"Réviser":"J’ai mémorisé"}
</button>
`;
}

let currentQuiz=null;

function showQuiz(){
let pool = names.filter(n=>!isMemorized(n.id));
if(pool.length==0) pool=names;

currentQuiz = pool[Math.floor(Math.random()*pool.length)];

let options=[currentQuiz];
while(options.length<4){
let r=names[Math.floor(Math.random()*names.length)];
if(!options.includes(r)) options.push(r);
}
options.sort(()=>Math.random()-0.5);

app.innerHTML=`
<h2>Quel nom correspond ?</h2>
<p>${currentQuiz.meaning}</p>
${options.map(o=>`<div class="card" onclick="answerQuiz(${o.id})">${o.translit}</div>`).join("")}
<button onclick="showHome()">Quitter</button>
`;
}

function answerQuiz(id){
if(id===currentQuiz.id){
saveMemorized(id);
alert("Correct !");
}else{
alert("Non 😅");
}
showQuiz();
}

showHome();

function playAudio(id){

const timings = [
0,4,7,11,14,18,22,26,30,34,
38,42,46,50,54,58,62,66,70,74,
78,82,86,90,94,98,102,106,110,114,
118,122,126,130,134,138,142,146,150,154,
158,162,166,170,174,178,182,186,190,194,
198,202,206,210,214,218,222,226,230,234,
238,242,246,250,254,258,262,266,270,274,
278,282,286,290,294,298,302,306,310,314,
318,322,326,330,334,338,342,346,350,354,
358,362,366,370,374,378,382,386,390
];

let player = document.getElementById("asmaPlayer");

player.currentTime = timings[id-1];
player.play();
}
