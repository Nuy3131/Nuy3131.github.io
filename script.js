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
const stoprollBtn = document.getElementById("stoprollBtn");
const resetlogBtn = document.getElementById("resetlogBtn");

const commonCElm = document.getElementById("commonC");
const rareCElm = document.getElementById("rareC");
const epicCElm = document.getElementById("epicC");
const legendaryCElm = document.getElementById("legendaryC");
const mythicalCElm = document.getElementById("mythicalC");
const rerollCElm = document.getElementById("rerollC");
const logElm = document.getElementById("log");

// DOM For Custom Roll
const cutmInput = document.getElementById('customInput');
const cutmRerollBtn = document.getElementById('customRerollBtn');

// State Variables
let rerollC = 0;

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
}
);