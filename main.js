// Portfolio Website JavaScript - Main Functionality
// Author: Mamoun Hicham
// Description: Interactive animations and functionality for civil engineering portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initScrollAnimations();
    initTypedText();
    initGeometricBackground();
    initProjectFilters();
    initProjectModals();
    initSkillInteractions();
    initTimelineAnimations();
    initNavigation();
    initContactForm();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});



// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add stagger delay for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 100}ms`;
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// Typed text animation for hero section
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Bâtisseur d\'Infrastructures Durables',
                'Spécialiste en Ouvrages Hydrauliques',
                'Passionné par l\'Ingénierie Durable',
                'Futur Expert en Gestion de l\'Eau'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Geometric background animation using p5.js
function initGeometricBackground() {
    const canvas = document.getElementById('geometric-canvas');
    if (!canvas) return;

    new p5((p) => {
        let particles = [];
        let connections = [];
        let time = 0;

        p.setup = function() {
            const canvasContainer = canvas.getBoundingClientRect();
            p.createCanvas(canvasContainer.width, canvasContainer.height, canvas);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6)
                });
            }
        };

        p.draw = function() {
            p.clear();
            time += 0.01;

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx + Math.sin(time + i) * 0.2;
                particle.y += particle.vy + Math.cos(time + i) * 0.2;

                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;

                // Draw particle
                p.fill(255, 255, 255, 100);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    if (dist < 100) {
                        const alpha = p.map(dist, 0, 100, 50, 0);
                        p.stroke(255, 255, 255, alpha);
                        p.strokeWeight(1);
                        p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                    }
                }
            }
        };

        p.windowResized = function() {
            const canvasContainer = canvas.getBoundingClientRect();
            p.resizeCanvas(canvasContainer.width, canvasContainer.height);
        };
    });
}

// Project filter functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        scale: [0.9, 1],
                        duration: 600,
                        delay: index * 100,
                        easing: 'easeOutQuart'
                    });
                    card.style.display = 'block';
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        translateY: -30,
                        scale: 0.9,
                        duration: 300,
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Project modal functionality
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTools = document.getElementById('modal-tools');
    const modalResults = document.getElementById('modal-results');
    const closeModal = document.getElementById('close-modal');

    // Project data
    const projectData = {
        'dam-design': {
            title: 'Conception de Barrage en Béton Gravité',
            image: 'resources/hero-hydraulic-engineering.jpg',
            description: 'Conception complète d\'un barrage en béton gravité sur le Oued Kebir. Le projet inclut l\'analyse hydraulique complète, l\'étude de stabilité sous différentes conditions de charge, la modélisation des écoulements et l\'optimisation du profil du barrage pour minimiser les contraintes et maximiser l\'efficacité de rétention.',
            tools: ['AutoCAD', 'EPANET', 'Civil 3D', 'SAP2000'],
            results: [
                'Réduction de 20% des contraintes de cisaillement',
                'Capacité de rétention : 15 millions m³',
                'Conformité aux normes Eurocode 7',
                'Étude d\'impact environnemental validée'
            ]
        },
        'water-network': {
            title: 'Réseau de Distribution d\'Eau Potable',
            image: 'resources/water-network-design.jpg',
            description: 'Modélisation et optimisation complète du réseau de distribution d\'eau potable pour une ville de 50,000 habitants. Le projet comprend l\'analyse hydraulique, l\'optimisation des diamètres de conduites, la localisation des points de puisage et l\'intégration de systèmes de stockage pour garantir une pression constante.',
            tools: ['EPANET', 'GIS', 'AutoCAD', 'Excel'],
            results: [
                'Pression constante : 3-5 bars sur tout le réseau',
                'Réduction des pertes de charge de 25%',
                'Optimisation économique : 15% d\'économie',
                'Scénarios de demande pour 2035 intégrés'
            ]
        },
        'treatment-plant': {
            title: 'Station d\'Épuration Biologique',
            image: 'resources/water-treatment-plant.jpg',
            description: 'Conception d\'une station d\'épuration biologique avec traitement avancé pour 30,000 habitants. Le processus inclut le traitement primaire, secondaire biologique avec boues activées, et un traitement tertiaire pour l\'élimination des nutriments. Intégration de la récupération d\'énergie à partir du biogaz.',
            tools: ['Civil 3D', 'SWMM', 'BIM', 'Excel'],
            results: [
                'Qualité d\'effluent conforme aux normes',
                'Production d\'énergie : 150 MWh/an',
                'Réduction des émissions CO₂ de 40%',
                'Coût d\'exploitation optimisé de 20%'
            ]
        }
    };

    // Open modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                modalTitle.textContent = project.title;
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalDescription.textContent = project.description;

                // Populate tools
                modalTools.innerHTML = '';
                project.tools.forEach(tool => {
                    const toolElement = document.createElement('span');
                    toolElement.className = 'bg-steel-blue text-white px-3 py-1 rounded-full text-sm font-medium';
                    toolElement.textContent = tool;
                    modalTools.appendChild(toolElement);
                });

                // Populate results
                modalResults.innerHTML = '';
                project.results.forEach(result => {
                    const resultElement = document.createElement('li');
                    resultElement.textContent = result;
                    modalResults.appendChild(resultElement);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });
}

