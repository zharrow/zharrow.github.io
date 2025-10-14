// Initialize GSAP and Lenis
gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Terminal Design Manager with Interactive Commands
class TerminalManager {
    constructor() {
        this.terminalContent = null;
        this.terminalInput = null;
        this.commandHistory = [];
        this.historyIndex = -1;

        // Virtual file system
        this.currentPath = '/home/florent';
        this.fileSystem = {
            '/': {
                type: 'dir',
                contents: ['home']
            },
            '/home': {
                type: 'dir',
                contents: ['florent']
            },
            '/home/florent': {
                type: 'dir',
                contents: ['projects', 'about.txt', 'skills.json', 'cv.pdf', 'README.md']
            },
            '/home/florent/projects': {
                type: 'dir',
                contents: ['ecommerce', 'dashboard', 'mobile-app']
            },
            '/home/florent/projects/ecommerce': {
                type: 'dir',
                contents: ['README.md', 'package.json']
            },
            '/home/florent/about.txt': {
                type: 'file',
                content: 'Florent Detres - Full-Stack Developer & UX Designer\nBased in Paris, France\nPassionate about creating innovative digital experiences.'
            },
            '/home/florent/skills.json': {
                type: 'file',
                content: '{\n  "frontend": ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"],\n  "backend": ["Node.js", "Python", "PostgreSQL"],\n  "design": ["Figma", "Adobe Suite"]\n}'
            },
            '/home/florent/README.md': {
                type: 'file',
                content: '# Florent Detres Portfolio\n\nWelcome to my terminal portfolio!\n\nType `help` to see available commands.\nType `projects` to see my work.\nType `contact` to get in touch.'
            }
        };

        // Projects database
        this.projects = [
            {
                id: 'ecommerce',
                name: 'E-commerce Platform',
                status: 'Production',
                description: 'Plateforme e-commerce complète avec système de paiement intégré, gestion de stock en temps réel et interface d\'administration avancée.',
                tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
                year: '2024',
                links: {
                    demo: 'https://demo.example.com',
                    github: 'https://github.com/florentdetres/ecommerce'
                }
            },
            {
                id: 'dashboard',
                name: 'Analytics Dashboard',
                status: 'Production',
                description: 'Dashboard interactif de visualisation de données avec graphiques en temps réel, export de rapports et système d\'alertes personnalisé.',
                tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'WebSockets'],
                year: '2024',
                links: {
                    demo: 'https://dashboard.example.com',
                    github: 'https://github.com/florentdetres/dashboard'
                }
            },
            {
                id: 'mobile-app',
                name: 'Mobile App Design',
                status: 'Beta',
                description: 'Application mobile innovante avec design system complet, prototypes interactifs et documentation UX détaillée.',
                tech: ['Figma', 'React Native', 'TypeScript', 'Expo'],
                year: '2023',
                links: {
                    figma: 'https://figma.com/file/...',
                    github: 'https://github.com/florentdetres/mobile-app'
                }
            }
        ];

        // Available commands organized by category
        this.commands = {
            // === PORTFOLIO COMMANDS ===
            help: {
                description: 'Affiche la liste des commandes disponibles',
                usage: 'help [category]',
                category: 'portfolio',
                execute: (args) => this.showHelp(args)
            },
            about: {
                description: 'Affiche des informations sur Florent Detres',
                usage: 'about',
                category: 'portfolio',
                execute: () => this.showAbout()
            },
            skills: {
                description: 'Affiche les compétences techniques',
                usage: 'skills [categorie]',
                category: 'portfolio',
                execute: (args) => this.showSkills(args)
            },
            projects: {
                description: 'Liste tous les projets disponibles',
                usage: 'projects',
                category: 'portfolio',
                execute: () => this.listProjects()
            },
            show: {
                description: 'Affiche les détails d\'un projet spécifique',
                usage: 'show <project-id>',
                category: 'portfolio',
                execute: (args) => this.showProject(args)
            },
            contact: {
                description: 'Affiche les informations de contact',
                usage: 'contact',
                category: 'portfolio',
                execute: () => this.showContact()
            },
            neofetch: {
                description: 'Affiche les informations système et profil',
                usage: 'neofetch',
                category: 'portfolio',
                execute: () => this.showNeofetch()
            },
            timeline: {
                description: 'Affiche le parcours professionnel',
                usage: 'timeline',
                category: 'portfolio',
                execute: () => this.showTimeline()
            },
            github: {
                description: 'Afficher les statistiques GitHub',
                usage: 'github',
                category: 'portfolio',
                execute: () => this.showGithub()
            },

            // === SYSTEM COMMANDS ===
            clear: {
                description: 'Efface le contenu du terminal',
                usage: 'clear',
                category: 'system',
                execute: () => this.clearTerminal()
            },
            whoami: {
                description: 'Affiche l\'identité du développeur',
                usage: 'whoami',
                category: 'system',
                execute: () => this.showWhoami()
            },
            echo: {
                description: 'Affiche un message',
                usage: 'echo <message>',
                category: 'system',
                execute: (args) => this.echo(args)
            },
            ls: {
                description: 'Liste les fichiers et dossiers',
                usage: 'ls [path]',
                category: 'system',
                execute: (args) => this.listDirectory(args)
            },
            cd: {
                description: 'Change de répertoire',
                usage: 'cd <path>',
                category: 'system',
                execute: (args) => this.changeDirectory(args)
            },
            pwd: {
                description: 'Affiche le répertoire courant',
                usage: 'pwd',
                category: 'system',
                execute: () => this.printWorkingDirectory()
            },
            cat: {
                description: 'Affiche le contenu d\'un fichier',
                usage: 'cat <file>',
                category: 'system',
                execute: (args) => this.catFile(args)
            },

            // === EFFECTS (hidden from main help) ===
            animate: {
                description: 'Menu d\'animations disponibles',
                usage: 'animate [effect]',
                category: 'effects',
                execute: (args) => this.showAnimate(args)
            },
            theme: {
                description: 'Changer le thème du terminal',
                usage: 'theme [name]',
                category: 'effects',
                execute: (args) => this.changeTheme(args)
            },
            glitch: {
                description: 'Activer l\'effet glitch',
                usage: 'glitch',
                category: 'effects',
                execute: () => this.activateGlitch()
            },
            particles: {
                description: 'Activer/désactiver les particules',
                usage: 'particles [on/off]',
                category: 'effects',
                execute: (args) => this.toggleParticles(args)
            },
            sound: {
                description: 'Activer/désactiver les sons',
                usage: 'sound [on/off]',
                category: 'effects',
                execute: (args) => this.toggleSound(args)
            },

            // === EASTER EGGS (hidden) ===
            sudo: {
                description: 'Essayer d\'exécuter en tant que superutilisateur',
                usage: 'sudo <command>',
                category: 'hidden',
                execute: (args) => this.easterEggSudo(args)
            },
            'rm': {
                description: 'Supprimer des fichiers (attention!)',
                usage: 'rm [options] <file>',
                category: 'hidden',
                execute: (args) => this.easterEggRm(args)
            },
            hack: {
                description: '??? Commande mystérieuse',
                usage: 'hack',
                category: 'hidden',
                execute: () => this.easterEggHack()
            },
            matrix: {
                description: 'Entrer dans la Matrice',
                usage: 'matrix',
                category: 'hidden',
                execute: () => this.easterEggMatrix()
            },
            coffee: {
                description: 'Prendre une pause café',
                usage: 'coffee',
                category: 'hidden',
                execute: () => this.easterEggCoffee()
            },
            snake: {
                description: 'Jouer au jeu Snake',
                usage: 'snake',
                category: 'hidden',
                execute: () => this.playSnake()
            }
        };

