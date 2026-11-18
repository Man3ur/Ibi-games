/* ==========================================================================
   Liste des jeux et applis affichés sur le site.
   Pour ajouter un jeu : copie un bloc, change les infos, et c'est tout.
   La recherche, les onglets et la page d'accueil se mettent à jour seuls.

   category : "pc" | "mobile" | "apps" | "arcade"
   status   : "out" (disponible) | "soon" (bientôt) | "play" (jouable sur le site)
   links    : seules les plateformes renseignées sont affichées
   ========================================================================== */

const GAMES_YT = "https://www.youtube.com/channel/UClpN27KFOlOLhzwpRdubVJA";

const GAMES = [
    {
        id: "simba-game",
        title: "Simba Game",
        category: "pc",
        status: "out",
        description: "Notre premier jeu PC. Gameplay à découvrir sur YouTube.",
        tags: ["Python", "PC"],
        image: "assets/img/ufo.png",
        art: "linear-gradient(135deg, #3b1e7a, #c2410c)",
        links: { itch: "https://ibidium.itch.io/", youtube: GAMES_YT },
        featured: true,
    },
    {
        id: "pc-soon",
        title: "Projet secret",
        category: "pc",
        status: "soon",
        description: "Un nouveau jeu PC est en préparation. Suis-nous pour ne rien rater.",
        tags: ["PC"],
        art: "linear-gradient(135deg, #1f2a5a, #3a1f5a)",
        links: { youtube: GAMES_YT },
    },
    {
        id: "mobile-soon",
        title: "Jeu mobile",
        category: "mobile",
        status: "soon",
        description: "Notre premier jeu mobile arrive bientôt sur le Google Play Store.",
        tags: ["Android"],
        art: "linear-gradient(135deg, #0f5132, #1f2a5a)",
        links: { youtube: GAMES_YT },
    },
    {
        id: "mp3-player",
        title: "MP3 Player",
        category: "apps",
        status: "out",
        description: "Un lecteur de musique simple et léger. Démo sur YouTube.",
        tags: ["Python", "Appli"],
        art: "linear-gradient(135deg, #0e4f6b, #6b21a8)",
        links: { itch: "https://ibidium.itch.io/", youtube: GAMES_YT },
        featured: true,
    },
    {
        id: "the-alien-fly",
        title: "The Alien Fly",
        category: "arcade",
        status: "play",
        description: "Fais voler l'alien entre les tuyaux le plus longtemps possible.",
        tags: ["Navigateur", "Clic / Espace"],
        image: "assets/img/alien.png",
        art: "linear-gradient(135deg, #0c4a6e, #16a34a)",
        links: { play: "the-alien-fly.html" },
        featured: true,
    },
    {
        id: "stick-bridge",
        title: "Stick Bridge",
        category: "arcade",
        status: "play",
        description: "Maintiens appuyé pour allonger le bâton et traverser d'une plateforme à l'autre.",
        tags: ["Navigateur", "Tactile"],
        art: "linear-gradient(135deg, #65a30d, #ca8a04)",
        links: { play: "MOB.html" },
    },
];

const CATEGORIES = {
    pc: { label: "Jeux PC", emoji: "🖥️" },
    mobile: { label: "Jeux mobile", emoji: "📱" },
    apps: { label: "Applis", emoji: "🧰" },
    arcade: { label: "Arcade", emoji: "🕹️" },
};
