/* ==========================================================================
   Page Jeux : cartes générées depuis games-data.js, onglets, recherche
   ========================================================================== */

const STATUS_LABEL = { out: "Disponible", soon: "Bientôt", play: "Jouer ici" };

const STORE = {
    itch: (url) => `<a class="store-link" href="${url}" target="_blank" rel="noopener"><img src="assets/img/itch.png" alt="">itch.io</a>`,
    steam: (url) => `<a class="store-link" href="${url}" target="_blank" rel="noopener"><img src="assets/img/steam.png" alt="">Steam</a>`,
    playstore: (url) => `<a class="store-link" href="${url}" target="_blank" rel="noopener"><img src="assets/img/play-store.png" alt="">Google Play</a>`,
    youtube: (url) => `<a class="store-link" href="${url}" target="_blank" rel="noopener">${icon("youtube", "icon--yt")}Voir sur YouTube</a>`,
    play: (url) => `<a class="store-link" href="${url}">${icon("play", "icon--play")}Jouer dans le navigateur</a>`,
};

function cardHTML(game) {
    const links = Object.entries(game.links || {})
        .filter(([key, url]) => url && STORE[key])
        .map(([key, url]) => STORE[key](url))
        .join("");
    const cover = game.image
        ? `<img class="pixel" src="${game.image}" alt="">`
        : `<span style="font-size:3rem" aria-hidden="true">${CATEGORIES[game.category].emoji}</span>`;
    const backTitle = game.status === "soon" ? "En développement" : game.status === "play" ? "Prêt à jouer ?" : "Disponible sur";

    return `
        <article class="card" tabindex="0" data-id="${game.id}" aria-label="${game.title}">
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-cover" style="--art:${game.art}">
                        <span class="status status--${game.status}">${STATUS_LABEL[game.status]}</span>
                        ${cover}
                    </div>
                    <div class="card-body">
                        <h3>${game.title}</h3>
                        <p>${game.description}</p>
                        <div class="tags">${game.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
                    </div>
                </div>
                <div class="card-back">
                    <h3>${backTitle}</h3>
                    <div class="store-links">${links}</div>
                </div>
            </div>
        </article>`;
}

/* ---------- Rendu des onglets ---------- */
const tabList = document.querySelector(".tab-list");
const panelsWrap = document.querySelector(".tab-panels");

Object.entries(CATEGORIES).forEach(([key, cat], i) => {
    const count = GAMES.filter((g) => g.category === key).length;
    tabList.insertAdjacentHTML("beforeend", `
        <button role="tab" type="button" id="tab-${key}" aria-controls="panel-${key}"
            aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" class="tab${i === 0 ? " active-tab" : ""}">
            ${cat.emoji} ${cat.label}<span class="tab-count">${count}</span>
        </button>`);
    panelsWrap.insertAdjacentHTML("beforeend", `
        <div id="panel-${key}" role="tabpanel" aria-labelledby="tab-${key}" class="tab-content${i === 0 ? " active-tab-content" : ""}"${i === 0 ? "" : " hidden"}>
            <div class="cards">${GAMES.filter((g) => g.category === key).map(cardHTML).join("")}</div>
        </div>`);
});

const tabs = [...document.querySelectorAll(".tab")];
const panels = [...document.querySelectorAll(".tab-content")];

function showTab(index, focus = false) {
    tabs.forEach((tab, i) => {
        const active = i === index;
        tab.classList.toggle("active-tab", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i].classList.toggle("active-tab-content", active);
        panels[i].hidden = !active;
    });
    if (focus) tabs[index].focus();
    history.replaceState(null, "", "#" + tabs[index].id.replace("tab-", ""));
}

tabs.forEach((tab, i) => tab.addEventListener("click", () => showTab(i)));

// Navigation au clavier entre les onglets (flèches gauche/droite)
tabList.addEventListener("keydown", (e) => {
    const current = tabs.findIndex((t) => t.classList.contains("active-tab"));
    if (e.key === "ArrowRight") showTab((current + 1) % tabs.length, true);
    if (e.key === "ArrowLeft") showTab((current - 1 + tabs.length) % tabs.length, true);
});

// Ouvre directement un onglet via l'adresse (ex. Games.html#arcade)
const fromHash = tabs.findIndex((t) => t.id === "tab-" + location.hash.slice(1));
if (fromHash > 0) showTab(fromHash);

/* ---------- Cartes : retournement au toucher / clavier ---------- */
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        card.classList.toggle("is-flipped");
    });
    card.addEventListener("keydown", (e) => {
        if (e.target === card && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            card.classList.toggle("is-flipped");
        }
    });
});

/* ---------- Recherche avec suggestions ---------- */
const search = document.querySelector(".search");
const input = search.querySelector("input");
const suggBox = search.querySelector(".autocom-box");
const clearBtn = search.querySelector(".search-clear");
let activeIndex = -1;

const normalize = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function matches(query) {
    const q = normalize(query.trim());
    return GAMES.filter((g) => normalize(`${g.title} ${g.tags.join(" ")} ${CATEGORIES[g.category].label}`).includes(q));
}

function renderSuggestions() {
    const value = input.value;
    search.classList.toggle("has-value", value.length > 0);
    activeIndex = -1;
    if (!value.trim()) {
        search.classList.remove("active");
        input.setAttribute("aria-expanded", "false");
        return;
    }
    const results = matches(value);
    suggBox.innerHTML = results.length
        ? results.map((g, i) => `<li role="option" id="sugg-${i}" data-id="${g.id}">${g.title}<small>${CATEGORIES[g.category].label}</small></li>`).join("")
        : `<li class="empty">Aucun jeu trouvé pour « ${value.replace(/</g, "&lt;")} »</li>`;
    search.classList.add("active");
    input.setAttribute("aria-expanded", "true");
}

function select(id) {
    const game = GAMES.find((g) => g.id === id);
    if (!game) return;
    input.value = game.title;
    search.classList.remove("active");
    showTab(Object.keys(CATEGORIES).indexOf(game.category));
    const card = document.querySelector(`.card[data-id="${id}"]`);
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("is-highlighted");
    void card.offsetWidth; // relance l'animation
    card.classList.add("is-highlighted", "is-flipped");
    card.focus({ preventScroll: true });
}

input.addEventListener("input", renderSuggestions);
input.addEventListener("focus", renderSuggestions);

input.addEventListener("keydown", (e) => {
    const items = [...suggBox.querySelectorAll("li[data-id]")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (!items.length) return;
        e.preventDefault();
        activeIndex = (activeIndex + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        items.forEach((li, i) => li.setAttribute("aria-selected", String(i === activeIndex)));
        input.setAttribute("aria-activedescendant", items[activeIndex].id);
    } else if (e.key === "Enter") {
        const target = items[activeIndex] || items[0];
        if (target) select(target.dataset.id);
    } else if (e.key === "Escape") {
        search.classList.remove("active");
    }
});

suggBox.addEventListener("mousedown", (e) => {
    const li = e.target.closest("li[data-id]");
    if (li) {
        e.preventDefault();
        select(li.dataset.id);
    }
});

clearBtn.addEventListener("click", () => {
    input.value = "";
    renderSuggestions();
    input.focus();
});

document.addEventListener("click", (e) => {
    if (!search.contains(e.target)) search.classList.remove("active");
});
