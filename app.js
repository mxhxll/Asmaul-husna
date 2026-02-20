const names = NAMES;

const app = document.getElementById("app");

function showHome(){
  app.innerHTML = `
    <div class="card" id="learn">📖 Apprendre</div>
    <div class="card">📿 Invoquer (bientôt)</div>
    <div class="card">🧠 Quiz (bientôt)</div>
    <div class="card" id="progress">📊 Progression</div>
  `;

  document.getElementById("learn").onclick = showList;
  document.getElementById("progress").onclick = showProgress;
}

function showList(){
  app.innerHTML = "<h2>Choisis un Nom</h2>";

  names.forEach(n => {
    app.innerHTML += `
      <div class="card" onclick="showName(${n.id})">
        ${n.translit}<br>
        <small>${n.meaning}</small>
      </div>
    `;
  });
}

function showName(id){
  const n = names.find(x => x.id === id);

  app.innerHTML = `
    <button onclick="showList()">⬅ Retour</button>
    <h2>${n.arabic}</h2>
    <h3>${n.translit}</h3>
    <p><b>${n.meaning}</b></p>
  `;
}

function showProgress(){
  app.innerHTML = `
    <h2>Progression</h2>
    <p>${names.length} noms chargés</p>
    <button onclick="showHome()">Accueil</button>
  `;
}

showHome();
