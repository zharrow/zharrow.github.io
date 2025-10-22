"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Card3D } from "@/components/ui/card-3d";
import { CaseStudyModal, type CaseStudy } from "@/components/ui/case-study-modal";
import { VideoPreview } from "@/components/ui/video-preview";
import { useState } from "react";

// SVG Github icon (Lucide Github is deprecated)
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Luxury E-Commerce",
    category: "Shopify",
    description: "Boutique haut de gamme avec expérience d'achat premium",
    image: "/projects/project-1.jpg",

    client: "Marque de Luxe Française",
    duration: "3 mois",
    team: "Designer + Développeur",
    role: "Lead Developer & Shopify Expert",

    challenge: {
      title: "Le Défi",
      description: "Le client souhaitait migrer son ancienne boutique vers Shopify tout en conservant une identité premium et en améliorant drastiquement l'expérience utilisateur et les conversions.",
      points: [
        "Migration de 500+ produits depuis WooCommerce",
        "Création d'une expérience premium sur mobile et desktop",
        "Intégration d'un système de personnalisation de produits",
        "Optimisation pour un temps de chargement < 2s",
        "Mise en place d'un système de fidélité et de recommandations"
      ]
    },

    solution: {
      title: "La Solution",
      description: "J'ai développé un thème Shopify sur mesure avec des fonctionnalités avancées, en mettant l'accent sur la performance et l'expérience utilisateur premium.",
      approach: [
        {
          title: "Architecture Shopify Plus",
          description: "Utilisation de Shopify Plus avec thème custom en Liquid et JavaScript vanilla pour des performances optimales. Mise en place d'Apps personnalisées pour les besoins spécifiques."
        },
        {
          title: "Design System Premium",
          description: "Création d'un design system cohérent avec animations subtiles, typographie élégante et mise en page aérée pour refléter le positionnement haut de gamme de la marque."
        },
        {
          title: "Personnalisation Produits",
          description: "Développement d'un configurateur de produits interactif permettant aux clients de personnaliser leurs achats en temps réel avec prévisualisation 3D."
        },
        {
          title: "Optimisation Performance",
          description: "Lazy loading des images, compression automatique, CDN Shopify optimisé, et code minifié pour garantir un chargement ultra-rapide même sur mobile."
        }
      ]
    },

    stack: ["Shopify Plus", "Liquid", "JavaScript", "SCSS", "REST API"],
    tools: ["Figma", "Shopify CLI", "Git", "Google Analytics", "Hotjar"],

    results: {
      title: "Résultats & Impact",
      metrics: [
        {
          label: "Conversion",
          value: "+180%",
          description: "Augmentation du taux de conversion en 3 mois"
        },
        {
          label: "Panier Moyen",
          value: "+65%",
          description: "Hausse de la valeur moyenne des commandes"
        },
        {
          label: "Performance",
          value: "1.8s",
          description: "Temps de chargement moyen de la page"
        }
      ],
      testimonial: {
        quote: "Florent a transformé notre vision en une boutique en ligne exceptionnelle. Les ventes ont explosé et nos clients adorent la nouvelle expérience.",
        author: "Marie Dubois",
        position: "Directrice Marketing"
      }
    },

    gallery: [
      { src: "/projects/project-1.jpg", alt: "Page d'accueil", caption: "Design épuré de la page d'accueil" },
      { src: "/projects/project-1.jpg", alt: "Page produit", caption: "Configurateur de produit interactif" },
      { src: "/projects/project-1.jpg", alt: "Panier", caption: "Processus de checkout optimisé" },
      { src: "/projects/project-1.jpg", alt: "Mobile", caption: "Expérience mobile premium" }
    ],

    links: {
      live: "https://example.com",
      github: "https://github.com/zharrow"
    }
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "WordPress",
    description: "Site vitrine élégant pour cabinet d'avocats",
    image: "/projects/project-2.jpg",

    client: "Cabinet d'Avocats International",
    duration: "2 mois",
    team: "Designer + Développeur + Rédacteur",
    role: "WordPress Developer & Technical Lead",

    challenge: {
      title: "Le Défi",
      description: "Créer un site web professionnel reflétant l'expertise et le prestige du cabinet tout en facilitant la prise de contact et la découverte des services.",
      points: [
        "Refonte complète de l'identité numérique du cabinet",
        "Présentation claire de 15+ domaines d'expertise",
        "Système de prise de rendez-vous en ligne",
        "Multilingue (FR/EN/ES) pour clientèle internationale",
        "Conformité RGPD et sécurité renforcée"
      ]
    },

    solution: {
      title: "La Solution",
      description: "Développement d'un thème WordPress custom avec ACF Pro pour une flexibilité maximale et une expérience utilisateur irréprochable.",
      approach: [
        {
          title: "Thème Custom WordPress",
          description: "Création d'un thème sur mesure avec architecture modulaire, permettant une personnalisation complète des pages via Advanced Custom Fields."
        },
        {
          title: "Système Multilingue",
          description: "Intégration de WPML pour une gestion professionnelle des 3 langues avec traduction des contenus et adaptation culturelle."
        },
        {
          title: "Prise de Rendez-vous",
          description: "Développement d'un système de réservation connecté au calendrier du cabinet avec notifications automatiques par email."
        },
        {
          title: "Sécurité & Performance",
          description: "Mise en place de certificats SSL, firewall WAF, optimisation des images et mise en cache pour un score PageSpeed de 95/100."
        }
      ]
    },

    stack: ["WordPress", "PHP", "ACF Pro", "WPML", "JavaScript"],
    tools: ["Local by Flywheel", "Photoshop", "Git", "WP Rocket", "Yoast SEO"],

    results: {
      title: "Résultats & Impact",
      metrics: [
        {
          label: "Performance",
          value: "95/100",
          description: "Score Google PageSpeed Insights"
        },
        {
          label: "Contacts",
          value: "+240%",
          description: "Augmentation des demandes de consultation"
        },
        {
          label: "Rendez-vous",
          value: "150+/mois",
          description: "Réservations en ligne mensuelles"
        }
      ],
      testimonial: {
        quote: "Un site qui reflète parfaitement notre professionnalisme. Nos clients nous complimentent régulièrement sur la facilité de navigation et l'esthétique moderne.",
        author: "Maître Jean Dupont",
        position: "Associé Fondateur"
      }
    },

    gallery: [
      { src: "/projects/project-2.jpg", alt: "Accueil", caption: "Hero section avec video background" },
      { src: "/projects/project-2.jpg", alt: "Expertises", caption: "Présentation des domaines d'expertise" },
      { src: "/projects/project-2.jpg", alt: "Équipe", caption: "Profils des avocats" },
      { src: "/projects/project-2.jpg", alt: "Contact", caption: "Formulaire de prise de rendez-vous" }
    ],

    links: {
      live: "https://example.com"
    }
  },
  {
    id: 3,
    title: "Task Management SaaS",
    category: "SaaS",
    description: "Application de gestion de projets avec dashboard analytics",
    image: "/projects/project-3.jpg",

    client: "Startup Tech Parisienne",
    duration: "6 mois",
    team: "3 Développeurs + UX Designer",
    role: "Full Stack Developer & Tech Lead",

    challenge: {
      title: "Le Défi",
      description: "Développer une application SaaS complète de gestion de projets capable de rivaliser avec les leaders du marché tout en offrant une expérience utilisateur supérieure.",
      points: [
        "Architecture scalable pour supporter 10,000+ utilisateurs",
        "Interface intuitive sans courbe d'apprentissage",
        "Collaboration temps réel entre équipes",
        "Système d'analytics et de reporting avancé",
        "Sécurité enterprise-grade et conformité RGPD"
      ]
    },

    solution: {
      title: "La Solution",
      description: "Construction d'une stack moderne Next.js avec base de données PostgreSQL et déploiement sur Vercel pour des performances optimales.",
      approach: [
        {
          title: "Architecture Full Stack",
          description: "Utilisation de Next.js 14 avec App Router, React Server Components, et API Routes. Base de données PostgreSQL via Prisma ORM pour la fiabilité et la performance."
        },
        {
          title: "Temps Réel & Collaboration",
          description: "Intégration de WebSockets pour la synchronisation temps réel des modifications et la présence utilisateur. Système de permissions granulaires."
        },
        {
          title: "Dashboard Analytics",
          description: "Développement de visualisations de données interactives avec Chart.js et statistiques en temps réel sur l'avancement des projets."
        },
        {
          title: "Performance & Scalabilité",
          description: "Optimisations côté serveur avec React Server Components, caching stratégique, et déploiement edge pour des temps de réponse < 100ms."
        }
      ]
    },

    stack: ["Next.js 14", "React", "TypeScript", "PostgreSQL", "Prisma"],
    tools: ["Vercel", "Figma", "GitHub Actions", "Sentry", "Stripe"],

    results: {
      title: "Résultats & Impact",
      metrics: [
        {
          label: "Utilisateurs",
          value: "1,200+",
          description: "Utilisateurs actifs en 6 mois"
        },
        {
          label: "Satisfaction",
          value: "4.8/5",
          description: "Note moyenne sur Product Hunt"
        },
        {
          label: "Performance",
          value: "< 100ms",
          description: "Temps de réponse API moyen"
        }
      ],
      testimonial: {
        quote: "L'application dépasse nos attentes. Nos utilisateurs adorent la fluidité et la puissance des fonctionnalités. Le meilleur investissement technique que nous ayons fait.",
        author: "Thomas Martin",
        position: "CEO & Co-founder"
      }
    },

    gallery: [
      { src: "/projects/project-3.jpg", alt: "Dashboard", caption: "Vue d'ensemble des projets" },
      { src: "/projects/project-3.jpg", alt: "Kanban", caption: "Board Kanban avec drag & drop" },
      { src: "/projects/project-3.jpg", alt: "Analytics", caption: "Dashboard analytics détaillé" },
      { src: "/projects/project-3.jpg", alt: "Collaboration", caption: "Collaboration temps réel" }
    ],

    links: {
      live: "https://example.com",
      github: "https://github.com/zharrow"
    }
  },
  {
    id: 4,
    title: "Fashion Brand Store",
    category: "Shopify",
    description: "Boutique mode avec collections dynamiques",
    image: "/projects/project-4.jpg",

    client: "Marque de Mode Émergente",
    duration: "4 mois",
    team: "Designer + Développeur + Content Creator",
    role: "Shopify Developer & E-commerce Consultant",

    challenge: {
      title: "Le Défi",
      description: "Lancer une boutique en ligne pour une nouvelle marque de mode avec un budget limité mais des ambitions de croissance rapide.",
      points: [
        "Design moderne et tendance qui se démarque",
        "Collections saisonnières avec rotations fréquentes",
        "Expérience mobile-first pour une audience Gen Z",
        "Intégration sociale (Instagram Shopping)",
        "Système de pré-commandes et drops limités"
      ]
    },

    solution: {
      title: "La Solution",
      description: "Développement d'une boutique Shopify Plus avec headless frontend React pour une flexibilité maximale et des performances exceptionnelles.",
      approach: [
        {
          title: "Headless Shopify",
          description: "Utilisation de Shopify Storefront API avec frontend React custom pour un contrôle total du design et des animations."
        },
        {
          title: "Collections Dynamiques",
          description: "Système de gestion de collections automatisé avec tags et métafields, permettant des mises à jour rapides sans intervention technique."
        },
        {
          title: "Social Commerce",
          description: "Intégration complète d'Instagram Shopping, TikTok Shop, et boutons d'achat direct depuis les réseaux sociaux."
        },
        {
          title: "Drops & Pré-commandes",
          description: "Développement d'un système de countdown et de pré-commandes avec notifications par email et SMS pour créer l'urgence."
        }
      ]
    },

    stack: ["Shopify Plus", "React", "Storefront API", "GraphQL", "Tailwind CSS"],
    tools: ["Hydrogen", "Oxygen", "Klaviyo", "Instagram API", "Figma"],

    results: {
      title: "Résultats & Impact",
      metrics: [
        {
          label: "Revenus",
          value: "+250%",
          description: "Croissance des ventes en 6 mois"
        },
        {
          label: "Mobile",
          value: "78%",
          description: "Part des ventes sur mobile"
        },
        {
          label: "Social",
          value: "45%",
          description: "Conversions via réseaux sociaux"
        }
      ],
      testimonial: {
        quote: "Florent a compris notre vision et l'a surpassée. Notre boutique est devenue un véritable outil de croissance pour notre marque.",
        author: "Sophie Laurent",
        position: "Founder & Creative Director"
      }
    },

    gallery: [
      { src: "/projects/project-4.jpg", alt: "Home", caption: "Landing page avec video hero" },
      { src: "/projects/project-4.jpg", alt: "Collection", caption: "Grille de produits avec filtres" },
      { src: "/projects/project-4.jpg", alt: "Product", caption: "Page produit avec galerie" },
      { src: "/projects/project-4.jpg", alt: "Checkout", caption: "Checkout optimisé mobile" }
    ],

    links: {
      live: "https://example.com"
    }
  },
  {
    id: 5,
    title: "Restaurant Website",
    category: "WordPress",
    description: "Site avec réservation en ligne et menu interactif",
    image: "/projects/project-5.jpg",

    client: "Restaurant Gastronomique",
    duration: "2 mois",
    team: "Designer + Développeur",
    role: "WordPress Developer & UX Designer",

    challenge: {
      title: "Le Défi",
      description: "Créer une présence en ligne digne d'un restaurant étoilé avec système de réservation intégré et menu digital interactif.",
      points: [
        "Design élégant reflétant l'ambiance du restaurant",
        "Menu digital avec photos professionnelles",
        "Système de réservation avec gestion des tables",
        "Intégration des allergènes et régimes spéciaux",
        "Galerie photos et actualités régulières"
      ]
    },

    solution: {
      title: "La Solution",
      description: "Site WordPress sur mesure avec WooCommerce adapté pour les réservations et un menu digital interactif développé en JavaScript.",
      approach: [
        {
          title: "Design Gastronomique",
          description: "Création d'un design épuré et élégant avec grande typographie, images plein écran et animations subtiles reflétant le standing du restaurant."
        },
        {
          title: "Menu Interactif",
          description: "Développement d'un menu digital avec filtres par allergènes, régimes alimentaires, et catégories. Photos haute qualité et descriptions détaillées."
        },
        {
          title: "Réservations Intelligentes",
          description: "Adaptation de WooCommerce Bookings pour gérer les réservations de tables avec sélection de créneaux, nombre de convives et demandes spéciales."
        },
        {
          title: "Performance & SEO",
          description: "Optimisation des images lourdes, lazy loading, et SEO local pour apparaître en première position sur les recherches Google locales."
        }
      ]
    },

    stack: ["WordPress", "WooCommerce", "JavaScript", "PHP", "GSAP"],
    tools: ["ACF Pro", "WP Rocket", "Yoast Local SEO", "Mailchimp", "Google Maps API"],

    results: {
      title: "Résultats & Impact",
      metrics: [
        {
          label: "Réservations",
          value: "500+/mois",
          description: "Réservations en ligne mensuelles"
        },
        {
          label: "Taux de remplissage",
          value: "+40%",
          description: "Augmentation de l'occupation"
        },
        {
          label: "SEO Local",
          value: "1ère",
          description: "Position Google Maps locale"
        }
      ],
      testimonial: {
        quote: "Le site a révolutionné notre gestion. Plus besoin de téléphone pour les réservations, et nos clients adorent découvrir le menu en ligne avant de venir.",
        author: "Chef Pierre Mercier",
        position: "Chef & Propriétaire"
      }
    },

    gallery: [
      { src: "/projects/project-5.jpg", alt: "Accueil", caption: "Hero avec ambiance du restaurant" },
      { src: "/projects/project-5.jpg", alt: "Menu", caption: "Menu interactif avec filtres" },
      { src: "/projects/project-5.jpg", alt: "Réservation", caption: "Système de réservation" },
      { src: "/projects/project-5.jpg", alt: "Galerie", caption: "Galerie de plats" }
    ],

    links: {
      live: "https://example.com"
    }
  },
  {
    id: 6,
    title: "CRM Platform",
    category: "SaaS",
    description: "Solution CRM sur mesure pour PME",
    image: "/projects/project-6.jpg",

    client: "Agence de Services B2B",
    duration: "8 mois",
    team: "4 Développeurs + Product Manager",
    role: "Full Stack Developer & Database Architect",

    challenge: {
      title: "Le Défi",
      description: "Développer un CRM sur mesure adapté aux besoins spécifiques des PME françaises, plus simple et abordable que les solutions existantes.",
      points: [
        "Interface simple sans formation nécessaire",
        "Gestion complète du pipeline de vente",
        "Automatisation des tâches répétitives",
        "Rapports et analytics en temps réel",
        "Intégrations avec outils existants (emails, calendrier)"
      ]
    },

    solution: {
      title: "La Solution",
      description: "Application web moderne construite avec React et Node.js, déployée sur AWS avec architecture microservices pour la scalabilité.",
      approach: [
        {
          title: "Stack MERN Moderne",
          description: "Frontend React avec Redux pour la gestion d'état, backend Node.js/Express, et base de données MongoDB pour la flexibilité des données clients."
        },
        {
          title: "Pipeline Visuel",
          description: "Interface Kanban drag-and-drop pour visualiser et gérer le pipeline de vente avec statuts personnalisables et automatisations."
        },
        {
          title: "Automatisations",
          description: "Système d'automatisation no-code permettant de créer des workflows personnalisés (emails automatiques, rappels, tâches)."
        },
        {
          title: "Intégrations",
          description: "Connexions avec Gmail, Outlook, Google Calendar, Zapier, et webhooks pour s'intégrer à l'écosystème existant des entreprises."
        }
      ]
    },

    stack: ["React", "Node.js", "Express", "MongoDB", "Redis"],
    tools: ["AWS", "Docker", "GitHub Actions", "Stripe", "SendGrid"],

    results: {
      title: "Résultats & Impact",
      metrics: [
        {
          label: "Clients",
          value: "50+",
          description: "PME utilisatrices actives"
        },
        {
          label: "Productivité",
          value: "+60%",
          description: "Gain de temps reporté"
        },
        {
          label: "Satisfaction",
          value: "4.7/5",
          description: "Score de satisfaction client"
        }
      ],
      testimonial: {
        quote: "Enfin un CRM pensé pour les PME ! Simple, efficace, et le support est excellent. Nous avons gagné un temps fou dans notre gestion commerciale.",
        author: "Marc Durand",
        position: "Directeur Commercial"
      }
    },

    gallery: [
      { src: "/projects/project-6.jpg", alt: "Dashboard", caption: "Vue d'ensemble du pipeline" },
      { src: "/projects/project-6.jpg", alt: "Contacts", caption: "Gestion des contacts" },
      { src: "/projects/project-6.jpg", alt: "Analytics", caption: "Rapports de vente" },
      { src: "/projects/project-6.jpg", alt: "Automation", caption: "Éditeur d'automatisations" }
    ],

    links: {
      live: "https://example.com",
      github: "https://github.com/zharrow"
    }
  }
];

