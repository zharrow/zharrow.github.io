# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio créatif de Florent Detres - Développeur Full-Stack, UX/UI Designer et Creative Coder. Site vitrine moderne avec animations avancées et micro-interactions, inspiré des meilleures créations d'Awwwards et Dribbble.

## Development Commands

```bash
# Serveur de développement local
npx live-server . --port=3000
# Alternative Python
python -m http.server 8000
# Alternative Node.js simple
npx http-server . -p 3000

# Tests et optimisation
npx lighthouse http://localhost:3000 --view
npx web-vitals-cli http://localhost:3000

# Optimisation images (si nécessaire)
npx imagemin assets/images/* --out-dir=assets/images/optimized
```

## File Structure

```
/
├── index.html          # Structure principale HTML5 sémantique
├── style.css          # Styles CSS3 avec animations et responsive
├── script.js          # JavaScript ES6+ avec classes modulaires
├── CLAUDE.md          # Documentation développeur
└── assets/            # Ressources (images, fonts, icons)
    ├── images/
    ├── icons/
    └── fonts/
```

## Architecture & Design System

### Core Technologies
- **HTML5** : Structure sémantique avec sections accessibles
- **CSS3** : Variables custom, Flexbox/Grid, animations keyframes
- **JavaScript ES6+** : Classes modulaires, API natives (Intersection Observer)

### Design Tokens
```css
--primary-color: #6366f1     /* Indigo principal */
--secondary-color: #8b5cf6   /* Violet secondaire */
--accent-color: #06b6d4      /* Cyan accent */
--gradient-1: linear-gradient(135deg, #6366f1, #8b5cf6)
--gradient-2: linear-gradient(135deg, #06b6d4, #3b82f6)
--border-radius: 12px        /* Radius uniforme */
```

### Typography System
- **Headers** : Playfair Display (serif élégant)
- **Body** : Inter (sans-serif moderne)
- **Hierarchy** : clamp() pour responsive typography

### Animation Strategy
- **Performance** : GPU acceleration (transform/opacity)
- **Accessibility** : Respect prefers-reduced-motion
- **Progressive** : Dégradation gracieuse sur devices low-end

## JavaScript Architecture

### Core Classes
- **`Navigation`** : Menu responsive, scroll effects, smooth navigation
- **`ScrollAnimations`** : Intersection Observer, reveal animations
- **`TypingAnimation`** : Machine à écrire pour hero section
- **`InteractiveElements`** : Hover states, tilt effects, form handling
- **`CustomCursor`** : Curseur personnalisé (desktop uniquement)
- **`PerformanceOptimizer`** : Auto-détection device capabilities

### Event Management
- Debounced scroll handlers pour performance
- RAF (RequestAnimationFrame) pour animations fluides
- Passive event listeners où possible

## Content Sections

### Hero Section
- Orbes animés en arrière-plan (CSS transforms + blur)
- Éléments flottants interactifs au hover
- Animation d'entrée séquentielle des titres
- CTA buttons avec hover states avancés

### Portfolio Grid
- Cards avec effet tilt 3D au mousemove
- Overlay avec liens projet/code
- Tags technologiques
- Featured project (grid-column: span 2)

### Skills Categories
- Animation séquentielle des skill items
- Groupement par expertise (Dev, UX/UI, Creative)
- Hover effects coordonnés

## Performance Considerations

### Optimization Techniques
- Lazy loading pour images avec Intersection Observer
- Debounced scroll events (60fps target)
- CSS containment pour animations isolées
- Preload des fonts critiques
- Minification CSS/JS pour production

### Browser Support
- Modern browsers (ES6+ support)
- Graceful degradation pour animations
- Fallbacks CSS pour custom properties

## Customization Guide

### Adding New Projects
1. Dupliquer `.project-card` dans portfolio section
2. Mettre à jour `.project-info` avec contenu
3. Ajouter image dans `.project-placeholder`
4. Configurer `.project-tags` avec technologies

### Modifying Color Scheme
1. Mettre à jour CSS custom properties dans `:root`
2. Tester contraste pour accessibilité (WCAG AA)
3. Vérifier cohérence des gradients

### Adding New Sections
1. Suivre pattern HTML sémantique existant
2. Ajouter classe `.fade-in` pour scroll animations
3. Mettre à jour navigation avec nouveau lien

## Deployment Checklist

- [ ] Optimiser images (WebP + fallbacks)
- [ ] Minifier CSS/JS
- [ ] Configurer headers cache appropriés
- [ ] Tester Lighthouse scores (>90 sur toutes métriques)
- [ ] Valider HTML/CSS
- [ ] Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive sur devices réels