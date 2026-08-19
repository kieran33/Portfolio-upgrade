# Déploiement du projet Portfolio-upgrade

Ce document décrit les étapes pour déployer l'application sur Railway.

## Prérequis

- Un compte Railway (https://railway.app)
- Le repo GitHub du projet (`Portfolio-upgrade`), avec les dossiers `backend/` (API) et le frontend à la racine (`index.html`, `script.js`, `style.css`)

## 1. Créer le service de base de données MySQL

1. Dans Railway, créer un nouveau projet.
2. Ajouter un service "Database" → MySQL.
3. Une fois créé, récupérer les identifiants de connexion générés automatiquement (`MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`) dans l'onglet "Variables" du service.

## 2. Déployer le backend

1. Ajouter un nouveau service au projet Railway → "Deploy from GitHub repo" → sélectionner `Portfolio-upgrade`.
2. Dans les paramètres du service (Settings), définir **Root Directory** sur `backend` (sans cela, Railway déploie le contenu de la racine au lieu de l'API Node.js).
3. Vérifier que `backend/package.json` contient bien le script de démarrage :
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```
4. Ajouter les variables d'environnement nécessaires à la connexion à la base (dans l'onglet Variables du service backend) :
   ```
   DB_HOST=<MYSQLHOST>
   DB_PORT=<MYSQLPORT>
   DB_USER=<MYSQLUSER>
   DB_PASSWORD=<MYSQLPASSWORD>
   DB_NAME=<MYSQLDATABASE>
   ```
5. Dans "Public Networking", cliquer sur "Generate Domain" pour obtenir une URL publique accessible pour l'API.
6. Vérifier les logs de déploiement : le message `Serveur démarré sur le port 3000` confirme que le backend tourne correctement.

## 3. Déployer le frontend

1. Ajouter un second service au même projet Railway, depuis le même repo GitHub, cette fois en laissant le Root Directory vide (racine du repo).
2. Railway détecte automatiquement les fichiers statiques et les sert via Caddy.
3. Dans "Public Networking", cliquer sur "Generate Domain", et définir le Target Port sur `8080` (port par défaut utilisé par Caddy pour le contenu statique).
4. Dans `script.js`, mettre à jour l'URL utilisée par le formulaire de contact pour pointer vers l'URL publique du backend (obtenue à l'étape 2.5), par exemple :
   ```javascript
   fetch('https://<url-backend-railway>/api/contact', { ... })
   ```

## 4. Vérification post-déploiement

1. Ouvrir l'URL publique du frontend et soumettre le formulaire de contact.
2. Vérifier dans les logs du backend que la requête est bien reçue et traitée.
3. Se connecter à la base de données MySQL (via HeidiSQL, avec les identifiants publics du service MySQL) et vérifier que le message a bien été enregistré dans la table `contact_messages`.