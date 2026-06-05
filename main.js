// NAVBAR SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// MOBILE MENU
document.getElementById('hbg').addEventListener('click', () => { 
    document.getElementById('mmenu').classList.add('open'); 
    document.body.style.overflow = 'hidden'; 
});
document.getElementById('mclose').addEventListener('click', closeM);
function closeM() { 
    document.getElementById('mmenu').classList.remove('open'); 
    document.body.style.overflow = ''; 
}

// HERO SLIDER
let slide = 0;
const slides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
function goSlide(n) { 
    slides[slide].classList.remove('active'); 
    if(heroDots[slide]) heroDots[slide].classList.remove('active'); 
    slide = n; 
    slides[slide].classList.add('active'); 
    if(heroDots[slide]) heroDots[slide].classList.add('active'); 
}
setInterval(() => goSlide((slide + 1) % slides.length), 5000);
window.goSlide = goSlide;

// INTERSECTION OBSERVER (UNIFICADO - para animaciones de scroll)
const animElements = document.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-scale, .stagger-children');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('on');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

animElements.forEach(el => scrollObserver.observe(el));

// CONTADORES ESTADÍSTICOS
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
    if(progressBar) progressBar.style.width = pct + '%'; 
});

// PARTICULAS
const container = document.getElementById('particles');
if(container) {
    for (let i = 0; i < 18; i++) { 
        const p = document.createElement('div'); 
        p.className = 'particle'; 
        const size = Math.random() * 3 + 1; 
        p.style.cssText = `left: ${Math.random() * 100}%; width: ${size}px; height: ${size}px; animation-duration: ${Math.random() * 20 + 15}s; animation-delay: ${Math.random() * -20}s; --drift: ${(Math.random() - 0.5) * 200}px; opacity: ${Math.random() * 0.5 + 0.1};`; 
        container.appendChild(p); 
    }
}

// TILT CARDS (efecto 3D)
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

// FORMULARIO
function handleFormSubmit(e) { 
    e.preventDefault(); 
    const btn = e.target.querySelector('.form-submit-btn'); 
    if(btn) {
        btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending…'; 
        btn.disabled = true; 
        setTimeout(() => { 
            const formWrap = document.getElementById('contactFormWrap');
            const successDiv = document.getElementById('formSuccess');
            if(formWrap) formWrap.style.display = 'none';
            if(successDiv) successDiv.classList.add('show'); 
        }, 1400);
    }
}

function animateCounter() {
  const counter = document.querySelector('.about-glass-num');
  if (!counter) return;
  
  const target = 10;
  const duration = 1000; // 2 segundos
  const step = target / (duration / 50); // Actualizar cada 50ms
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

// Trigger cuando el elemento es visible en pantalla
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar el badge
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.querySelector('.about-glass-badge');
  if (badge) {
    observer.observe(badge);
  }
});