        // Settings
        this.soundEnabled = false;
        this.particlesEnabled = false;
        this.currentTheme = 'default';
        this.konamiCode = [];
        this.konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        this.init();
    }

    init() {
        this.showTerminalDesign();
        this.setupTerminal();
    }

    showTerminalDesign() {
        // Hide original content
        document.querySelectorAll('body > *:not(.design-layout):not(script)').forEach(el => {
            el.style.display = 'none';
        });

        // Show terminal design
        const terminalLayout = document.getElementById('terminal-design');
        if (terminalLayout) {
            terminalLayout.style.display = 'block';
            terminalLayout.style.opacity = '1';
            terminalLayout.style.visibility = 'visible';
        }
    }

    setupTerminal() {
        this.terminalContent = document.getElementById('terminal-content');
        this.terminalInput = document.getElementById('terminal-input');

        if (!this.terminalInput) return;

        // Focus on terminal input
        this.terminalInput.focus();

        // Handle terminal click to focus input
        document.querySelector('.terminal-body').addEventListener('click', () => {
            this.terminalInput.focus();
        });

        // Handle enter key
        this.terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleCommand();
                this.hideSuggestions();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            } else if (e.key === 'Escape') {
                this.hideSuggestions();
            }
        });

        // Handle input for suggestions
        this.terminalInput.addEventListener('input', () => {
            this.showSuggestions();
            if (this.soundEnabled) this.playTypingSound();
        });

        // Konami code listener
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.key);
            if (this.konamiCode.length > 10) this.konamiCode.shift();

            if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
                this.activateKonamiCode();
                this.konamiCode = [];
            }
        });

        // Animate ASCII art on load
        this.animateAsciiArt();

        // Console Easter Egg
        this.consoleEasterEgg();
    }

    handleCommand() {
        const input = this.terminalInput.value.trim();

        if (!input) return;

        // Add to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;

        // Display command
        this.addCommandLine(input);

        // Parse and execute command
        const [cmd, ...args] = input.split(' ');
        const command = this.commands[cmd.toLowerCase()];

        if (command) {
            command.execute(args);
        } else {
            this.showError(`Command not found: ${cmd}. Type 'help' for available commands.`);
        }

        // Clear input
        this.terminalInput.value = '';

        // Scroll to bottom
        this.scrollToBottom();
    }

    addCommandLine(command) {
        const inputLine = document.getElementById('input-line');
        inputLine.classList.remove('active');
        inputLine.querySelector('.cursor').style.display = 'none';

        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        newLine.innerHTML = `
            <span class="prompt">florent@portfolio:~$</span>
            <span class="command">${this.escapeHtml(command)}</span>
        `;

        this.terminalContent.insertBefore(newLine, inputLine);
    }

    addOutput(html) {
        const inputLine = document.getElementById('input-line');
        const output = document.createElement('div');
        output.className = 'terminal-output';
        output.innerHTML = html;

        this.terminalContent.insertBefore(output, inputLine);

        // Animate output with anime.js - optimized
        anime({
            targets: output,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }

    showHelp(args) {
        const category = args[0]?.toLowerCase();

        let html = '<div class="command-section">';
        html += '<div class="command-title">📋 Available Commands</div><br>';

        if (category === 'all') {
            // Show all commands including hidden
            const categories = {
                'Portfolio': 'portfolio',
                'System': 'system',
                'Effects': 'effects',
                'Easter Eggs': 'hidden'
            };

            for (const [catName, catKey] of Object.entries(categories)) {
                html += `<p class="highlight-cmd">${catName}:</p>`;
                html += '<ul class="command-list">';
                for (const [name, info] of Object.entries(this.commands)) {
                    if (info.category === catKey) {
                        html += `
                            <li class="command-item">
                                <span class="command-name">${name}</span>
                                <span class="command-desc">${info.description}</span>
                            </li>
                        `;
                    }
                }
                html += '</ul><br>';
            }
        } else {
            // Show only portfolio and system commands
            html += '<p class="highlight-cmd">Portfolio:</p>';
            html += '<ul class="command-list">';
            for (const [name, info] of Object.entries(this.commands)) {
                if (info.category === 'portfolio') {
                    html += `
                        <li class="command-item">
                            <span class="command-name">${name}</span>
                            <span class="command-desc">${info.description}</span>
                        </li>
                    `;
                }
            }
            html += '</ul><br>';

            html += '<p class="highlight-cmd">System:</p>';
            html += '<ul class="command-list">';
            for (const [name, info] of Object.entries(this.commands)) {
                if (info.category === 'system') {
                    html += `
                        <li class="command-item">
                            <span class="command-name">${name}</span>
                            <span class="command-desc">${info.description}</span>
                        </li>
                    `;
                }
            }
            html += '</ul><br>';

            html += '<p style="color: #8b949e;">💡 Tip: Type <span class="command-name">help all</span> to see all commands including effects and easter eggs!</p>';
        }

        html += '</div>';
        this.addOutput(html);
    }

    clearTerminal() {
        // Keep only the initial whoami output and input line
        const children = Array.from(this.terminalContent.children);
        const inputLine = document.getElementById('input-line');

        children.forEach((child) => {
            // Ne pas supprimer les 2 premières lignes (whoami + hint) ni l'input line
            if (child !== inputLine && child.previousElementSibling && child.previousElementSibling.previousElementSibling) {
                child.remove();
            }
        });

        // Réactiver l'input line et le curseur
        inputLine.classList.add('active');
        const cursor = inputLine.querySelector('.cursor');
        if (cursor) {
            cursor.style.display = '';
        }

        // Refocus sur l'input
        this.terminalInput.focus();
    }

    showAbout() {
        const html = `
            <div class="command-section">
                <div class="command-title">👨‍💻 About Me</div>
                <p>Développeur Full-Stack passionné et Designer créatif basé à Paris.</p>
                <p>Je combine expertise technique et vision artistique pour créer</p>
                <p>des solutions digitales innovantes et des expériences utilisateur mémorables.</p>
                <br>
                <p><span class="highlight-cmd">🎯 Spécialisations:</span></p>
                <p>  • Développement Web (Frontend & Backend)</p>
                <p>  • Design UX/UI & Prototypage</p>
                <p>  • Creative Coding & Animations</p>
                <p>  • Architecture Applicative</p>
                <br>
                <p><span class="success-message">💼 Statut: Disponible pour nouveaux projets</span></p>
            </div>
        `;
        this.addOutput(html);
    }

    showSkills(args) {
        const skillsData = {
            frontend: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
            backend: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
            design: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'Design Systems', 'User Research'],
            animation: ['GSAP', 'Anime.js', 'Framer Motion', 'CSS Animations', 'Canvas', 'WebGL'],
            tools: ['Git', 'VS Code', 'Docker', 'AWS', 'Webpack', 'Vite']
        };

        let html = '<div class="command-section">';
        html += '<div class="command-title">🛠️ Technical Skills</div><br>';

        if (args.length > 0 && skillsData[args[0]]) {
            // Show specific category
            const category = args[0];
            html += `<p class="highlight-cmd">${category.toUpperCase()}:</p>`;
            html += '<div class="skills-list">';
            skillsData[category].forEach(skill => {
                html += `<span class="skill-badge">${skill}</span>`;
            });
            html += '</div>';
        } else {
            // Show all skills in grid
            html += '<div class="skills-grid-terminal">';
            for (const [category, skills] of Object.entries(skillsData)) {
                html += `
                    <div class="skill-category-terminal">
                        <div class="skill-category-title">${category.toUpperCase()}</div>
                        <div class="skills-list">
                            ${skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
            html += '</div>';
        }

        html += '</div>';
        this.addOutput(html);
    }

    listProjects() {
        let html = '<div class="command-section">';
        html += '<div class="command-title">📂 Projects Portfolio</div>';
        html += '<br>';

        this.projects.forEach((project, index) => {
            html += `
                <div class="project-preview" style="margin-bottom: 1rem;">
                    <p><span class="highlight-cmd">${index + 1}. ${project.name}</span>
                    <span class="project-status">${project.status}</span></p>
                    <p style="color: #8b949e; padding-left: 1.5rem;">ID: <span class="command-name">${project.id}</span> | Year: ${project.year}</p>
                    <p style="color: #8b949e; padding-left: 1.5rem;">Use <span class="command-name">show ${project.id}</span> for details</p>
                </div>
            `;
        });

        html += '</div>';
        this.addOutput(html);
    }

    showProject(args) {
        if (args.length === 0) {
            this.showError('Usage: show <project-id>. Use "projects" to list available projects.');
            return;
        }

        const projectId = args[0].toLowerCase();
        const project = this.projects.find(p => p.id === projectId);

        if (!project) {
            this.showError(`Project "${projectId}" not found. Use "projects" to list available projects.`);
            return;
        }

        let html = `
            <div class="project-card-terminal">
                <div class="project-header">
                    <div class="project-title-terminal">${project.name}</div>
                    <div class="project-status">${project.status}</div>
                </div>
                <div class="project-description">${project.description}</div>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-meta" style="color: #8b949e; margin-bottom: 1rem;">
                    📅 Year: ${project.year}
                </div>
                <div class="project-links">
                    ${Object.entries(project.links).map(([key, url]) =>
                        `<a href="${url}" class="project-link-terminal" target="_blank">
                            🔗 ${key.charAt(0).toUpperCase() + key.slice(1)}
                        </a>`
                    ).join('')}
                </div>
            </div>
        `;

        this.addOutput(html);

        // Animate project card with anime.js - optimized
        setTimeout(() => {
            const card = document.querySelector('.project-card-terminal:last-child');
            if (card) {
                anime({
                    targets: card,
                    scale: [0.98, 1],
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        }, 50);
    }

    showContact() {
        const html = `
            <div class="command-section">
                <div class="command-title">📬 Contact Information</div>
                <br>
                <p><span class="highlight-cmd">Email:</span></p>
                <p>  📧 contact@florentdetres.com</p>
                <br>
                <p><span class="highlight-cmd">Social:</span></p>
                <p>  🔗 <a href="https://linkedin.com/in/florentdetres" target="_blank" style="color: #58a6ff;">LinkedIn</a></p>
                <p>  💻 <a href="https://github.com/florentdetres" target="_blank" style="color: #58a6ff;">GitHub</a></p>
                <p>  🐦 <a href="https://twitter.com/florentdetres" target="_blank" style="color: #58a6ff;">Twitter</a></p>
                <br>
                <p><span class="success-message">💡 N'hésitez pas à me contacter pour discuter de vos projets !</span></p>
            </div>
        `;
        this.addOutput(html);
    }

    showWhoami() {
        const html = `
            <div class="command-section">
                <div class="ascii-art">
███████╗██╗      ██████╗ ██████╗ ███████╗███╗   ██╗████████╗
██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝████╗  ██║╚══██╔══╝
█████╗  ██║     ██║   ██║██████╔╝█████╗  ██╔██╗ ██║   ██║
██╔══╝  ██║     ██║   ██║██╔══██╗██╔══╝  ██║╚██╗██║   ██║
██║     ███████╗╚██████╔╝██║  ██║███████╗██║ ╚████║   ██║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
                </div>
                <p>Creative Developer & UX Designer</p>
                <p>Location: Paris, France</p>
                <p>Status: Available for projects</p>
            </div>
        `;
        this.addOutput(html);
    }

    echo(args) {
        const message = args.join(' ');
        this.addOutput(`<p>${this.escapeHtml(message)}</p>`);
    }

    showNeofetch() {
        const html = `
            <div class="neofetch-container">
                <div class="neofetch-logo">
                    <pre class="neofetch-ascii">
    ███████╗██████╗
    ██╔════╝██╔══██╗
    █████╗  ██║  ██║
    ██╔══╝  ██║  ██║
    ██║     ██████╔╝
    ╚═╝     ╚═════╝ </pre>
                </div>
                <div class="neofetch-info">
                    <p class="neofetch-title"><span class="highlight-cmd">florent</span>@<span class="highlight-cmd">portfolio</span></p>
                    <p class="neofetch-separator">─────────────────────────────</p>
                    <p><span class="neofetch-key">OS:</span> Developer Edition 2024</p>
                    <p><span class="neofetch-key">Host:</span> Paris, France 🇫🇷</p>
                    <p><span class="neofetch-key">Kernel:</span> Full-Stack Developer</p>
                    <p><span class="neofetch-key">Uptime:</span> 3+ years experience</p>
                    <p><span class="neofetch-key">Shell:</span> JavaScript, Python, TypeScript</p>
                    <p><span class="neofetch-key">Resolution:</span> Pixel Perfect</p>
                    <p><span class="neofetch-key">WM:</span> React, Vue.js</p>
                    <p><span class="neofetch-key">Theme:</span> Modern & Creative</p>
                    <p><span class="neofetch-key">Icons:</span> Figma, Adobe Suite</p>
                    <p><span class="neofetch-key">Terminal:</span> GSAP, Anime.js</p>
                    <p><span class="neofetch-key">CPU:</span> Problem Solving (8 cores)</p>
                    <p><span class="neofetch-key">GPU:</span> Creative Vision Pro</p>
                    <p><span class="neofetch-key">Memory:</span> Unlimited Learning</p>
                    <br>
                    <div class="neofetch-colors">
                        <span class="color-box" style="background: #ff7b72;"></span>
                        <span class="color-box" style="background: #ffa657;"></span>
                        <span class="color-box" style="background: #f0883e;"></span>
                        <span class="color-box" style="background: #3fb950;"></span>
                        <span class="color-box" style="background: #58a6ff;"></span>
                        <span class="color-box" style="background: #bc8cff;"></span>
                        <span class="color-box" style="background: #d2a8ff;"></span>
                        <span class="color-box" style="background: #c9d1d9;"></span>
                    </div>
                </div>
            </div>
        `;
        this.addOutput(html);
    }

    showTimeline() {
        const timeline = [
            {
                year: '2024',
                title: 'Senior Full-Stack Developer',
                company: 'Freelance',
                description: 'Développement de solutions web innovantes pour divers clients',
                tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
                icon: '🚀'
            },
            {
                year: '2023',
                title: 'Full-Stack Developer & UX Designer',
                company: 'Tech Startup',
                description: 'Conception et développement d\'applications web modernes',
                tech: ['Vue.js', 'Python', 'Figma', 'Docker'],
                icon: '💼'
            },
            {
                year: '2022',
                title: 'Frontend Developer',
                company: 'Digital Agency',
                description: 'Création d\'interfaces utilisateur interactives et responsive',
                tech: ['JavaScript', 'CSS3', 'GSAP', 'WebGL'],
                icon: '🎨'
            },
            {
                year: '2021',
                title: 'Début du parcours développeur',
                company: 'Formation Intensive',
                description: 'Apprentissage des fondamentaux du développement web',
                tech: ['HTML', 'CSS', 'JavaScript', 'Git'],
                icon: '📚'
            }
        ];

        let html = '<div class="timeline-container">';
        html += '<div class="command-title">📅 Professional Timeline</div><br>';

        timeline.forEach((event, index) => {
            html += `
                <div class="timeline-item" style="animation-delay: ${index * 0.1}s;">
                    <div class="timeline-marker">${event.icon}</div>
                    <div class="timeline-content">
                        <div class="timeline-year">${event.year}</div>
                        <div class="timeline-title">${event.title}</div>
                        <div class="timeline-company">${event.company}</div>
                        <div class="timeline-description">${event.description}</div>
                        <div class="timeline-tech">
                            ${event.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        this.addOutput(html);

        // Animate timeline items
        setTimeout(() => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                anime({
                    targets: item,
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    duration: 600,
                    delay: index * 100,
                    easing: 'easeOutQuad'
                });
            });
        }, 50);
    }

    showError(message) {
        this.addOutput(`<p class="error-message">❌ ${this.escapeHtml(message)}</p>`);
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.terminalInput.value = '';
            }
        }
    }

    autocomplete() {
        const input = this.terminalInput.value.trim().toLowerCase();
        if (!input) return;

        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            const html = `<p style="color: #8b949e;">Possible commands: ${matches.join(', ')}</p>`;
            this.addOutput(html);
        }
    }

    scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        if (terminalBody) {
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            });
        }
    }

    animateAsciiArt() {
        const asciiArt = document.querySelector('.ascii-art');
        if (asciiArt) {
            anime({
                targets: asciiArt,
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 600,
                easing: 'easeOutQuad'
            });
        }
    }

    showSuggestions() {
        const input = this.terminalInput.value.trim().toLowerCase();

        // Remove existing suggestions
        this.hideSuggestions();

        if (!input || input.length < 1) return;

        // Find matching commands
        const matches = Object.entries(this.commands)
            .filter(([cmd]) => cmd.startsWith(input))
            .slice(0, 5);

        if (matches.length === 0) return;

        // Create suggestions container
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'command-suggestions';
        suggestionsDiv.id = 'command-suggestions';

        matches.forEach(([cmd, info]) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `
                <span class="suggestion-cmd">${cmd}</span>
                <span class="suggestion-desc">${info.description}</span>
            `;

            item.addEventListener('click', () => {
                this.terminalInput.value = cmd;
                this.hideSuggestions();
                this.terminalInput.focus();
            });

            suggestionsDiv.appendChild(item);
        });

        // Position suggestions above input
        const inputLine = document.getElementById('input-line');
        inputLine.style.position = 'relative';
        inputLine.appendChild(suggestionsDiv);

        // Animate suggestions
        anime({
            targets: suggestionsDiv,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }

    hideSuggestions() {
        const suggestions = document.getElementById('command-suggestions');
        if (suggestions) {
            suggestions.remove();
        }
    }

    // ==================== FILE SYSTEM COMMANDS ====================

    listDirectory(args) {
        const targetPath = args.length > 0 ? this.resolvePath(args[0]) : this.currentPath;
        const dir = this.fileSystem[targetPath];

        if (!dir) {
            this.showError(`ls: cannot access '${args[0]}': No such file or directory`);
            return;
        }

        if (dir.type !== 'dir') {
            this.showError(`ls: ${args[0]}: Not a directory`);
            return;
        }

        let html = '<div class="ls-output">';
        html += `<p style="color: #8b949e;">Listing: ${targetPath}</p><br>`;
        html += '<div class="file-grid">';

        dir.contents.forEach(item => {
            const itemPath = `${targetPath}/${item}`.replace('//', '/');
            const itemData = this.fileSystem[itemPath];
            const isDir = itemData && itemData.type === 'dir';
            const icon = isDir ? '📁' : '📄';
            const color = isDir ? '#79c0ff' : '#c9d1d9';

            html += `
                <div class="file-item-ls">
                    <span style="color: ${color};">${icon} ${item}</span>
                </div>
            `;
        });

        html += '</div></div>';
        this.addOutput(html);
    }

    changeDirectory(args) {
        if (args.length === 0) {
            this.currentPath = '/home/florent';
            this.addOutput(`<p class="success-message">Changed to home directory: ${this.currentPath}</p>`);
            this.updatePrompt();
            return;
        }

        const targetPath = this.resolvePath(args[0]);
        const dir = this.fileSystem[targetPath];

        if (!dir) {
            this.showError(`cd: ${args[0]}: No such file or directory`);
            return;
        }

        if (dir.type !== 'dir') {
            this.showError(`cd: ${args[0]}: Not a directory`);
            return;
        }

        this.currentPath = targetPath;
        this.addOutput(`<p class="success-message">Changed directory to: ${this.currentPath}</p>`);
        this.updatePrompt();
    }

    printWorkingDirectory() {
        this.addOutput(`<p style="color: #79c0ff;">${this.currentPath}</p>`);
    }

    catFile(args) {
        if (args.length === 0) {
            this.showError('cat: missing file operand');
            return;
        }

        const targetPath = this.resolvePath(args[0]);
        const file = this.fileSystem[targetPath];

        if (!file) {
            this.showError(`cat: ${args[0]}: No such file or directory`);
            return;
        }

        if (file.type === 'dir') {
            this.showError(`cat: ${args[0]}: Is a directory`);
            return;
        }

        const html = `
            <div class="cat-output">
                <p style="color: #8b949e;">File: ${targetPath}</p>
                <pre style="color: #c9d1d9; white-space: pre-wrap; margin-top: 1rem;">${file.content}</pre>
            </div>
        `;
        this.addOutput(html);
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }

        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }

        if (path === '.') {
            return this.currentPath;
        }

        return `${this.currentPath}/${path}`.replace('//', '/');
    }

    updatePrompt() {
        // Update all prompts to show current directory
        const prompts = document.querySelectorAll('.prompt');
        const shortPath = this.currentPath.replace('/home/florent', '~');
        prompts.forEach(prompt => {
            prompt.textContent = `florent@portfolio:${shortPath}$`;
        });
    }

    // ==================== EASTER EGGS ====================

    easterEggSudo(args) {
        const html = `
            <p class="error-message">❌ Nice try! This is a portfolio, not a real terminal 😎</p>
            <p style="color: #8b949e;">florent is not in the sudoers file. This incident will be reported.</p>
            <p style="color: #8b949e;">...to absolutely nobody because this is just a portfolio 🎭</p>
        `;
        this.addOutput(html);
    }

    easterEggRm(args) {
        if (args.includes('-rf') && (args.includes('/') || args.includes('*'))) {
            const html = '<p class="warning-message">⚠️ Deleting everything...</p>';
            this.addOutput(html);

            setTimeout(() => {
                this.matrixEffect(() => {
                    this.clearTerminal();
                    const successHtml = `
                        <p class="success-message">✅ Just kidding! Your data is safe 😄</p>
                        <p style="color: #8b949e;">Did you really think I'd let you destroy my portfolio?</p>
                    `;
                    this.addOutput(successHtml);
                });
            }, 1000);
        } else {
            this.addOutput(`<p class="error-message">rm: cannot remove '${args.join(' ')}': No such file or directory</p>`);
        }
    }

    easterEggHack() {
        const html = '<p class="success-message">🔓 Initiating hacking sequence...</p>';
        this.addOutput(html);

        const hackMessages = [
            'Connecting to mainframe...',
            'Bypassing firewall...',
            'Decrypting passwords...',
            'Accessing database...',
            'Downloading files...',
            'Clearing traces...',
            'HACK COMPLETE! 💀'
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < hackMessages.length) {
                const color = index === hackMessages.length - 1 ? '#3fb950' : '#58a6ff';
                this.addOutput(`<p style="color: ${color};">${hackMessages[index]}</p>`);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    this.addOutput(`<p class="warning-message">⚠️ Just kidding! You've been pranked 😂</p>`);
                }, 500);
            }
        }, 400);
    }

    easterEggMatrix() {
        if (this.particlesEnabled) {
            this.addOutput('<p class="warning-message">Matrix effect already active!</p>');
            return;
        }

        this.addOutput('<p class="success-message">🟢 Entering the Matrix...</p>');
        this.toggleParticles(['on']);
    }

    easterEggCoffee() {
        const html = `
            <div class="coffee-container">
                <pre class="coffee-art">
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        &lt;_____________&gt; ___
        |             |/ _ \\
        |    COFFEE   | | | |
        |   _________ |_| |_|
        |  |_________|  | |
      /_|_____________|__| |___
      |_________________|____|__/
                </pre>
                <p class="success-message">☕ Time for a coffee break!</p>
                <p style="color: #8b949e; text-align: center;">Remember: Code is better with coffee ☕</p>
                <p style="color: #8b949e; text-align: center;">Pro tip: <span class="command-name">help</span> to see all commands</p>
            </div>
        `;
        this.addOutput(html);
    }

    activateKonamiCode() {
        const html = `
            <div class="konami-container">
                <p class="success-message">🎮 KONAMI CODE ACTIVATED! 🎮</p>
                <pre class="konami-art">
    ⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ 🅱️ 🅰️
                </pre>
                <p style="color: #79c0ff; text-align: center;">✨ You've unlocked SUPER DEV MODE! ✨</p>
                <p style="color: #8b949e; text-align: center;">All features are now enhanced with extra style! 💫</p>
            </div>
        `;
        this.addOutput(html);

        // Activate special effects
        document.body.style.animation = 'rainbow 3s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }

    consoleEasterEgg() {
        const styles = {
            title: 'color: #58a6ff; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(88, 166, 255, 0.5);',
            subtitle: 'color: #79c0ff; font-size: 14px;',
            message: 'color: #c9d1d9; font-size: 12px;',
            highlight: 'color: #3fb950; font-weight: bold;'
        };

        console.log('%c🎨 Welcome to Florent\'s Portfolio Terminal!', styles.title);
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
        console.log('%cYou found the secret console Easter Egg! 🎉', styles.message);
        console.log('%cTry typing these commands in the terminal:', styles.message);
        console.log('%c• matrix', styles.highlight);
        console.log('%c• hack', styles.highlight);
        console.log('%c• sudo', styles.highlight);
        console.log('%c• Try the Konami Code: ↑↑↓↓←→←→BA', styles.highlight);
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
        console.log('%cWanna work together? Type "contact" in the terminal!', styles.message);
    }

    // ==================== GITHUB ====================

    showGithub() {
        const html = `
            <div class="github-container">
                <div class="command-title">
                    <span style="font-size: 1.5rem;">🐙</span> GitHub Statistics
                </div>
                <br>
                <div class="github-stats">
                    <div class="stat-card">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Repositories</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">1.2K+</div>
                        <div class="stat-label">Commits</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">200+</div>
                        <div class="stat-label">Stars</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">30+</div>
                        <div class="stat-label">Followers</div>
                    </div>
                </div>
                <br>
                <p><span class="highlight-cmd">Most Used Languages:</span></p>
                <div class="language-bars">
                    <div class="language-bar">
                        <div class="language-label">JavaScript</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: 40%; background: #f0db4f;"></div>
                        </div>
                        <div class="language-percent">40%</div>
                    </div>
                    <div class="language-bar">
                        <div class="language-label">TypeScript</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: 25%; background: #3178c6;"></div>
                        </div>
                        <div class="language-percent">25%</div>
                    </div>
                    <div class="language-bar">
                        <div class="language-label">Python</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: 20%; background: #3776ab;"></div>
                        </div>
                        <div class="language-percent">20%</div>
                    </div>
                    <div class="language-bar">
                        <div class="language-label">CSS</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: 15%; background: #264de4;"></div>
                        </div>
                        <div class="language-percent">15%</div>
                    </div>
                </div>
                <br>
                <p style="text-align: center;">
                    <a href="https://github.com/florentdetres" target="_blank" style="color: #58a6ff;">
                        🔗 Visit GitHub Profile
                    </a>
                </p>
            </div>
        `;
        this.addOutput(html);
    }

    // ==================== ANIMATE ====================

    showAnimate(args) {
        if (args.length === 0) {
            const html = `
                <div class="command-section">
                    <div class="command-title">✨ Available Animations</div>
                    <br>
                    <p><span class="command-name">animate shake</span> - Shake the terminal</p>
                    <p><span class="command-name">animate pulse</span> - Pulse effect</p>
                    <p><span class="command-name">animate bounce</span> - Bounce animation</p>
                    <p><span class="command-name">animate flip</span> - Flip the terminal</p>
                    <p><span class="command-name">animate rainbow</span> - Rainbow colors</p>
                </div>
            `;
            this.addOutput(html);
        } else {
            const effect = args[0].toLowerCase();
            const terminal = document.querySelector('.terminal-container');

            switch(effect) {
                case 'shake':
                    terminal.style.animation = 'shake 0.5s';
                    break;
                case 'pulse':
                    terminal.style.animation = 'pulse 1s';
                    break;
                case 'bounce':
                    terminal.style.animation = 'bounce 1s';
                    break;
                case 'flip':
                    terminal.style.animation = 'flip 1s';
                    break;
                case 'rainbow':
                    terminal.style.animation = 'rainbow 3s infinite';
                    setTimeout(() => terminal.style.animation = '', 3000);
                    break;
                default:
                    this.showError(`Unknown animation: ${effect}`);
                    return;
            }

            setTimeout(() => {
                terminal.style.animation = '';
            }, 1000);

            this.addOutput(`<p class="success-message">✨ Animation "${effect}" activated!</p>`);
        }
    }

    // ==================== THEME ====================

    changeTheme(args) {
        if (args.length === 0) {
            const html = `
                <div class="command-section">
                    <div class="command-title">🎨 Available Themes</div>
                    <br>
                    <p><span class="command-name">theme default</span> - Green on dark (classic)</p>
                    <p><span class="command-name">theme matrix</span> - Matrix green</p>
                    <p><span class="command-name">theme hacker</span> - Black & green</p>
                    <p><span class="command-name">theme retro</span> - Amber terminal</p>
                    <p><span class="command-name">theme ocean</span> - Blue theme</p>
                    <p><span class="command-name">theme dracula</span> - Purple theme</p>
                </div>
            `;
            this.addOutput(html);
            return;
        }

        const theme = args[0].toLowerCase();
        const terminal = document.getElementById('terminal-design');
        const body = document.querySelector('.terminal-body');

        const themes = {
            default: { bg: '#1a1a1a', bodyBg: '#0d1117', text: '#00ff41', accent: '#58a6ff' },
            matrix: { bg: '#0d0d0d', bodyBg: '#000000', text: '#00ff00', accent: '#00ff00' },
            hacker: { bg: '#000000', bodyBg: '#000000', text: '#00ff41', accent: '#00ff41' },
            retro: { bg: '#1a1a1a', bodyBg: '#0d1117', text: '#ffb000', accent: '#ffd700' },
            ocean: { bg: '#0a1929', bodyBg: '#001e3c', text: '#00b4d8', accent: '#90e0ef' },
            dracula: { bg: '#282a36', bodyBg: '#1e1f29', text: '#bd93f9', accent: '#ff79c6' }
        };

        if (!themes[theme]) {
            this.showError(`Unknown theme: ${theme}`);
            return;
        }

        const selectedTheme = themes[theme];
        terminal.style.background = selectedTheme.bg;
        body.style.background = selectedTheme.bodyBg;
        terminal.style.color = selectedTheme.text;

        document.documentElement.style.setProperty('--terminal-text', selectedTheme.text);
        document.documentElement.style.setProperty('--terminal-accent', selectedTheme.accent);

        this.currentTheme = theme;
        this.addOutput(`<p class="success-message">🎨 Theme changed to "${theme}"!</p>`);
    }

    // ==================== GLITCH ====================

    activateGlitch() {
        const terminal = document.querySelector('.terminal-container');
        terminal.classList.add('glitch-effect');

        this.addOutput('<p class="success-message">⚡ Glitch effect activated!</p>');

        setTimeout(() => {
            terminal.classList.remove('glitch-effect');
        }, 3000);
    }

    // ==================== PARTICLES ====================

    toggleParticles(args) {
        const state = args[0]?.toLowerCase();

        if (state === 'on' || (!state && !this.particlesEnabled)) {
            this.particlesEnabled = true;
            this.createMatrixRain();
            this.addOutput('<p class="success-message">✨ Particles activated!</p>');
        } else {
            this.particlesEnabled = false;
            const canvas = document.getElementById('matrix-canvas');
            if (canvas) canvas.remove();
            this.addOutput('<p class="success-message">Particles deactivated!</p>');
        }
    }

    createMatrixRain() {
        // Remove existing canvas
        const existing = document.getElementById('matrix-canvas');
        if (existing) existing.remove();

        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            opacity: 0.3;
        `;
        document.getElementById('terminal-design').appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            if (!this.particlesEnabled) return;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            requestAnimationFrame(draw);
        };

        draw();
    }

    matrixEffect(callback) {
        this.toggleParticles(['on']);
        setTimeout(() => {
            this.toggleParticles(['off']);
            if (callback) callback();
        }, 2000);
    }

    // ==================== SOUND ====================

    toggleSound(args) {
        const state = args[0]?.toLowerCase();

        if (state === 'on' || (!state && !this.soundEnabled)) {
            this.soundEnabled = true;
            this.addOutput('<p class="success-message">🔊 Sound effects enabled!</p>');
        } else {
            this.soundEnabled = false;
            this.addOutput('<p class="success-message">🔇 Sound effects disabled!</p>');
        }
    }

    playTypingSound() {
        // Create simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.05;

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
    }

    // ==================== SNAKE GAME ====================

    playSnake() {
        const html = `
            <div class="snake-game-container">
                <div class="command-title">🐍 Snake Game</div>
                <p style="color: #8b949e;">Use Arrow keys to move. Press ESC to quit.</p>
                <canvas id="snake-canvas" width="400" height="400" style="border: 2px solid #58a6ff; margin: 1rem 0; background: #0d1117;"></canvas>
                <div class="snake-score">Score: <span id="snake-score">0</span></div>
            </div>
        `;
        this.addOutput(html);

        setTimeout(() => {
            this.initSnakeGame();
        }, 100);
    }

    initSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let score = 0;
        let gameActive = true;

        const keyHandler = (e) => {
            if (!gameActive) return;

            if (e.key === 'Escape') {
                gameActive = false;
                this.addOutput('<p class="warning-message">Game ended! Final score: ' + score + '</p>');
                document.removeEventListener('keydown', keyHandler);
                return;
            }

            if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
            if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
            if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
            if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
        };

        document.addEventListener('keydown', keyHandler);

        const gameLoop = () => {
            if (!gameActive) return;

            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // Check collision with walls
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameActive = false;
                this.addOutput('<p class="error-message">💥 Game Over! You hit the wall. Score: ' + score + '</p>');
                document.removeEventListener('keydown', keyHandler);
                return;
            }

            // Check collision with self
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameActive = false;
                this.addOutput('<p class="error-message">💥 Game Over! You hit yourself. Score: ' + score + '</p>');
                document.removeEventListener('keydown', keyHandler);
                return;
            }

            snake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score++;
                document.getElementById('snake-score').textContent = score;
                food = {
                    x: Math.floor(Math.random() * tileCount),
                    y: Math.floor(Math.random() * tileCount)
                };
            } else {
                snake.pop();
            }

            // Draw
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = '#00ff41';
            snake.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? '#3fb950' : '#00ff41';
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });

            // Draw food
            ctx.fillStyle = '#ff7b72';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

            setTimeout(() => requestAnimationFrame(gameLoop), 100);
        };

        gameLoop();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleSmoothScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Navbar background on scroll
        if (scrolled > 100) {
            this.nav.style.background = 'rgba(255, 255, 255, 0.95)';
            this.nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.nav.style.background = 'rgba(255, 255, 255, 0.9)';
            this.nav.style.boxShadow = 'none';
        }

        // Parallax effect for hero elements
        const heroOrbs = document.querySelectorAll('.gradient-orb');
        heroOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    handleMobileMenu() {
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.animateToggle();
        });

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.resetToggle();
            });
        });
    }

    animateToggle() {
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.resetToggle();
        }
    }

    resetToggle() {
        const spans = this.navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }

    handleSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        this.createObserver();
        this.addAnimationClasses();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        // Observe elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            this.observer.observe(el);
        });
    }

    addAnimationClasses() {
        // Add fade-in class to elements that should animate on scroll
        const animateElements = [
            '.about-content',
            '.skill-category',
            '.project-card',
            '.contact-content'
        ];

        animateElements.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('fade-in');
                el.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
}

// Typing animation for hero section
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.opacity = '1';

            setTimeout(() => {
                this.typeText(subtitle, text, 30);
            }, 1200);
        }
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Interactive elements
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.handleFloatingElements();
        this.handleProjectCards();
        this.handleSkillCards();
        this.handleContactForm();
    }

    handleFloatingElements() {
        const elements = document.querySelectorAll('.element');

        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.1) rotate(5deg)';
                element.style.zIndex = '10';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
                element.style.zIndex = '';
            });
        });
    }

    handleProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.tiltCard(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.tiltCard(card, false);
            });

            card.addEventListener('mousemove', (e) => {
                this.updateCardTilt(card, e);
            });
        });
    }

    tiltCard(card, enter) {
        if (enter) {
            card.style.transition = 'none';
        } else {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-10px)';
        }
    }

    updateCardTilt(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }

    handleSkillCards() {
        const skillCategories = document.querySelectorAll('.skill-category');

        skillCategories.forEach(category => {
            const skillItems = category.querySelectorAll('.skill-item');

            category.addEventListener('mouseenter', () => {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'scale(1.05)';
                        item.style.background = 'var(--primary-color)';
                        item.style.color = 'white';
                    }, index * 50);
                });
            });

            category.addEventListener('mouseleave', () => {
                skillItems.forEach(item => {
                    item.style.transform = '';
                    item.style.background = '';
                    item.style.color = '';
                });
            });
        });
    }

    handleContactForm() {
        const form = document.querySelector('.contact-form');
        const inputs = form.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--primary-color)';
                input.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    handleFormSubmit(form) {
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.background = 'var(--gradient-2)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '';
                submitBtn.style.pointerEvents = '';
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    }
}

// Cursor animation
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.createCursor();
        this.handleMouseMove();
        this.handleInteractiveElements();
        this.isInitialized = true;
    }

    // Method to reinitialize cursor for new design
    reinitialize() {
        if (this.isInitialized) {
            this.updateCursorTheme();
            this.handleInteractiveElements();
        }
    }

    // Update cursor appearance for terminal design
    updateCursorTheme() {
        if (!this.cursor || !this.follower) return;

        // Apply terminal design cursor styles
        this.cursor.style.background = '#00ff41';
        this.cursor.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.4)';
        this.follower.style.borderColor = '#00ff41';
        this.follower.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.2)';
    }

    createCursor() {
        // Only create custom cursor on desktop
        if (window.innerWidth < 768) return;

        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;

        this.follower = document.createElement('div');
        this.follower.className = 'custom-cursor-follower';
        this.follower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
            opacity: 0.5;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.follower);

        // Hide default cursor
        document.body.style.cursor = 'none';
    }

    handleMouseMove() {
        if (!this.cursor) return;

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';

            this.follower.style.left = e.clientX - 20 + 'px';
            this.follower.style.top = e.clientY - 20 + 'px';
        });
    }

    handleInteractiveElements() {
        if (!this.cursor) return;

        // Interactive elements for terminal design
        const interactiveSelectors = [
            'a', 'button', '.btn', '.nav-link', '.project-card',
            '.file-item', '.terminal-line',
            'input', 'textarea', '.form-input', '.skill-item'
        ];

        // Use event delegation for better performance and dynamic content
        document.addEventListener('mouseover', (e) => {
            const isInteractive = interactiveSelectors.some(selector => {
                return e.target.matches(selector) || e.target.closest(selector);
            });

            if (isInteractive) {
                this.cursor.style.transform = 'scale(2)';
                this.follower.style.transform = 'scale(1.5)';
                this.follower.style.opacity = '0.8';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const isInteractive = interactiveSelectors.some(selector => {
                return e.target.matches(selector) || e.target.closest(selector);
            });

            if (isInteractive) {
                this.cursor.style.transform = '';
                this.follower.style.transform = '';
                this.follower.style.opacity = '0.5';
            }
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeAnimations();
        this.lazyLoadImages();
        this.debounceScroll();
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency < 4 ||
                               navigator.deviceMemory < 4;

        if (isLowEndDevice) {
            document.body.classList.add('reduced-motion');

            // Add CSS for reduced motion
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    debounceScroll() {
        let ticking = false;

        const originalScrollHandler = window.onscroll;

        window.onscroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (originalScrollHandler) {
                        originalScrollHandler();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalManager();

    // Create global cursor instance
    window.customCursorInstance = new CustomCursor();

    new PerformanceOptimizer();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                z-index: 10000;
                transition: opacity 0.5s ease;
            }
            body.loaded::before {
                opacity: 0;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    });
});

// Console easter egg
console.log(`
🎨 Portfolio créé avec passion
💻 Développement: HTML5, CSS3, JavaScript
🎯 Design: Inspiré par Awwwards & Dribbble
✨ Animations: Optimisées pour la performance

Contactez-moi pour vos projets créatifs !
`);

// Add some interactive console commands
window.portfolioCommands = {
    showStats: () => {
        console.table({
            'Lines of Code': '~500',
            'CSS Animations': '15+',
            'JavaScript Classes': '6',
            'Performance Score': '95/100'
        });
    },

    theme: (color) => {
        if (color) {
            document.documentElement.style.setProperty('--primary-color', color);
            console.log(`✨ Thème changé vers: ${color}`);
        } else {
            console.log('Usage: portfolioCommands.theme("#yourcolor")');
        }
    },

    credits: () => {
        console.log(`
        🏆 Portfolio Florent Detres
        🎨 Design & Development
        💡 Inspiré par les meilleures créations
        📱 Responsive & Accessible
        `);
    }
};

console.log('💡 Tapez "portfolioCommands" pour voir les commandes disponibles !');