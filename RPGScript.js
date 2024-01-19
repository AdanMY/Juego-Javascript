let xp = 0;
let health = 100;
let guiles = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palo"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const guilesText = document.querySelector("#guilesText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    { name: "Palo", power: 5 },
    { name:"Daga", power: 30 },
    { name:"Martillo", power: 50 },
    { name:"Espada", power: 100 }
    ];
const monsters = [
  { name:"Slime", level: 2, health: 15 },
  { name:"Bullfango", level: 8, health: 60 },
  { name:"Rathalos", level: 20, health: 300 }
];
const locations = [
    {
name: "town square",
"button text": ["Ir al Supermerkat","Ir a la cueva","Combatir al dragón" ],
"button functions":[goStore, goCave, fightDragon],
text: "Estas en la plaza de la ciudad. Ves el cartel del \"Supermerkat\"."
},
    {
name:"store",
"button text": ["Comprar 10 puntos de vida (10 guiles).","Comprar arma (30 guiles).","Volver a la plaza de la ciudad."],
"button functions": [buyHealth,buyWeapon,goTown],
text: "Ves varios objetos, entre ellos pociones de salud y armas."
},
    {
 name: "cave",
 "button text": ["Luchar con slime", "Luchar con bullfango", "Volver a la plaza"],
 "button functions": [fightSlime,fightBeast, goTown],
 text: "Entras en la cueva. Ves varios monstruos"
},
{
  name: "fight",
  "button text": ["Atacar","Esquivar","Huir"],
  "button functions": [attack, dodge, goTown],
  text:"Estas en una batalla encarnizada."
},
{
  name:"kill monster",
  "button text": ["Volver a la plaza", "Volver a la plaza", "Volver a la plaza"],
  "button functions": [goTown, goTown, goTown],
  text: "El monstruo muere entre terrible sufrimiento. Ganas XP y guiles."
},
{
  name: "lose",
  "button text": ["JUGAR DE NUEVO", "JUGAR DE NUEVO", "JUGAR DE NUEVO"],
  "button functions":[restart, restart, restart],
   text:"Has muerto.☠️"
},
{
  name: "win",
  "button text": ["JUGAR DE NUEVO", "JUGAR DE NUEVO", "JUGAR DE NUEVO"],
  "button functions":[restart, restart, restart],
   text:"¡Has logrado vencer al legendario Rathalos!¡¡¡ENHORABUENA CAZADOR 🎉🎉!!!"
}
];

//Asignar botones

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations){
    monsterStats.style.display = "none";
    button1.innerText = locations ["button text"][0];
    button2.innerText = locations ["button text"][1];
    button3.innerText = locations ["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    text.innerText = locations.text;
}
function goTown() {
    update (locations[0]);
  }
function goStore(){
    update (locations[1]);
}
function goCave(){
    update (locations[2]);
  }
function buyHealth(){
    if (guiles >= 10){
     guiles -= 10;
     health += 10;
     guilesText.innerText = guiles;
     healthText.innerText = health;
    } else {
     text.innerText = "No tienes suficientes guiles para realizar la compra.";
    }
  }
function buyWeapon(){
    if(currentWeapon < weapons.length - 1) {
    if(guiles >= 30) {
    guiles -= 30;
    currentWeapon++;
    guilesText.innerText = guiles;
    let newWeapon = weapons [currentWeapon].name;
    text.innerText = "Has comprado " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += "Tienes en tu inventario: " + inventory + ".";
    } else {
    text.innerText = "No tienes suficientes guiles para comprar el arma";
     }
   } else {
    text.innerText = "¡Tienes el arma más poderosa de todas!";
    button2.innerText = "Vender arma por 15 guiles";
    button2.onclick = sellWeapon;
     }
  }
function sellWeapon (){
    if (inventory.length > 1) {
    guiles += 15;
    guilesText.innerText = guiles + 15;
    let currentWeapon = inventory.shift();
    text.innerText = "Has vendido " + currentWeapon + ".";
    text.innerText += " Tienes en tu inventario: " + inventory;
    } else {
    text.innerText = "No puedes vender tu unica arma para luchar 😅";
    }
 }
function fightSlime(){
    fighting = 0;
    goFight();
  }
function fightBeast(){
    fighting = 1;
    goFight();
  }
function fightDragon(){
    fighting = 2;
    goFight();
  }
function goFight(){
    update (locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }
function attack (){
  text.innerText = "El " + monsters[fighting].name + " ataca.";
  text.innerText += " Atacas con tu " + weapons[currentWeapon].name + ".";
  health -= monsters [fighting].level;
  monsterHealth-= weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0){
    lose();
  } else if (monsterHealth <= 0){
  fighting === 2 ? winGame(): defeatMonster();
  }
  }
function dodge (){
  text.innerText = "Has esquivado el ataque de " + monsters[fighting].name;  
  }
function defeatMonster(){
  update (locations[4]);
  guiles += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  guilesText.innerText = guiles;
  xpText.innerText = xp;
}
function lose(){
  update (locations[5]);
}
function winGame(){
  update (locations[6]);
}
function restart (){
  xp = 0;
  health = 100;
  guiles = 50;
  currentWeapon = 0;
  inventory = ["Palo"];
  guilesText.innerText = guiles;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}