# App Budget

Application fullstack de gestion de budget personnel développée avec **Next.js**, **Prisma** et **SQLite**. Elle permet de suivre ses revenus, ses dépenses, ses objectifs d'épargne et de gérer des listes de courses, le tout depuis une interface unique.

## Fonctionnalités

-  **Tableau de bord budget** — vue d'ensemble de la situation financière
-  **Suivi des dépenses** — ajout, modification et suppression des dépenses
-  **Suivi des revenus** — gestion des entrées d'argent
-  **Objectifs d'épargne** — création et suivi de "saving goals"
-  **Listes de courses** — gestion de listes avec articles individuels (quantité, etc.)
-  **Gestion des utilisateurs**

##  Stack technique

| Domaine | Technologie |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) |
| Style | [Tailwind CSS 4](https://tailwindcss.com/) |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Base de données | SQLite (via `@prisma/adapter-libsql`) |
| Lint | ESLint 9 |

##  Structure du projet

```
app-budget/
├── prisma/
│   ├── schema.prisma          # Modèle de données
│   └── migrations/            # Historique des migrations
├── src/
│   ├── app/
│   │   ├── api/                       # Routes API (Route Handlers)
│   │   │   ├── expenses/
│   │   │   ├── incomes/
│   │   │   ├── saving-goals/
│   │   │   ├── shopping-list-items/
│   │   │   ├── shopping-lists/
│   │   │   └── users/
│   │   ├── budget/                    # Page tableau de bord
│   │   ├── expenses/                  # Page dépenses
│   │   ├── incomes/                   # Page revenus
│   │   ├── saving-goals/              # Page objectifs d'épargne
│   │   ├── shopping-lists/            # Page listes de courses
│   │   ├── layout.js
│   │   └── page.js
│   └── lib/
│       └── prisma.js           # Client Prisma partagé
├── package.json
└── prisma.config.ts
```

Chaque ressource API suit le pattern REST classique de Next.js :
- `route.js` → `GET` (liste) / `POST` (création)
- `[id]/route.js` → `GET` / `PUT` / `DELETE` sur une ressource précise

##  Installation

### Prérequis

- Node.js 18+
- npm

### Étapes

1. Cloner le repo
   ```bash
   git clone https://github.com/Noboo3472/app-budget.git
   cd app-budget
   ```

2. Installer les dépendances
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement

   Crée un fichier `.env` à la racine avec ta connexion à la base SQLite :
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. Appliquer les migrations Prisma
   ```bash
   npx prisma migrate deploy
   ```

5. Lancer le serveur de développement
   ```bash
   npm run dev
   ```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

##  Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance l'application en production |
| `npm run lint` | Vérifie le code avec ESLint |

##  Base de données

Le schéma de données est défini dans `prisma/migrations/`. Pour visualiser et explorer les données en local :

```bash
npx prisma studio
```

##  Roadmap / Améliorations possibles

- [ ] Authentification utilisateur (JWT)
- [ ] Graphiques de répartition des dépenses
- [ ] Export des données (CSV / PDF)
- [ ] Notifications de dépassement de budget

##  Licence

Projet personnel à but d'apprentissage.