export default function PortfolioPremium() {
  const t = useTranslations("portfolio");
  const tCase = useTranslations("caseStudy");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCaseStudyIndex, setCurrentCaseStudyIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Fonction helper pour récupérer un projet traduit
  const getTranslatedProject = (projectId: string): CaseStudy => {
    const project = tCase.raw(`projects.${projectId}`) as Partial<CaseStudy>;
    const baseProject = caseStudies.find(p => p.id === parseInt(projectId));

    interface GalleryItem {
      alt: string;
      caption: string;
    }

    return {
      id: parseInt(projectId),
      ...project,
      image: baseProject?.image || `/projects/project-${projectId}.jpg`,
      stack: baseProject?.stack || [],
      tools: baseProject?.tools || [],
      links: baseProject?.links,
      gallery: (project.gallery as GalleryItem[] | undefined)?.map((g, idx) => ({
        src: baseProject?.gallery?.[idx]?.src || `/projects/project-${projectId}.jpg`,
        alt: g.alt,
        caption: g.caption
      }))
    } as CaseStudy;
  };

  const openCaseStudy = (index: number) => {
    setCurrentCaseStudyIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentCaseStudyIndex > 0) {
      setCurrentCaseStudyIndex(currentCaseStudyIndex - 1);
    } else if (direction === 'next' && currentCaseStudyIndex < caseStudies.length - 1) {
      setCurrentCaseStudyIndex(currentCaseStudyIndex + 1);
    }
  };

  return (
    <section id="portfolio" className="py-32 md:py-40 bg-gray-light">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-4 block">
            {t("label")}
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
            {t("title")}{" "}
            <span className="text-orange-pantone">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-secondary mt-6 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card3D
                className="h-full"
                glowColor="rgba(255, 122, 0, 0.08)"
                intensity={5}
              >
                <article className="group relative bg-white-pure overflow-hidden h-full">
              {/* Image Container with Video Preview */}
              <div
                className="relative aspect-[4/3] bg-gray-light overflow-hidden cursor-pointer"
                onClick={() => openCaseStudy(index)}
              >
                {/* Video Preview Component */}
                <VideoPreview
                  image={project.image}
                  videoSrc={undefined} // Add video path here later: `/videos/project-${project.id}.mp4`
                  alt={project.title}
                  isHovered={hoveredProject === project.id}
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black-deep/0 group-hover:bg-black-deep/20 transition-all duration-700 pointer-events-none" />

                {/* Number overlay */}
                <div className="absolute top-8 left-8 text-[120px] font-medium leading-none text-white-pure/10 group-hover:text-orange-pantone/20 transition-colors duration-700 z-10 pointer-events-none">
                  {String(project.id).padStart(2, '0')}
                </div>

                {/* Hover overlay with links - Desktop */}
                <div className="hidden md:flex absolute inset-0 bg-black-deep/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center gap-6 z-30">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCaseStudy(index);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center border border-white-pure/30 hover:border-orange-pantone hover:bg-orange-pantone text-white-pure transition-all duration-500 cursor-pointer"
                    aria-label="View case study"
                    type="button"
                  >
                    <Maximize2 size={20} />
                  </motion.button>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center border border-white-pure/30 hover:border-orange-pantone hover:bg-orange-pantone text-white-pure transition-all duration-500"
                  >
                    <GithubIcon />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center border border-white-pure/30 hover:border-orange-pantone hover:bg-orange-pantone text-white-pure transition-all duration-500"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>

                {/* Mobile buttons - Always visible */}
                <div className="md:hidden absolute bottom-4 right-4 flex gap-3 z-30">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCaseStudy(index);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 flex items-center justify-center bg-orange-pantone text-white-pure shadow-lg transition-all duration-300"
                    aria-label="View case study"
                    type="button"
                  >
                    <Maximize2 size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-10">
                {/* Title */}
                <h3 className="text-2xl font-medium text-black-deep mb-2 group-hover:text-orange-pantone transition-colors duration-500">
                  {project.title}
                </h3>

                {/* Category badge */}
                <div className="inline-block px-3 py-1 border border-black-deep/10 text-xs uppercase tracking-[0.15em] text-gray-secondary mb-6">
                  {project.category}
                </div>

                {/* Description */}
                <p className="text-gray-secondary leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-[0.15em] text-gray-secondary block mb-3">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-gray-secondary border border-black-deep/10 px-3 py-1 hover:border-orange-pantone hover:text-orange-pantone transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

                  {/* Bottom line animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-orange-pantone group-hover:w-full transition-all duration-700" />
                </article>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-secondary mb-6">
            {t("cta.text")}
          </p>
          <a
            href="https://github.com/zharrow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-500 text-sm font-medium tracking-wide uppercase group"
          >
            <GithubIcon />
            <span>{t("cta.button")}</span>
          </a>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        caseStudy={getTranslatedProject(String(caseStudies[currentCaseStudyIndex].id))}
        onNavigate={handleNavigate}
        hasPrev={currentCaseStudyIndex > 0}
        hasNext={currentCaseStudyIndex < caseStudies.length - 1}
      />
    </section>
  );
}
