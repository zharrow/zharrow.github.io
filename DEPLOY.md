# 🚀 Déploiement sur GitHub Pages

Ce guide explique comment déployer ce portfolio Next.js sur GitHub Pages.

## 📋 Prérequis

- Un compte GitHub
- Git installé sur votre machine
- Node.js et npm installés

## ⚙️ Configuration

### 1. Configurer le basePath

Dans `next.config.ts`, le `basePath` est configuré pour correspondre au nom de votre repository :

```typescript
const basePath = isProduction ? '/zharrow' : '';
```

**Important** : Remplacez `/zharrow` par le nom de votre repository GitHub (par exemple `/mon-portfolio`).

### 2. Créer le repository GitHub

1. Allez sur [github.com](https://github.com)
2. Créez un nouveau repository (public ou privé)
3. Nommez-le selon votre basePath (par exemple : `zharrow`)
4. Ne cochez **PAS** "Initialize this repository with a README"

### 3. Activer GitHub Pages

1. Allez dans les **Settings** de votre repository
2. Dans la section **Pages** (menu latéral gauche)
3. Sous **Source**, sélectionnez **GitHub Actions**

## 🔧 Déploiement automatique

### Configuration initiale

```bash
# Initialisez git (si pas encore fait)
cd portfolio-florent
git init

# Ajoutez le remote
git remote add origin https://github.com/VOTRE-USERNAME/zharrow.git

# Ajoutez tous les fichiers
git add .

# Créez le premier commit
git commit -m "Initial commit"

# Poussez sur main (ou master selon votre config)
git push -u origin main
```

### Déploiement automatique

Une fois que vous pushez sur la branche `main`, GitHub Actions va automatiquement :

1. Installer les dépendances
2. Builder le site en mode export statique
3. Déployer sur GitHub Pages

Le workflow est défini dans `.github/workflows/deploy.yml`.

## 🛠️ Build manuel

Si vous voulez tester le build localement :

```bash
# Build avec export statique (désactive temporairement le middleware)
npm run build:export

# Les fichiers statiques seront dans le dossier /out
```

## 🌐 Accéder au site déployé

Après le déploiement (cela prend généralement 2-3 minutes), votre site sera disponible à :

```
https://VOTRE-USERNAME.github.io/zharrow/
```

Remplacez `VOTRE-USERNAME` et `zharrow` par vos valeurs.

## 🔄 Mises à jour

Pour déployer des mises à jour :

```bash
# Faites vos modifications
git add .
git commit -m "Description de vos changements"
git push origin main
```

Le déploiement se fera automatiquement !

## 🐛 Dépannage

### Le site ne se charge pas correctement

- Vérifiez que le `basePath` dans `next.config.ts` correspond au nom de votre repository
- Assurez-vous que GitHub Pages est activé dans les settings du repository
- Vérifiez les logs du workflow dans l'onglet "Actions" de votre repository

### Les images ne s'affichent pas

- Vérifiez que vous utilisez des chemins relatifs pour les images
- Les images doivent être dans le dossier `/public`
- Utilisez `next/image` avec `unoptimized: true` (déjà configuré)

### Le workflow échoue

- Vérifiez les logs dans l'onglet "Actions"
- Assurez-vous que votre package.json est correct
- Vérifiez que toutes les dépendances sont dans package.json

## 📝 Notes importantes

1. **Middleware** : Le middleware next-intl n'est pas compatible avec l'export statique. Le script `build:export` le désactive temporairement pendant le build.

2. **Routing i18n** : Les routes `/fr` et `/en` sont générées statiquement grâce à `generateStaticParams()`.

3. **Trailing slash** : L'option `trailingSlash: true` est activée pour une meilleure compatibilité avec GitHub Pages.

## 🎉 Résultat

Votre portfolio Next.js est maintenant déployé sur GitHub Pages avec :

- ✅ Export statique
- ✅ Internationalisation (FR/EN)
- ✅ Déploiement automatique
- ✅ Optimisations de production
- ✅ Smooth scrolling avec Lenis
- ✅ Animations Framer Motion

Profitez de votre portfolio en ligne ! 🚀
