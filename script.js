/* =========================================================
   ASSETS
========================================================= */

const ASSET_DIRS = {

    icon: 'Assets/hero-icon/',

    portrait: 'Assets/hero-portraits/',

    splash: 'Assets/hero-wp/'

};


const HERO_FILE_OVERRIDES = {

    "X.Borg": "x-borg",

    "Yi Sun-shin": "yi-sun-shin",

    "Popol and Kupa": "popol-and-kupa"

};

function heroSlug(name){

    return (
        HERO_FILE_OVERRIDES[name] || name
    )
    .toLowerCase()
    .replace(/[’']/g,'-')
    .replace(/\./g,'-')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
    .replace(/^-|-$/g,'');

}


function heroAsset(type,name){

    const slug = heroSlug(name);

    if(type === 'icon'){
        return `${ASSET_DIRS.icon}${slug}-icon.webp`;
    }

    if(type === 'portrait'){
        return `${ASSET_DIRS.portrait}${slug}-portrait.webp`;
    }

    return `${ASSET_DIRS.splash}${slug}-wp.webp`;

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function placeholderSvg(text){

    const escaped = text
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;');

    return 'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
             width="256"
             height="256">

            <defs>
                <linearGradient
                    id="g"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1">

                    <stop stop-color="#102040"/>
                    <stop offset="1"
                          stop-color="#07101e"/>

                </linearGradient>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#g)"/>

            <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#5edbff"
                font-size="22"
                font-family="Arial">

                ${escaped}

            </text>

        </svg>
        `);

}


/*
    Tries several assets.

    Player boxes:
    WP -> portrait -> icon

    Featured:
    portrait -> WP -> icon
*/

/* =========================================================
   IMAGE LOADING
========================================================= */

function loadHeroImage(img, hero, types){

    let index = 0;

    function next(){

        if(index >= types.length){

            img.src = placeholderSvg(hero);

            return;
        }

        const type = types[index++];
        const src = heroAsset(type, hero);

        img.onerror = next;
        img.src = src;

    }

    next();
}


/* =========================================================
   PORTRAIT ONLY
========================================================= */

function loadPortraitImage(img, hero){

    const src = heroAsset('portrait', hero);

    /*
       IMPORTANT:
       Featured hero NEVER falls back to icon.
    */

    img.onerror = ()=>{

        img.onerror = null;

        img.src = placeholderSvg(hero);

    };

    img.src = src;

}   

/* =========================================================
   HERO DATABASE
========================================================= */

const HEROES = [

"Miya",
"Balmond",
"Saber",
"Alice",
"Nana",
"Tigreal",
"Alucard",
"Karina",
"Akai",
"Franco",
"Bane",
"Bruno",
"Clint",
"Rafaela",
"Eudora",
"Zilong",
"Fanny",
"Layla",
"Minotaur",
"Lolita",
"Hayabusa",
"Freya",
"Gord",
"Natalia",
"Kagura",
"Sun",
"Alpha",
"Ruby",
"Yi Sun-shin",
"Moskov",
"Johnson",
"Cyclops",
"Estes",
"Hilda",
"Aurora",
"Lapu-Lapu",
"Vexana",
"Roger",
"Karrie",
"Gatotkaca",
"Irithel",
"Harley",
"Grock",
"Argus",
"Odette",
"Lancelot",
"Diggie",
"Hylos",
"Zhask",
"Helcurt",
"Pharsa",
"Lesley",
"Jawhead",
"Angela",
"Gusion",
"Valir",
"Martis",
"Uranus",
"Hanabi",
"Chang'e",
"Kaja",
"Selena",
"Aldous",
"Claude",
"Vale",
"Leomord",
"Lunox",
"Hanzo",
"Belerick",
"Kimmy",
"Thamuz",
"Harith",
"Minsitthar",
"Kadita",
"Badang",
"Khufra",
"Granger",
"Guinevere",
"Esmeralda",
"Terizla",
"X.Borg",
"Ling",
"Dyrroth",
"Wanwan",
"Silvanna",
"Cecilion",
"Carmilla",
"Atlas",
"Popol and Kupa",
"Yu Zhong",
"Luo Yi",
"Benedetta",
"Khaleed",
"Barats",
"Brody",
"Yve",
"Mathilda",
"Paquito",
"Gloo",
"Beatrix",
"Phoveus",
"Natan",
"Aulus",
"Aamon",
"Valentina",
"Edith",
"Floryn",
"Yin",
"Melissa",
"Xavier",
"Julian",
"Fredrinn",
"Joy",
"Novaria",
"Arlott",
"Ixia",
"Nolan",
"Cici",
"Chip",
"Zhuxin",
"Suyou",
"Lukas",
"Kalea",
"Obsidia",
"Zetian",
"Marcel"

];


/* =========================================================
   ROLES
========================================================= */

const ROLE_MAP = {

"TANK":[
"Tigreal","Akai","Franco","Minotaur","Lolita",
"Johnson","Gatotkaca","Grock","Hylos","Khufra",
"Belerick","Atlas","Gloo","Edith","Chip"
],

"FIGHTER":[
"Balmond","Alucard","Zilong","Freya","Sun","Alpha",
"Ruby","Roger","Lapu-Lapu","Argus","Jawhead","Martis",
"Uranus","Aldous","Leomord","Hanzo","Thamuz",
"Minsitthar","Badang","Guinevere","Esmeralda","Terizla",
"X.Borg","Dyrroth","Silvanna","Yu Zhong","Benedetta",
"Khaleed","Barats","Paquito","Phoveus","Aulus","Yin",
"Julian","Fredrinn","Joy","Arlott","Cici","Lukas",
"Obsidia"
],

"ASSASSIN":[
"Saber","Karina","Fanny","Hayabusa","Natalia",
"Lancelot","Gusion","Helcurt","Selena","Ling",
"Aamon","Joy","Arlott","Nolan","Suyou","Hanzo"
],

"MAGE":[
"Alice","Nana","Eudora","Gord","Kagura","Cyclops",
"Aurora","Vexana","Harley","Odette","Zhask","Pharsa",
"Valir","Chang'e","Vale","Lunox","Kadita","Yve",
"Luo Yi","Cecilion","Xavier","Novaria","Zhuxin",
"Valentina","Carmilla","Zetian"
],

"MARKSMAN":[
"Miya","Bruno","Clint","Layla","Moskov","Karrie",
"Irithel","Lesley","Claude","Kimmy","Granger",
"Wanwan","Beatrix","Natan","Melissa","Ixia",
"Brody","Hanabi","Popol and Kupa"
],

"SUPPORT":[
"Rafaela","Estes","Diggie","Angela","Kaja",
"Mathilda","Floryn","Carmilla"
]

};


function getRole(hero){

    for(const role in ROLE_MAP){

        if(ROLE_MAP[role].includes(hero)){
            return role;
        }

    }

    return "FIGHTER";

}


const LANE_MAP = {

EXP:[
"Balmond","Alucard","Zilong","Freya","Sun","Alpha",
"Ruby","Lapu-Lapu","Argus","Martis","Uranus","Aldous",
"Leomord","Thamuz","Minsitthar","Badang","Guinevere",
"Esmeralda","Terizla","X.Borg","Dyrroth","Silvanna",
"Yu Zhong","Benedetta","Khaleed","Barats","Paquito",
"Phoveus","Aulus","Yin","Julian","Fredrinn","Arlott",
"Cici","Lukas"
],

MID:[
"Alice","Nana","Eudora","Gord","Kagura","Cyclops",
"Aurora","Vexana","Harley","Odette","Zhask","Pharsa",
"Valir","Chang'e","Vale","Lunox","Kadita","Yve",
"Luo Yi","Cecilion","Xavier","Novaria","Valentina",
"Zhuxin","Zetian"
],

GOLD:[
"Miya","Bruno","Clint","Layla","Moskov","Karrie",
"Irithel","Lesley","Claude","Kimmy","Granger",
"Wanwan","Beatrix","Natan","Melissa","Ixia",
"Brody","Hanabi","Popol and Kupa"
],

JUNGLE:[
"Saber","Karina","Fanny","Hayabusa","Lancelot",
"Gusion","Helcurt","Ling","Aamon","Nolan","Suyou",
"Julian","Roger","Balmond","Fredrinn","Barats",
"Joy"
],

ROAM:[
"Tigreal","Akai","Franco","Minotaur","Lolita",
"Johnson","Rafaela","Estes","Hilda","Gatotkaca",
"Grock","Hylos","Diggie","Khufra","Belerick",
"Angela","Kaja","Atlas","Carmilla","Mathilda",
"Gloo","Edith","Floryn","Chip"
]

};


function getLane(hero){

    for(const lane in LANE_MAP){

        if(LANE_MAP[lane].includes(hero)){
            return lane;
        }

    }

    return "EXP";

}


/* =========================================================
   DRAFT STATE
========================================================= */

const PICK_SEQUENCE = [
    'a','b','b','a','a',
    'b','b','a','a','b'
];


let state = {

    phase:'setup',

    format:'bo3',

    maxGames:3,

    timerMax:30,

    timer:30,

    timerRunning:false,

    timerInterval:null,

    teamA:'BLUE TEAM',

    teamB:'RED TEAM',

    playersA:[],

    playersB:[],

    score:{
        a:0,
        b:0
    },

    currentGameIndex:1,

    fearlessLocked:new Set(),

    currentDraft:{
        picksA:[],
        picksB:[],
        turnIndex:0
    },

    games:[],

    selectedHero:null,

    searchQuery:'',

    roleFilter:'ALL',

    laneFilter:'ALL'

};


/* =========================================================
   START
========================================================= */

function startDraft(){

    state.teamA =
        document.getElementById('teamA').value.trim()
        || 'BLUE TEAM';

    state.teamB =
        document.getElementById('teamB').value.trim()
        || 'RED TEAM';

    state.format =
        document.getElementById('format').value;

    state.timerMax =
        Math.max(
            5,
            Math.min(
                180,
                Number(
                    document.getElementById(
                        'timerSeconds'
                    ).value
                ) || 30
            )
        );

    state.timer = state.timerMax;

    state.maxGames =
        state.format === 'bo3'
        ? 3
        : state.format === 'bo5'
        ? 5
        : 7;


    state.playersA =
        [...document.querySelectorAll('.player-input-a')]
        .map(x=>x.value.trim() || 'Player');

    state.playersB =
        [...document.querySelectorAll('.player-input-b')]
        .map(x=>x.value.trim() || 'Player');


    state.score.a = 0;
    state.score.b = 0;

    state.currentGameIndex = 1;

    state.fearlessLocked.clear();

    state.games = [];

    state.currentDraft = {

        picksA:[],

        picksB:[],

        turnIndex:0

    };


    state.phase = 'drafting';

    document
        .getElementById('setupScreen')
        .classList.add('hidden');

    document
        .getElementById('app')
        .classList.remove('hidden');


    updateTeamNames();

    renderPlayers();

    renderAll();

    startTimer();

}


/* =========================================================
   TEAM NAMES
========================================================= */

function updateTeamNames(){

    document.getElementById('displayTeamA').textContent =
        state.teamA;

    document.getElementById('displayTeamB').textContent =
        state.teamB;

    document.getElementById('sideTeamA').textContent =
        state.teamA;

    document.getElementById('sideTeamB').textContent =
        state.teamB;

}


/* =========================================================
   PLAYER BOXES
========================================================= */

function renderPlayers(){

    const a = document.getElementById('playersA');
    const b = document.getElementById('playersB');

    a.innerHTML = '';
    b.innerHTML = '';


    for(let i=0;i<5;i++){

        a.appendChild(
            createPlayerSlot(
                'a',
                i,
                state.playersA[i]
            )
        );

        b.appendChild(
            createPlayerSlot(
                'b',
                i,
                state.playersB[i]
            )
        );

    }

}


function createPlayerSlot(team, index, name) {
    const div = document.createElement('div');
    div.className = 'player-slot ' + (team === 'a' ? 'blue' : 'red');
    div.id = `${team}-player-slot-${index}`;

    div.innerHTML = `
        <div class="player-splash">
            <img class="splash-img" id="${team}-player-splash-${index}" alt="" style="display:none;">
        </div>
        <div class="player-number">${index + 1}</div>
        <div class="player-name">${escapeHtml(name)}</div>
    `;

    return div;
}


/* =========================================================
   PLAYER HERO DISPLAY
========================================================= */

function setPlayerHero(team, index, hero) {
    const slot = document.getElementById(`${team}-player-slot-${index}`);
    const splash = document.getElementById(`${team}-player-splash-${index}`);
    const placeholder = document.getElementById(`${team}-player-placeholder-${index}`);

    if (!slot || !splash) return;

    slot.classList.add('picked');
    splash.style.display = 'block';

    loadHeroImage(splash, hero, ['splash', 'portrait', 'icon']);

    if (placeholder) {
        placeholder.style.display = 'none';
    }
}


/* =========================================================
   CLEAR PLAYER
========================================================= */

function clearPlayer(team, index) {
    const splash = document.getElementById(`${team}-player-splash-${index}`);
    const slot = document.getElementById(`${team}-player-slot-${index}`);
    const placeholder = document.getElementById(`${team}-player-placeholder-${index}`);

    if (splash) {
        splash.removeAttribute('src');
        splash.style.display = 'none';
    }

    if (slot) {
        slot.classList.remove('picked');
    }

    if (placeholder) {
        placeholder.style.display = 'grid';
    }
}


/* =========================================================
   RENDER ALL
========================================================= */

function renderAll(){

    renderPlayers();

    renderPlayerHeroes();

    renderHeroGrid();

    renderFeatured();

    renderTurn();

    renderCurrentIcons();

    renderProgress();

    updateScore();

}


/* =========================================================
   PLAYER HEROES
========================================================= */

function renderPlayerHeroes(){

    /*
       Clear all slots first.
    */

    for(let i=0;i<5;i++){

        clearPlayer('a',i);

        clearPlayer('b',i);

    }


    /*
       Blue current picks.
    */

    state.currentDraft.picksA
        .forEach((hero,index)=>{

            if(index < 5){

                setPlayerHero(
                    'a',
                    index,
                    hero
                );

            }

        });


    /*
       Red current picks.
    */

    state.currentDraft.picksB
        .forEach((hero,index)=>{

            if(index < 5){

                setPlayerHero(
                    'b',
                    index,
                    hero
                );

            }

        });


    /*
       Highlight current picker.
    */

    document
        .querySelectorAll('.player-slot')
        .forEach(x=>x.classList.remove('active'));


    const turn =
        PICK_SEQUENCE[
            state.currentDraft.turnIndex
        ];

    const pickNumber =
        turn === 'a'
        ? state.currentDraft.picksA.length
        : state.currentDraft.picksB.length;


    const active =
        document.getElementById(
            `${turn}-player-slot-${pickNumber}`
        );


    if(active){

        active.classList.add('active');

    }

}


/* =========================================================
   HERO FILTER
========================================================= */

document
    .getElementById('search')
    .addEventListener('input',e=>{

        state.searchQuery =
            e.target.value.toLowerCase();

        renderHeroGrid();

    });


document
    .getElementById('roleFilter')
    .addEventListener('change',e=>{

        state.roleFilter =
            e.target.value;

        renderHeroGrid();

    });


document
    .getElementById('laneFilter')
    .addEventListener('change',e=>{

        state.laneFilter =
            e.target.value;

        renderHeroGrid();

    });


/* =========================================================
   HERO LOCK CHECK
========================================================= */

function currentPicks(){

    return [

        ...state.currentDraft.picksA,

        ...state.currentDraft.picksB

    ];

}


function isHeroLocked(hero){

    return (

        state.fearlessLocked.has(hero)

        ||

        state.currentDraft.picksA.includes(hero)

        ||

        state.currentDraft.picksB.includes(hero)

    );

}


/* =========================================================
   HERO GRID
========================================================= */

function renderHeroGrid(){

    const grid =
        document.getElementById('heroGrid');

    grid.innerHTML = '';


    const available =
        HEROES.filter(hero=>{

            if(isHeroLocked(hero)){
                return false;
            }

            if(
                state.searchQuery &&
                !hero.toLowerCase()
                    .includes(state.searchQuery)
            ){
                return false;
            }

            if(
                state.roleFilter !== 'ALL' &&
                getRole(hero) !== state.roleFilter
            ){
                return false;
            }

            if(
                state.laneFilter !== 'ALL' &&
                getLane(hero) !== state.laneFilter
            ){
                return false;
            }

            return true;

        });


    document.getElementById(
        'availableCount'
    ).textContent =
        `${available.length} AVAILABLE`;


    available.forEach(hero=>{

        const card =
            document.createElement('button');

        card.className = 'hero-card';

        card.type = 'button';


        const img =
            document.createElement('img');

        loadHeroImage(
            img,
            hero,
            [
                'icon',
                'portrait',
                'splash'
            ]
        );


        const name =
            document.createElement('div');

        name.className =
            'hero-card-name';

        name.textContent =
            hero;


        card.appendChild(img);

        card.appendChild(name);


        card.onclick = ()=>{

            pickHero(hero);

        };


        grid.appendChild(card);

    });

}


/* =========================================================
   PICK HERO
========================================================= */

function pickHero(hero){

    if(state.phase !== 'drafting'){
        return;
    }


    if(isHeroLocked(hero)){

        showToast(
            `${hero} is unavailable`
        );

        return;

    }


    const turn =
        PICK_SEQUENCE[
            state.currentDraft.turnIndex
        ];


    if(turn === 'a'){

        if(state.currentDraft.picksA.length >= 5){

            showToast(
                'BLUE TEAM HAS COMPLETED ITS PICKS'
            );

            return;

        }

        state.currentDraft.picksA.push(hero);

    }else{

        if(state.currentDraft.picksB.length >= 5){

            showToast(
                'RED TEAM HAS COMPLETED ITS PICKS'
            );

            return;

        }

        state.currentDraft.picksB.push(hero);

    }


    state.selectedHero = hero;

    state.currentDraft.turnIndex++;


    resetTimer();

    renderAll();


    /*
       If 10 picks are complete,
       finish the draft.
    */

    if(
        state.currentDraft.turnIndex >=
        PICK_SEQUENCE.length
    ){

        setTimeout(
            finishDraft,
            500
        );

    }

}


/* =========================================================
   UNDO
========================================================= */

function undoLastPick(){

    if(state.phase !== 'drafting'){
        return;
    }

    if(state.currentDraft.turnIndex <= 0){

        showToast('NOTHING TO UNDO');

        return;

    }


    state.currentDraft.turnIndex--;


    const team =
        PICK_SEQUENCE[
            state.currentDraft.turnIndex
        ];


    if(team === 'a'){

        state.currentDraft.picksA.pop();

    }else{

        state.currentDraft.picksB.pop();

    }


    state.selectedHero =
        currentPicks().at(-1) || null;


    resetTimer();

    renderAll();

}


/* =========================================================
   FEATURED HERO
========================================================= */

function loadFeaturedImage(imgElement, heroName) {

    if (!imgElement || !heroName) return;

    imgElement.style.display = 'block';

    const portraitUrl = heroAsset('portrait', heroName);
    const splashUrl = heroAsset('splash', heroName);

    imgElement.onerror = function () {

        this.onerror = function () {

            this.onerror = null;
            this.src = placeholderSvg(heroName);

        };

        this.src = splashUrl;
    };

    imgElement.src = portraitUrl;
}


function renderFeatured() {

    const img =
        document.getElementById('featuredImage');

    const name =
        document.getElementById('featuredName');

    const status =
        document.getElementById('featuredStatus');

    const backdrop =
        document.getElementById('centerBackdrop');


    /* =====================================================
       NO HERO SELECTED
    ===================================================== */

    if (!state.selectedHero) {

        /* Hide 3D model */

        if (model) {

            model.removeAttribute('src');
            model.classList.remove('active');

        }


        /* Hide portrait */

        if (img) {

            img.removeAttribute('src');
            img.style.display = 'none';

        }


        /* Reset name */

        if (name) {

            name.textContent = '—';

        }


        /* Reset status */

        if (status) {

            status.innerHTML = 'WAITING FOR PICK';

        }


        /* Remove background */

        if (backdrop) {

            backdrop.style.backgroundImage = 'none';
            backdrop.style.opacity = '0';

        }


        return;

    }


    /* =====================================================
       CURRENT HERO
    ===================================================== */

    const hero =
        state.selectedHero;

/* =====================================================
   FEATURED PORTRAIT
===================================================== */

if (img) {

    img.style.display = 'block';

    loadFeaturedImage(
        img,
        hero
    );

}
    

    else {

        /*
           No 3D model for this hero.
           Use normal portrait.
        */

        if (!state.selectedHero) {

    if (img) {

        img.removeAttribute('src');
        img.style.display = 'none';

    }

}}


    /* =====================================================
       FIND PLAYER WHO PICKED HERO
    ===================================================== */

    let playerName = 'PLAYER';

    let teamName = '';

    let teamClass = '';


    const indexA =
        state.currentDraft.picksA.indexOf(hero);

    const indexB =
        state.currentDraft.picksB.indexOf(hero);


    if (indexA !== -1) {

        playerName =
            state.playersA[indexA]
            || `PLAYER ${indexA + 1}`;

        teamName =
            state.teamA;

        teamClass =
            'blue';

    }

    else if (indexB !== -1) {

        playerName =
            state.playersB[indexB]
            || `PLAYER ${indexB + 1}`;

        teamName =
            state.teamB;

        teamClass =
            'red';

    }


    /* =====================================================
       HERO / PLAYER NAME
    ===================================================== */

    if (name) {

        name.innerHTML = `

            <span class="featured-hero-name">
                ${escapeHtml(hero)}
            </span>

            <span class="featured-player-name">
                ${escapeHtml(playerName)}
            </span>

        `;

    }


    /* =====================================================
       HERO INFORMATION
    ===================================================== */

    if (status) {

        status.innerHTML = `

            <span class="featured-team ${teamClass}">
                ${escapeHtml(teamName)}
            </span>

            <span class="featured-role">
                ${escapeHtml(getRole(hero))}
            </span>

            <span class="featured-lane">
                ${escapeHtml(getLane(hero))}
            </span>

        `;

    }


    /* =====================================================
       CENTER BACKGROUND
    ===================================================== */

    if (backdrop) {

        const splashUrl =
            heroAsset('splash', hero);


        const test =
            new Image();


        test.onload = () => {

            backdrop.style.backgroundImage =
                `url("${splashUrl}")`;

            backdrop.style.opacity =
                '.24';

        };


        test.onerror = () => {

            const portraitUrl =
                heroAsset('portrait', hero);


            backdrop.style.backgroundImage =
                `url("${portraitUrl}")`;

            backdrop.style.opacity =
                '.20';

        };


        test.src =
            splashUrl;

    }

}

    




/* =========================================================
   TURN
========================================================= */

function renderTurn(){

    const turn =
        PICK_SEQUENCE[
            state.currentDraft.turnIndex
        ];


    document
        .getElementById('turnA')
        .classList.toggle(
            'active',
            turn === 'a'
        );


    document
        .getElementById('turnB')
        .classList.toggle(
            'active',
            turn === 'b'
        );

}


/* =========================================================
   FEARLESS LOCKED — TEAM-SPECIFIC SIDE PANELS
========================================================= */

function renderCurrentIcons(){

    const containerA =
        document.getElementById('currentIconsA');

    const containerB =
        document.getElementById('currentIconsB');

    if(containerA){
        containerA.innerHTML = '';
    }

    if(containerB){
        containerB.innerHTML = '';
    }


    /*
       Get the heroes picked by each team
       in PREVIOUS completed games only.
    */

    const lockedA = [];
    const lockedB = [];


    state.games.forEach(game => {

        game.picksA.forEach(hero => {

            if(!lockedA.includes(hero)){
                lockedA.push(hero);
            }

        });


        game.picksB.forEach(hero => {

            if(!lockedB.includes(hero)){
                lockedB.push(hero);
            }

        });

    });


    /*
       BLUE TEAM FEARLESS LOCKED
    */

    if(containerA){

        lockedA.forEach(hero => {

            const img =
                document.createElement('img');

            img.className =
                'fearless-side-icon';

            img.alt = hero;

            img.title =
                `${hero} — ${state.teamA} FEARLESS LOCKED`;

            loadHeroImage(
                img,
                hero,
                ['icon', 'portrait']
            );

            containerA.appendChild(img);

        });

    }


    /*
       RED TEAM FEARLESS LOCKED
    */

    if(containerB){

        lockedB.forEach(hero => {

            const img =
                document.createElement('img');

            img.className =
                'fearless-side-icon';

            img.alt = hero;

            img.title =
                `${hero} — ${state.teamB} FEARLESS LOCKED`;

            loadHeroImage(
                img,
                hero,
                ['icon', 'portrait']
            );

            containerB.appendChild(img);

        });

    }

}


/* =========================================================
   PROGRESS
========================================================= */

function renderProgress(){

    const current =
        state.currentDraft.turnIndex;

    const total =
        PICK_SEQUENCE.length;


    document.getElementById(
        'progressText'
    ).textContent =
        `GAME ${state.currentGameIndex} • DRAFT ${current} / ${total}`;


    document.getElementById(
        'progressFill'
    ).style.width =
        `${(current / total) * 100}%`;

}


/* =========================================================
   SCORE
========================================================= */

function updateScore() {
    const scoreA = document.getElementById('scoreA');
    const scoreB = document.getElementById('scoreB');

    if (scoreA) {
        scoreA.textContent = state.score.a;
    }

    if (scoreB) {
        scoreB.textContent = state.score.b;
    }
}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    /* Always remove any existing interval first */
    stopTimer();

    if (state.phase !== 'drafting') {
        return;
    }

    state.timerRunning = true;

    const pauseBtn =
        document.getElementById('pauseBtn');

    if (pauseBtn) {
        pauseBtn.textContent = 'PAUSE';
    }

    updateTimerDisplay();

    state.timerInterval = setInterval(() => {

        /* Stop automatically if draft is no longer active */
        if (state.phase !== 'drafting') {
            stopTimer();
            return;
        }

        /* Do nothing while paused */
        if (!state.timerRunning) {
            return;
        }

        /* Prevent going below zero */
        if (state.timer <= 0) {
            state.timer = 0;
            state.timerRunning = false;

            stopTimer();

            if (pauseBtn) {
                pauseBtn.textContent = 'RESUME';
            }

            updateTimerDisplay();

            showToast('PICK TIMER EXPIRED');

            return;
        }

        /* Countdown */
        state.timer--;

        updateTimerDisplay();

        /* Handle expiration immediately after reaching 0 */
        if (state.timer <= 0) {

            state.timer = 0;
            state.timerRunning = false;

            stopTimer();

            if (pauseBtn) {
                pauseBtn.textContent = 'RESUME';
            }

            updateTimerDisplay();

            showToast('PICK TIMER EXPIRED');
        }

    }, 1000);
}


function stopTimer() {

    if (state.timerInterval !== null) {

        clearInterval(state.timerInterval);

        state.timerInterval = null;

    }

}


/* =========================================================
   PAUSE / RESUME
========================================================= */

function toggleTimer() {

    if (state.phase !== 'drafting') {
        return;
    }

    /* If currently running → pause */
    if (state.timerRunning) {

        state.timerRunning = false;

        const pauseBtn =
            document.getElementById('pauseBtn');

        if (pauseBtn) {
            pauseBtn.textContent = 'RESUME';
        }

        return;
    }

    /* Resume */
    state.timerRunning = true;

    const pauseBtn =
        document.getElementById('pauseBtn');

    if (pauseBtn) {
        pauseBtn.textContent = 'PAUSE';
    }

}


/* =========================================================
   RESET TIMER
========================================================= */

function resetTimer() {

    state.timer =
        state.timerMax;

    updateTimerDisplay();

    /*
       IMPORTANT:
       Restart the actual interval.
       This fixes the timer stopping after
       changing turns / starting a new game.
    */

    if (state.phase === 'drafting') {
        startTimer();
    }

}


/* =========================================================
   ADD TIME
========================================================= */

function addTime(seconds) {

    if (state.phase !== 'drafting') {
        return;
    }

    state.timer += seconds;

    if (state.timer > 180) {
        state.timer = 180;
    }

    updateTimerDisplay();

}


/* =========================================================
   TIMER DISPLAY
========================================================= */

function updateTimerDisplay() {

    const timer =
        document.getElementById('timer');

    if (!timer) {
        return;
    }

    timer.textContent =
        Math.max(0, state.timer);

    timer.classList.toggle(
        'warning',
        state.timer <= 10 &&
        state.timer > 5
    );

    timer.classList.toggle(
        'danger',
        state.timer <= 5
    );

}   


/* =========================================================
   FINISH CURRENT GAME DRAFT
========================================================= */

function finishDraft(){

    if(state.phase !== 'drafting'){
        return;
    }


    stopTimer();

    state.timerRunning = false;


    const game = {

        game:
            state.currentGameIndex,

        picksA:
            [...state.currentDraft.picksA],

        picksB:
            [...state.currentDraft.picksB],

        winner:null

    };


    state.games.push(game);


    /*
       Hard Fearless:

       EVERY hero picked in this game becomes
       unavailable for all future games.
    */

    state.currentDraft.picksA
        .forEach(hero=>{
            state.fearlessLocked.add(hero);
        });


    state.currentDraft.picksB
        .forEach(hero=>{
            state.fearlessLocked.add(hero);
        });


    showResult();

}


/* =========================================================
   RESULT
========================================================= */

function showResult(){

    const overlay =
        document.createElement('div');

    overlay.className =
        'result-overlay';

    overlay.id =
        'resultOverlay';


    overlay.innerHTML = `

        <div class="result-box">

            <div style="
                color:#638095;
                font-size:8px;
                letter-spacing:3px;">
                GAME ${state.currentGameIndex}
            </div>

            <h1>
                DRAFT COMPLETE
            </h1>

            <p>
                Select the winner of this game.
            </p>

            <div class="result-buttons">

                <button onclick="
                    declareWinner('a')
                ">
                    ${escapeHtml(state.teamA)}
                </button>

                <button onclick="
                    declareWinner('b')
                ">
                    ${escapeHtml(state.teamB)}
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(overlay);

}


/* =========================================================
   DECLARE WINNER
========================================================= */

function declareWinner(team){

    const game =
        state.games[
            state.games.length - 1
        ];


    game.winner = team;


    if(team === 'a'){

        state.score.a++;

    }else{

        state.score.b++;

    }


    document
        .getElementById('resultOverlay')
        ?.remove();


    updateScore();


    /*
       Check series victory.

       BO3 = 2 wins
       BO5 = 3 wins
       BO7 = 4 wins
    */

    const requiredWins =
        Math.ceil(
            state.maxGames / 2
        );


    if(
        state.score.a >= requiredWins ||
        state.score.b >= requiredWins
    ){

        finishSeries(team);

        return;

    }


    startNextGame();

}


/* =========================================================
   NEXT GAME
========================================================= */

function startNextGame(){

    state.currentGameIndex++;

    state.currentDraft = {

        picksA:[],

        picksB:[],

        turnIndex:0

    };


    state.selectedHero = null;

    state.searchQuery = '';

    document.getElementById(
        'search'
    ).value = '';


    state.roleFilter = 'ALL';

    state.laneFilter = 'ALL';


    document.getElementById(
        'roleFilter'
    ).value = 'ALL';

    document.getElementById(
        'laneFilter'
    ).value = 'ALL';


    state.phase = 'drafting';


    renderAll();

    resetTimer();

    showToast(
        `GAME ${state.currentGameIndex} — FEARLESS DRAFT`
    );

}


/* =========================================================
   SERIES FINISH
========================================================= */

function finishSeries(winner){

    state.phase =
        'match_over';

    stopTimer();


    const winnerName =
        winner === 'a'
        ? state.teamA
        : state.teamB;


    const overlay =
        document.createElement('div');

    overlay.className =
        'result-overlay';

    overlay.id =
        'seriesOverlay';


    overlay.innerHTML = `

        <div class="result-box">

            <div style="
                color:#5edbff;
                font-size:8px;
                letter-spacing:4px;">
                SERIES COMPLETE
            </div>

            <h1>
                ${escapeHtml(winnerName)}
            </h1>

            <p>
                SERIES WINNER
            </p>

            <div style="
                font-size:30px;
                font-weight:900;
                margin:15px;">
                ${state.score.a}
                -
                ${state.score.b}
            </div>

            <button
                onclick="resetDraft()"
                style="
                    width:100%;
                    padding:13px;
                    border:1px solid #39cfff;
                    border-radius:7px;
                    background:#06273a;
                    color:white;">
                NEW SERIES
            </button>

        </div>

    `;


    document.body.appendChild(
        overlay
    );

}


/* =========================================================
   RESET
========================================================= */

function resetDraft(){

    stopTimer();

    location.reload();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message){

    const toast =
        document.getElementById(
            'toast'
        );


    toast.textContent =
        message;


    toast.classList.add('show');


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(()=>{

            toast.classList.remove(
                'show'
            );

        },1800);

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(text){

    return String(text)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;');

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    'keydown',
    e=>{

        if(
            e.key === ' ' &&
            state.phase === 'drafting'
        ){

            e.preventDefault();

            toggleTimer();

        }


        if(
            e.key.toLowerCase() === 'u' &&
            state.phase === 'drafting'
        ){

            undoLastPick();

        }


        if(
            e.key === '+' &&
            state.phase === 'drafting'
        ){

            addTime(10);

        }

    }
);


/* =========================================================
   INITIAL TIMER DISPLAY
========================================================= */

updateTimerDisplay();


window.startDraft = startDraft;
window.pickHero = pickHero;
window.undoLastPick = undoLastPick;
window.toggleTimer = toggleTimer;
window.addTime = addTime;
window.declareWinner = declareWinner;
window.resetDraft = resetDraft;