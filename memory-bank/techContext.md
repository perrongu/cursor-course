# Contexte Technique

## Environnement de Développement
- Node.js
- Next.js 14+
- TypeScript 5.8+
- Tailwind CSS
- PostCSS
- Jest pour les tests

## Structure du Projet
```
dandi/
├── .next/          # Build de Next.js
├── app/            # Code source principal (App Router)
│   ├── components/ # Composants réutilisables
│   ├── providers/  # Providers React
│   ├── hooks/      # Hooks personnalisés
│   ├── api/        # Routes API
│   ├── dashboards/ # Pages de tableaux de bord
│   ├── layout.tsx  # Layout principal
│   └── page.tsx    # Page d'accueil
├── public/         # Assets statiques
├── __mocks__/      # Mocks pour les tests
├── node_modules/   # Dépendances
└── memory-bank/    # Documentation du projet
```

## Dépendances Principales
- next: ^14.2.28 - Framework React
- react/react-dom: ^18 - Bibliothèque UI
- typescript: ^5.8.3 - Support du typage statique
- tailwindcss: ^3.3.0 - Framework CSS utilitaire
- @heroicons/react: ^2.2.0 - Icônes SVG
- @langchain/core: ^0.3.55 - Core LangChain
- @langchain/openai: ^0.5.10 - Intégration OpenAI
- @langchain/community: ^0.3.42 - Communauté LangChain
- @supabase/supabase-js: ^2.49.4 - Client Supabase
- langchain: ^0.3.24 - LangChain base

## Dépendances de Développement
- jest: ^29.7.0 - Framework de test
- @testing-library/react: ^16.3.0 - Tests React
- @testing-library/user-event: ^14.6.1 - Tests d'événements
- jest-axe: ^10.0.0 - Tests d'accessibilité
- eslint: ^8 - Linting
- eslint-config-next: 14.1.0 - Config ESLint Next.js

## Scripts Disponibles
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:ci": "jest --ci --coverage",
  "test:update": "jest -u"
}
```

## Configuration
- TypeScript strict mode activé
- Tailwind configuré avec PostCSS
- Next.js avec App Router
- Jest configuré avec jsdom
- ESLint avec config Next.js
- Structure modulaire avec dossiers spécialisés
- Tests d'accessibilité avec jest-axe 