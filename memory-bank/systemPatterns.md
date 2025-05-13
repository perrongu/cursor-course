# Patterns Système

## Architecture
- Architecture basée sur Next.js App Router
- Composants React fonctionnels
- TypeScript pour le typage statique
- Intégration LangChain pour l'IA
- Supabase pour la persistance des données
- Organisation modulaire des providers
- Gestion des routes avec le système de fichiers Next.js

## Patterns de Design
- Components First: Développement basé sur les composants
- Mobile First: Design responsive partant du mobile
- Utility First: Utilisation intensive de Tailwind CSS
- Heroicons pour l'iconographie cohérente
- Providers Pattern pour la gestion d'état globale
- Hooks personnalisés pour la logique réutilisable

## Organisation du Code
```
app/
├── components/     # Composants réutilisables
├── providers/     # Providers React
├── hooks/         # Hooks personnalisés
├── api/           # Routes API
├── dashboards/    # Pages de tableaux de bord
├── layout.tsx     # Layout principal
├── page.tsx       # Page d'accueil
└── globals.css    # Styles globaux
```

## Conventions de Nommage
- PascalCase pour les composants React
- camelCase pour les variables et fonctions
- kebab-case pour les fichiers et dossiers
- Préfixe 'use' pour les hooks personnalisés
- Suffixe 'Provider' pour les providers
- Suffixe 'Page' pour les composants de page

## Standards de Code
- ESLint pour la qualité du code
- Prettier pour le formatage
- TypeScript strict mode
- Axe pour l'accessibilité
- Composants atomiques et réutilisables
- DRY (Don't Repeat Yourself)
- SOLID principles

## Patterns de Test
- Tests unitaires avec Jest
- React Testing Library pour les tests de composants
- Jest Axe pour les tests d'accessibilité
- Mocks pour les dépendances externes
- Tests d'intégration avec @testing-library/user-event
- Tests de providers et hooks
- Tests d'API routes 