const names = NAMES;
const app = document.getElementById("app");

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

const text = name.arabic;

function speak(){
let voices = speechSynthesis.getVoices();
let arabicVoice = voices.find(v => v.lang.startsWith("ar"));

let utter = new SpeechSynthesisUtterance(text);
if(arabicVoice) utter.voice = arabicVoice;

utter.lang = "ar-SA";
utter.rate = 0.85;
utter.pitch = 1;

speechSynthesis.cancel();
speechSynthesis.speak(utter);
}

// iOS charge les voix après interaction
if(speechSynthesis.getVoices().length === 0){
speechSynthesis.onvoiceschanged = speak;
}else{
speak();
}
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

<button onclick='playAudio(${JSON.stringify(n)})'>🔊 Écouter</button>

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
