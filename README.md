# Portfolio Florent Detres

Portfolio professionnel moderne avec une approche "luxe discret", développé avec Next.js 15, TypeScript, Tailwind CSS et Framer Motion.

## ✨ Nouveautés

- 🌐 **Internationalisation (i18n)** - Site multilingue français/anglais avec next-intl
- 🎨 **shadcn/ui** - Composants UI professionnels et accessibles
- 🔄 **Sélecteur de langue** - Changement de langue fluide sans rechargement

## Technologies Utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Styling utility-first avec nouvelle syntaxe
- **Framer Motion** - Animations fluides et élégantes
- **shadcn/ui** - Composants UI réutilisables et accessibles
- **next-intl** - Internationalisation (i18n) pour FR/EN
- **Lucide React** - Icônes modernes

## Structure du Projet

```
portfolio-florent/
├── app/
│   ├── [locale]/           # Routes internationalisées
│   │   ├── layout.tsx      # Layout avec NextIntlClientProvider
│   │   └── page.tsx        # Page d'accueil avec toutes les sections
│   ├── layout.tsx          # Layout racine avec métadonnées SEO
│   └── globals.css         # Styles globaux et variables CSS
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Header avec navigation responsive et i18n
│   │   └── Footer.tsx      # Footer avec liens et réseaux sociaux
│   ├── sections/
│   │   ├── Hero.tsx        # Section héro avec animations
│   │   ├── Services.tsx    # Présentation des services
│   │   ├── Portfolio.tsx   # Galerie de projets filtrables
│   │   ├── About.tsx       # Section à propos avec compétences
│   │   └── Contact.tsx     # Formulaire de contact
│   ├── ui/                 # Composants shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── LanguageSwitcher.tsx # Sélecteur de langue
├── i18n/
│   ├── request.ts          # Configuration next-intl
│   └── routing.ts          # Configuration du routing i18n
├── messages/
│   ├── fr.json             # Traductions françaises
│   └── en.json             # Traductions anglaises
├── lib/
│   └── utils.ts            # Utilitaires (cn, etc.)
├── utils/
│   └── animations.ts       # Variants d'animations réutilisables
├── middleware.ts           # Middleware i18n
├── tailwind.config.ts      # Configuration Tailwind avec palette premium
└── components.json         # Configuration shadcn/ui
```

## Palette de Couleurs Premium

Le portfolio utilise une palette "luxe discret" :

- **Primary** : Tons beige/sable (du clair #faf9f7 au foncé #2d2822)
- **Dark** : Tons gris/noir (du clair #f7f7f8 au très foncé #0d0e10)
- **Accent Gold** : #D4AF37
- **Accent Copper** : #B87333
- **Accent Sage** : #87A96B

## Sections du Portfolio

### 1. Hero
- Animation d'entrée élégante
- Badge de statut professionnel
- Call-to-actions principaux
- Statistiques clés (expérience, projets, satisfaction)
- Indicateur de scroll animé

### 2. Services
- Grille de 6 services avec icônes
- Cards avec effets de hover sophistiqués
- Dégradés de couleurs uniques par service
- Call-to-action pour discussion

### 3. Portfolio
- Filtrage par catégorie
- Grid responsive de projets
- Overlay avec liens GitHub et Live
- Tags technologiques
- Animations de transition fluides

### 4. À propos
- Biographie professionnelle
- Barres de compétences animées
- Section valeurs (6 piliers)
- Timeline du parcours professionnel

### 5. Contact
- Formulaire de contact validé
- Informations de contact avec icônes
- Badge de disponibilité
- Animation de soumission
- Message de confirmation

## Animations

Le projet inclut un système d'animations réutilisables dans `utils/animations.ts` :

- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `fadeIn`
- `staggerContainer`, `staggerItem`
- `slideAndFade`, `rotateScale`
- `float`, `pulse`
- `slideFromBottom`

## Installation et Utilisation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Démarrer en mode production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🌐 Internationalisation (i18n)

Le site est disponible en **français** (par défaut) et **anglais**.

### URLs
- Français : `http://localhost:3000/` (langue par défaut)
- Anglais : `http://localhost:3000/en`

### Ajouter une traduction
1. Ouvrez `messages/fr.json` ou `messages/en.json`
2. Ajoutez votre clé de traduction
3. Utilisez-la dans vos composants avec `useTranslations` :

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('section');
  return <h1>{t('title')}</h1>;
}
```

### Ajouter une nouvelle langue
1. Créez un fichier `messages/es.json` (par exemple pour l'espagnol)
2. Ajoutez `'es'` à la liste des locales dans `i18n/routing.ts`
3. Mettez à jour `LanguageSwitcher.tsx` avec la nouvelle langue

## Personnalisation

### Modifier les couleurs
Éditez `tailwind.config.ts` pour ajuster la palette de couleurs.

### Modifier les traductions
- **Toutes les traductions** : `messages/fr.json` et `messages/en.json`
- Organisées par sections : nav, hero, services, portfolio, about, contact, footer

### Modifier le contenu
- **Services** : Éditez les traductions dans `messages/fr.json` et `messages/en.json` (clé `services.items`)
- **Projets** : Éditez les traductions dans `messages/{locale}.json` (clé `portfolio.projects`)
- **Compétences** : `components/sections/About.tsx` - tableau `skills`
- **Timeline** : Éditez les traductions dans `messages/{locale}.json` (clé `about.timeline.items`)
- **Contact** : Éditez les traductions pour les libellés du formulaire
- **Footer** : `components/layout/Footer.tsx` - tableaux `socialLinks` et `footerLinks`

### Ajouter des images
Placez vos images dans le dossier `public/` et référencez-les avec `/chemin/image.jpg`

### Ajouter des composants shadcn/ui
```bash
npx shadcn@latest add [component-name]
```

Exemples :
```bash
npx shadcn@latest add dialog
npx shadcn@latest add accordion
npx shadcn@latest add tabs
```

## Performance

Le portfolio est optimisé pour :
- ⚡ **Chargement rapide** - Code splitting automatique avec Next.js
- 📱 **Mobile-first** - Design responsive sur tous les écrans
- ♿ **Accessibilité** - Sémantique HTML et navigation au clavier
- 🎨 **Animations fluides** - 60 FPS avec Framer Motion
- 🔍 **SEO** - Métadonnées optimisées et structure sémantique

## SEO

Les métadonnées sont configurées dans `app/layout.tsx` :
- Title et description
- Open Graph
- Keywords
- Authors

## Déploiement

### Vercel (recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes
Le projet peut être déployé sur :
- Netlify
- AWS Amplify
- GitHub Pages (avec export statique)
- Railway
- Render

## Licence

Ce projet est à usage personnel. Tous droits réservés.

## Contact

**Florent Detres**
- Email : florent.detres@protonmail.com
- GitHub : [github.com/zharrow](https://github.com/zharrow)

---

Développé avec ❤ en utilisant Next.js et Tailwind CSS
