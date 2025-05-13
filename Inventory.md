# Inventaire du Projet Dandi

**Dernière mise à jour:** 2024-03-26

## Structure du Projet

### Répertoires Principaux
- `/app` - Application principale (Next.js App Router)
- `/types` - Types TypeScript globaux
- `/lib` - Utilitaires et configurations
- `/public` - Assets statiques
- `/__mocks__` - Mocks pour les tests

## Fichiers de Configuration
- `next.config.js` - Configuration Next.js
- `postcss.config.mjs` - Configuration PostCSS
- `tailwind.config.js` - Configuration Tailwind CSS
- `tsconfig.json` - Configuration TypeScript
- `.gitignore` - Configuration Git
- `next-env.d.ts` - Types Next.js

## Répertoire /app

### Fichiers Racine
- `layout.tsx` - Layout principal de l'application
  - Utilise la police Inter
  - Intègre les providers globaux
  - Structure de base avec header et main content
  - Support multilingue (fr)
  - Gestion des notifications
- `page.tsx` - Page d'accueil
- `providers.tsx` - Configuration des providers React
- `not-found.tsx` - Page 404
- `globals.css` - Styles globaux
- `favicon.ico` - Icône du site

### Sous-répertoires
- `/components` - Composants réutilisables
  - `Header` - En-tête de l'application
  - `NotificationContext` - Gestion des notifications
- `/providers` - Providers React pour la gestion d'état
  - `NextAuthProvider` - Authentification
  - `Providers` - Wrapper des providers globaux
- `/hooks` - Hooks personnalisés
- `/api` - Routes API
- `/dashboards` - Pages des tableaux de bord

## Répertoire /types
- `next-auth.d.ts` - Types pour l'authentification Next.js

## Répertoire /lib
- `supabase.ts` - Configuration et client Supabase
  - Création du client Supabase avec variables d'environnement
  - Gestion des erreurs de configuration
  - Export du client pour utilisation globale

## Variables d'Environnement Requises
- `NEXT_PUBLIC_SUPABASE_URL` - URL de l'instance Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé anonyme Supabase

## Dépendances Principales
- Next.js 14.2.28
- React 18
- TypeScript 5.8.3
- Tailwind CSS 3.3.0
- LangChain Core 0.3.55
- Supabase 2.49.4

## Dépendances de Développement
- Jest 29.7.0
- React Testing Library 16.3.0
- Jest Axe 10.0.0
- ESLint 8+

## État du Projet
- Structure de base App Router en place
- Layout et page principale créés
- Configuration des tests et de l'accessibilité en place
- Intégrations IA et base de données configurées
- Système de notifications implémenté
- Support multilingue configuré

## Prochaines Étapes
1. Développement des composants dans /app/components
2. Implémentation des fonctionnalités IA dans /app/api
3. Développement des dashboards
4. Tests des providers et hooks
5. Tests des routes API

---
*Note: Cet inventaire est maintenu automatiquement et reflète l'état actuel du projet.* 