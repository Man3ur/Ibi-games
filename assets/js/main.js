/* ==========================================================================
   Ibi Games — script commun à tout le site
   - icônes SVG, en-tête et pied de page (une seule source pour toutes les pages)
   - mode sombre / clair mémorisé
   - menu mobile, écran de chargement, alerte de connexion, animations
   ========================================================================== */

const SITE = {
    name: "Ibi Games",
    studio: "Ibidium",
    since: 2022,
    email: "ibidium.official.contact@gmail.com",
    socials: {
        youtube: "https://www.youtube.com/channel/UCZjLqhss2igD9YZu-V-xcXg",
        discord: "https://discord.com/invite/AKcMAGmQmr",
        paypal: "https://www.paypal.com/paypalme/aimbotyt",
        github: "https://github.com/Man3ur/Ibi-games",
    },
};

const NAV = [
    { page: "home", href: "index.html", label: "Accueil", icon: "home" },
    { page: "games", href: "Games.html", label: "Jeux", icon: "gamepad" },
    { page: "videos", href: "Video.html", label: "Vidéos", icon: "video" },
    { page: "news", href: "news.html", label: "Actus", icon: "news" },
    { page: "contact", href: "Contact-me.html", label: "Contact", icon: "mail" },
];

/* ---------- Icônes ---------- */
const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    gamepad: '<rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6 12h4M8 10v4"/><circle cx="15.5" cy="11" r=".6" fill="currentColor"/><circle cx="17.5" cy="13" r=".6" fill="currentColor"/>',
    video: '<rect x="2" y="5" width="15" height="14" rx="3"/><path d="m17 10 5-3v10l-5-3"/>',
    news: '<path d="M4 4h13v16H6a2 2 0 0 1-2-2z"/><path d="M17 8h3v10a2 2 0 0 1-2 2"/><path d="M8 8h5M8 12h5M8 16h3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    wifi: '<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/>',
    "wifi-off": '<path d="M2 2l20 20M8.5 16a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 5-2.7M14.5 9.9A10 10 0 0 1 19 12.5M2 8.8a15 15 0 0 1 4.2-2.7M10.7 5.1A15 15 0 0 1 22 8.8"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    // Logos (Font Awesome Free, licence CC BY 4.0)
    youtube: { box: "0 0 576 512", fill: true, d: '<path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.1 337.6V175.2l142.7 81.2-142.7 81.2z"/>' },
    discord: { box: "0 0 640 512", fill: true, d: '<path d="M524.5 69.8a1.5 1.5 0 0 0-.8-.7A485 485 0 0 0 404.1 32a1.8 1.8 0 0 0-1.9.9 337.5 337.5 0 0 0-14.9 30.6 447.8 447.8 0 0 0-134.4 0 309.5 309.5 0 0 0-15.1-30.6 1.9 1.9 0 0 0-1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0-.8.7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7 348.2 348.2 0 0 0 30-48.8 1.9 1.9 0 0 0-1-2.6 321.2 321.2 0 0 1-45.9-21.9 1.9 1.9 0 0 1-.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9.2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1-.2 3.1 301.4 301.4 0 0 1-45.9 21.8 1.9 1.9 0 0 0-1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1.7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.7-23.4 59.2-52.8 59.2zm195.4 0c-29 0-52.8-26.6-52.8-59.2s23.4-59.2 52.8-59.2c29.7 0 53.3 26.8 52.8 59.2 0 32.7-23.2 59.2-52.8 59.2z"/>' },
    paypal: { box: "0 0 384 512", fill: true, d: '<path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/>' },
    github: { box: "0 0 496 512", fill: true, d: '<path d="M244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/>' },
};

/** Renvoie le code HTML d'une icône. */
function icon(name, extraClass = "") {
    const def = ICONS[name];
    if (!def) return "";
    const isObj = typeof def === "object";
    const cls = ["icon", isObj && def.fill ? "icon--fill" : "", extraClass].filter(Boolean).join(" ");
    return `<svg class="${cls}" viewBox="${isObj ? def.box : "0 0 24 24"}" aria-hidden="true">${isObj ? def.d : def}</svg>`;
}

/** Remplace chaque <i data-icon="nom"></i> présent dans la page par l'icône SVG. */
function hydrateIcons(root = document) {
    root.querySelectorAll("i[data-icon]").forEach((el) => {
        const style = el.getAttribute("style");
        el.outerHTML = icon(el.dataset.icon, el.className).replace("<svg ", style ? `<svg style="${style}" ` : "<svg ");
    });
}

/* ---------- Thème ---------- */
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem("ibi-theme", theme);
    } catch (e) { /* stockage indisponible : on ignore */ }
    const btn = document.querySelector(".theme-toggle");
    if (btn) btn.setAttribute("aria-label", theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre");
}

