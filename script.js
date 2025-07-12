// Define Posibility For Family
const fmls = [
    {name: "Common Family", chance: 80},
    {name: "Rare Family", chance: 19.6},
    {name: "Epic Family", chance: 0.35},
    {name: "Legendary Family", chance: 0.05},
    {name: "Mythical Family", chance: 0.025}
];

const eppf = [
    {name: "Epic Family", chance: 99.925},
    {name: "Legendary Family", chance: 0.05},
    {name: "Mythical Fanily", chance: 0.025,}
];
const fmlsrare = {
     "Common Family": "commonf",
     "Rare Family": "raref",
     "Epic Family": "epicf",
     "Legendary Family": "legendaryf",
     "Mythical Family": "mythicalf"
};

// Counting What You Get
const fmlscount = {
    "Common Family": 0,
    "Rare Family": 0,
    "Epic Family": 0,
    "Legendary Family": 0,
    "Mythical Family": 0
};

// Epic Plus Pity
let epp = 0;
const eppC = document.getElementById("eppC")

// Return Random Family According To Possibilit
function getrandomfamily() {
    const TChance = fmls.reduce((sum,t) => sum + t.chance, 0)
    const Random = Math.random() * TChance;
    let cumuletive = 0;

    for (let fml of fmls) {
        cumuletive += fml.chance;
        if (Random <= cumuletive) {
            return fml.name;
        }
    }

    // Incase Broke
    return "Common Family";
};

// Epic+ Random Familly According To Possibility
function getepicplusfamily() {
    const TChance = eppf.reduce((sum,t) => sum + t.chance, 0)
    const Random = Math.random() * TChance;
    let cumuletive = 0;
    
    for (let epf of eppf) {
        cumuletive += epf.chance;
        if (Random <= cumuletive) {
            return epf.name;
        }
    }

    // Incase Broke
    return "Epic Family"
};

// DOM Elements
const rollBtn = document.getElementById("rollBtn");
const rollepicBtn = document.getElementById("rollepicBtn");
const rollMyt = document.getElementById("rollMth")
const resetlogBtn = document.getElementById("resetlogButton");

const commonCElm = document.getElementById("commonC");
const rareCElm = document.getElementById("rareC");
const epicCElm = document.getElementById("epicC");
const legendaryCElm = document.getElementById("legendaryC");
const mythicalCElm = document.getElementById("mythicalC");
const rerollCElm = document.getElementById("rerollC");
const logElm = document.getElementById("log");

// State Variables
let rerollC = 0;
let foundMty = false;
let arerolling = false;

function doroll(rng) {
    rerollC++;
    rerollCElm.textContent = rerollC;

    // Update Reroll Count
    rerollC.textContent = rerollC;

    epp++;
    // Check Pity Hit
    let result;
    if (epp >= 400) {
        result = getepicplusfamily();
        epp = 0;
    } else {
        result = getrandomfamily();
    }
    if (result === eppf.name) {
        epp = 0;
    }
    if (result === "Mythical Family")
        foundMty = true;

    // Update Pity Counts
    eppC.textContent = epp;

    // Update Counting
    fmlscount[result]++;

    commonCElm.textContent = fmlscount["Common Family"];
    rareCElm.textContent = fmlscount["Rare Family"];
    epicCElm.textContent = fmlscount["Epic Family"];
    legendaryCElm.textContent = fmlscount["Legendary Family"];
    mythicalCElm.textContent = fmlscount["Mythical Family"];

    // Create Text In Log
    let dom = fmlsrare[result]
    const rrs = document.createElement('p');
    rrs.classList.add(dom)
    rrs.textContent = result

    // Add New Result To Log
    logElm.prepend(rrs);
};

// Roll Button
rollBtn.addEventListener("click", (doroll));

// Roll 400 Times
rollepicBtn.addEventListener("click", () => {
    for (i = 0; i < 400; i++) {
        doroll();
    }
});

// Auto Roll Till Get Mythical
rollMyt.addEventListener("click", () => {
    if(foundMty || arerolling) return;
    arerolling = true;

    function roller() {
        if(!arerolling || foundMty) return;
        const starTime = performance.now();

        while(!foundMty && arerolling && (performance.now() - starTime) < 16){
            doroll();
        }

        // Set Delay
        setTimeout(() => {
            if (arerolling && !foundMty) {
                requestAnimationFrame(roller);
            }
        },10);
    }
    roller()
});

// Reset Log
resetlogBtn.addEventListener("click", () => {
    rerollC = 0;
    foundMty = false;
    arerolling = false;
    epp = 0;

    // Reset Display
    rerollCElm.textContent = rerollC;
    eppC.textContent = epp;

    // Reset Family Counts
    fmlscount["Common Family"] = 0;
    fmlscount["Rare Family"] = 0;
    fmlscount["Epic Family"] = 0;
    fmlscount["Legendary Family"] = 0;
    fmlscount["Mythical Family"] = 0;
    commonCElm.textContent = 0;
    rareCElm.textContent = 0;
    epicCElm.textContent = 0;
    legendaryCElm.textContent = 0;
    mythicalCElm.textContent = 0;

    // Clear Log
    logElm.innerHTML = ""
});