// Skills page interactions
function initSkillInteractions() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillItems = document.querySelectorAll('.skill-item');
    const skillDetails = document.querySelectorAll('.skill-detail');

    // Category hover effects
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        category.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Skill item interactions
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skillId = this.getAttribute('data-skill');
            
            // Hide all skill details
            skillDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // Show selected skill detail
            const targetDetail = document.getElementById(skillId + '-detail');
            if (targetDetail) {
                targetDetail.classList.add('active');
            }

            // Update skill visualization
            updateSkillVisualization(skillId);
        });
    });

    // Initialize skill chart
    initSkillChart();
}

// Skill visualization chart
function initSkillChart() {
    const chartContainer = document.getElementById('skill-chart');
    if (!chartContainer) return;

    const chart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}%'
        },
        series: [
            {
                name: 'Compétences',
                type: 'graph',
                layout: 'force',
                data: [
                    { name: 'AutoCAD', value: 90, category: 0 },
                    { name: 'EPANET', value: 85, category: 1 },
                    { name: 'Civil 3D', value: 80, category: 0 },
                    { name: 'SWMM', value: 75, category: 1 },
                    { name: 'HEC-RAS', value: 70, category: 1 },
                    { name: 'BIM', value: 85, category: 0 },
                    { name: 'GIS', value: 65, category: 1 }
                ],
                links: [
                    { source: 'AutoCAD', target: 'Civil 3D' },
                    { source: 'EPANET', target: 'SWMM' },
                    { source: 'BIM', target: 'AutoCAD' },
                    { source: 'HEC-RAS', target: 'EPANET' }
                ],
                categories: [
                    { name: 'Conception' },
                    { name: 'Hydraulique' }
                ],
                roam: true,
                force: {
                    repulsion: 100,
                    gravity: 0.1,
                    edgeLength: 50
                },
                itemStyle: {
                    color: function(params) {
                        const colors = ['#E67E22', '#4A90E2', '#10B981', '#8B5CF6'];
                        return colors[params.data.category];
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    fontSize: 12,
                    color: '#1E3D59'
                }
            }
        ]
    };

    chart.setOption(option);

    // Resize chart on window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Update skill visualization
function updateSkillVisualization(skillId) {
    // This function can be expanded to show specific visualizations for each skill
    console.log('Updating visualization for skill:', skillId);
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    // Active navigation highlighting
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateActiveNav();

    // Mobile menu toggle (if implemented)
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Mobile menu implementation
            console.log('Mobile menu toggled');
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const message = formData.get('message') || this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Message envoyé avec succès !', 'success');
            this.reset();
        });
    }

    // CV download buttons
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('CV') || button.textContent.includes('cv')) {
            button.addEventListener('click', function() {
                showNotification('Téléchargement du CV...', 'info');
                // Simulate CV download
                setTimeout(() => {
                    showNotification('CV téléchargé avec succès !', 'success');
                }, 1500);
            });
        }
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    // Set colors based on type
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance optimizations
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
optimizeAnimations();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality works
});


// Export functions for potential external use
window.PortfolioJS = {
    showNotification,
    updateSkillVisualization,
    initSkillChart
};