/* ---------- En-tête & pied de page ---------- */
function buildHeader() {
    const current = document.body.dataset.page;
    const links = NAV.map((l) =>
        `<a href="${l.href}"${l.page === current ? ' aria-current="page"' : ""}>${icon(l.icon)}<span>${l.label}</span></a>`
    ).join("");

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
        <div class="container">
            <a class="brand" href="index.html" aria-label="${SITE.name}, accueil">
                <img src="assets/img/ibi-icon.png" alt="" width="36" height="36">
                <span>${SITE.name}<small>par ${SITE.studio}</small></span>
            </a>
            <nav class="nav" id="main-nav" aria-label="Navigation principale">${links}</nav>
            <div class="nav-backdrop"></div>
            <button class="icon-btn theme-toggle" type="button">${icon("moon", "moon")}${icon("sun", "sun")}</button>
            <button class="icon-btn menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="main-nav">${icon("menu", "open")}${icon("close", "close")}</button>
        </div>`;
    document.body.prepend(header);

    header.querySelector(".theme-toggle").addEventListener("click", () => {
        setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
    });

    const menuBtn = header.querySelector(".menu-toggle");
    const toggleMenu = (open) => {
        header.classList.toggle("nav-open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    };
    menuBtn.addEventListener("click", () => toggleMenu(!header.classList.contains("nav-open")));
    header.querySelector(".nav-backdrop").addEventListener("click", () => toggleMenu(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && toggleMenu(false));

    setTheme(document.documentElement.dataset.theme || "dark");
}

function buildFooter() {
    const year = new Date().getFullYear();
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
        <div class="container">
            <p>© ${SITE.since}${year > SITE.since ? "–" + year : ""} ${SITE.studio}. Tous droits réservés.</p>
            <div class="footer-links">
                <a href="${SITE.socials.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon("youtube")}</a>
                <a href="${SITE.socials.discord}" target="_blank" rel="noopener" aria-label="Discord">${icon("discord")}</a>
                <a href="${SITE.socials.paypal}" target="_blank" rel="noopener" aria-label="PayPal">${icon("paypal")}</a>
                <a href="${SITE.socials.github}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>
            </div>
        </div>`;
    document.body.append(footer);
}

/* ---------- Écran de chargement ---------- */
function initLoader() {
    const loader = document.getElementById("preloader");
    if (!loader) return;
    const hide = () => loader.classList.add("is-hidden");
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);
    setTimeout(hide, 2500); // sécurité : on ne bloque jamais la page plus de 2,5 s
}

/* ---------- Alerte de connexion internet ---------- */
function initConnectionToast() {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
        <div class="toast offline" role="status">
            ${icon("wifi-off", "icon--status")}
            <p>Tu es hors ligne.</p>
            <button class="refreshBtn" type="button">Rafraîchir</button>
            <button class="close" type="button" aria-label="Fermer">${icon("close")}</button>
        </div>
        <div class="toast online" role="status">
            ${icon("wifi", "icon--status")}
            <p>Connexion internet rétablie.</p>
            <button class="close" type="button" aria-label="Fermer">${icon("close")}</button>
        </div>`;
    document.body.append(...wrap.children);

    const offline = document.querySelector(".toast.offline");
    const online = document.querySelector(".toast.online");
    let onlineTimer;

    window.addEventListener("offline", () => {
        online.classList.remove("active");
        offline.classList.add("active");
    });
    window.addEventListener("online", () => {
        offline.classList.remove("active");
        online.classList.add("active");
        clearTimeout(onlineTimer);
        onlineTimer = setTimeout(() => online.classList.remove("active"), 5000);
    });
    offline.querySelector(".refreshBtn").addEventListener("click", () => location.reload());
    document.querySelectorAll(".toast .close").forEach((btn) =>
        btn.addEventListener("click", () => btn.parentElement.classList.remove("active"))
    );
    if (!navigator.onLine) offline.classList.add("active");
}

/* ---------- Apparition au défilement ---------- */
function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
}

/* ---------- Vidéos YouTube légères (chargées au clic) ---------- */
function initVideos() {
    document.querySelectorAll(".video[data-id]").forEach((box) => {
        const id = box.dataset.id;
        const title = box.dataset.title || "Vidéo YouTube";
        box.innerHTML = `
            <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy">
            <button type="button" aria-label="Lire : ${title}"><span class="play">${icon("play")}</span></button>`;
        box.querySelector("button").addEventListener("click", () => {
            box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="${title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        });
    });
}

/* ---------- Fenêtres modales ---------- */
function initModals() {
    document.querySelectorAll("[data-open-modal]").forEach((btn) => {
        const dialog = document.getElementById(btn.dataset.openModal);
        if (!dialog) return;
        btn.addEventListener("click", () => dialog.showModal());
    });
    document.querySelectorAll("dialog.modal").forEach((dialog) => {
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog || e.target.closest("[data-close-modal]")) dialog.close();
        });
    });
}

/* ---------- Démarrage ---------- */
buildHeader();
buildFooter();
hydrateIcons();
initLoader();
initConnectionToast();
initReveal();
initVideos();
initModals();
