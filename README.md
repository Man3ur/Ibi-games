# Ibi Games

Site web d'Ibi Games, le studio de jeux indépendant **Ibidium** : jeux PC, mobile, applis et mini-jeux jouables dans le navigateur.

## Structure

| Fichier / dossier | Rôle |
| --- | --- |
| `index.html` | Accueil |
| `Games.html` | Catalogue des jeux (onglets, recherche, cartes) |
| `Video.html` | Vidéos YouTube |
| `news.html` | Actus |
| `Contact-me.html` | Contact |
| `the-alien-fly.html` | Mini-jeu caché (clic sur l'alien de l'accueil) |
| `MOB.html` | Mini-jeu Stick Bridge |
| `404.html` | Page introuvable |
| `assets/css/main.css` | Styles de tout le site (couleurs du thème en haut du fichier) |
| `assets/js/main.js` | En-tête, pied de page, menu, mode sombre/clair, alertes de connexion |
| `assets/js/games-data.js` | **La liste des jeux** : ajoute un jeu ici, il apparaît partout |

## Ajouter du contenu

- **Un jeu** : copie un bloc dans `assets/js/games-data.js`.
- **Une vidéo** : copie une ligne `<div class="video" data-id="...">` dans `Video.html` (le `data-id` est l'identifiant de la vidéo YouTube).
- **Une actu** : copie un bloc `<article>` dans `news.html`.
- **Un lien du menu** : modifie la liste `NAV` en haut de `assets/js/main.js`.

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
