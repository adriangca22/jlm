// ── SCROLL PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

// ── PARTICLES ──
(function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 4 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (Math.random() * 20 + 10) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    p.style.opacity = Math.random() * 0.4 + 0.1;
    container.appendChild(p);
  }
})();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// ── MOBILE MENU ──
const hamburger = document.getElementById('hbg');
const mobileMenu = document.getElementById('mmenu');
const closeBtn = document.getElementById('mclose');

hamburger.addEventListener('click', () => { 
  mobileMenu.classList.add('open'); 
  document.body.style.overflow = 'hidden'; 
});

closeBtn.addEventListener('click', closeM);

function closeM() { 
  mobileMenu.classList.remove('open'); 
  document.body.style.overflow = ''; 
}

// Cerrar menú al hacer click en un enlace (para móvil)
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeM);
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// HERO SLIDER
// FIX: guard against missing slides (if section uses video instead of slider, skip)
const slides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let slide = 0;

if (slides.length > 0) {
    function goSlide(n) { 
        slides[slide].classList.remove('active'); 
        if (heroDots[slide]) heroDots[slide].classList.remove('active'); 
        slide = n; 
        slides[slide].classList.add('active'); 
        if (heroDots[slide]) heroDots[slide].classList.add('active'); 
    }
    setInterval(() => goSlide((slide + 1) % slides.length), 5000);
    window.goSlide = goSlide;
}

// INTERSECTION OBSERVER — scroll animations (MEJORADO para stagger)
const animElements = document.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-scale, .stagger-children');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('on');
            
            // Para stagger-children, asegurar que TODOS los hijos sean visibles
            if (entry.target.classList.contains('stagger-children')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, index * 50); // 50ms entre cada item
                });
            }
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
animElements.forEach(el => scrollObserver.observe(el));

// STAT COUNTERS
const counters = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver((entries) => { 
    entries.forEach(e => { 
        if (!e.isIntersecting) return; 
        const el = e.target; 
        const target = +el.dataset.target; 
        const suffix = el.dataset.suffix || ''; 
        let cur = 0; 
        const step = target / 55; 
        const t = setInterval(() => { 
            cur = Math.min(cur + step, target); 
            el.textContent = Math.floor(cur) + suffix; 
            if (cur >= target) clearInterval(t); 
        }, 22); 
        counterObserver.unobserve(el); 
    }); 
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ACTIVE NAV LINKS
const secs = document.querySelectorAll('section[id]');
const nLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => { 
    let cur = ''; 
    secs.forEach(s => { 
        if (scrollY >= s.offsetTop - 120) cur = s.id; 
    }); 
    nLinks.forEach(a => { 
        const href = a.getAttribute('href'); 
        if (href === '#' + cur) {
            a.style.opacity = '1';
            a.style.fontWeight = '700';
        } else {
            a.style.opacity = '0.7';
            a.style.fontWeight = '500';
        }
    }); 
});

// PROGRESS BAR
window.addEventListener('scroll', () => { 
    const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100; 
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = pct + '%'; 
});

// PARTICLES — disabled via CSS, kept for compatibility
const container = document.getElementById('particles');
if (container) {
    for (let i = 0; i < 18; i++) { 
        const p = document.createElement('div'); 
        p.className = 'particle'; 
        const size = Math.random() * 3 + 1; 
        p.style.cssText = `left: ${Math.random() * 100}%; width: ${size}px; height: ${size}px; animation-duration: ${Math.random() * 20 + 15}s; animation-delay: ${Math.random() * -20}s; --drift: ${(Math.random() - 0.5) * 200}px; opacity: ${Math.random() * 0.5 + 0.1};`; 
        container.appendChild(p); 
    }
}

// TILT CARDS (3D hover)
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => { 
        const rect = card.getBoundingClientRect(); 
        const x = (e.clientX - rect.left) / rect.width - 0.5; 
        const y = (e.clientY - rect.top) / rect.height - 0.5; 
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`; 
    });
    card.addEventListener('mouseleave', () => { 
        card.style.transform = ''; 
    });
});


// ABOUT COUNTER ANIMATION
function animateCounter() {
    const counter = document.querySelector('.about-glass-num');
    if (!counter) return;

    const target = 10;
    const duration = 1000;
    const step = target / (duration / 50);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            counter.classList.add('animate');
            setTimeout(updateCounter, 50);
        } else {
            counter.textContent = target;
            counter.classList.remove('animate');
        }
    };

    updateCounter();
}

// Trigger about counter when badge enters viewport
document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.about-glass-badge');
    if (badge) {
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    badgeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5, rootMargin: '0px' });
        badgeObserver.observe(badge);
    }
});
// ✅ Destacar la tarjeta CENTRAL del carrusel del portfolio
function highlightCenterPortfolioCard() {
  const wrap = document.querySelector('.port-carousel-wrap');
  const cards = document.querySelectorAll('.port-card');
  
  if (!wrap || cards.length === 0) return;
  
  const wrapRect = wrap.getBoundingClientRect();
  const viewportCenter = wrapRect.left + wrapRect.width / 2;
  
  let closestCard = null;
  let closestDistance = Infinity;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(viewportCenter - cardCenter);
    
    if (rect.right > wrapRect.left && rect.left < wrapRect.right) {
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    }
  });
  
  cards.forEach(card => card.classList.remove('is-center'));
  if (closestCard) closestCard.classList.add('is-center');
}

function runPortfolioHighlight() {
  highlightCenterPortfolioCard();
  requestAnimationFrame(runPortfolioHighlight);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(runPortfolioHighlight, 100);
});

window.addEventListener('resize', highlightCenterPortfolioCard);