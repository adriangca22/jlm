const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));
document.getElementById('hbg').addEventListener('click', () => { document.getElementById('mmenu').classList.add('open'); document.body.style.overflow = 'hidden'; });
document.getElementById('mclose').addEventListener('click', closeM);
function closeM() { document.getElementById('mmenu').classList.remove('open'); document.body.style.overflow = ''; }

let slide = 0;
const slides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
function goSlide(n) { slides[slide].classList.remove('active'); heroDots[slide].classList.remove('active'); slide = n; slides[slide].classList.add('active'); heroDots[slide].classList.add('active'); }
setInterval(() => goSlide((slide + 1) % slides.length), 5000);

const anims = document.querySelectorAll('.anim-up,.anim-left,.anim-right,.anim-scale,.stagger-children');
const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }); }, { threshold: 0.1 });
anims.forEach(el => io.observe(el));

const counters = document.querySelectorAll('.stat-num[data-target]');
const cio = new IntersectionObserver(entries => { entries.forEach(e => { if (!e.isIntersecting) return; const el = e.target; const target = +el.dataset.target; const suffix = el.dataset.suffix || ''; let cur = 0; const step = target / 55; const t = setInterval(() => { cur = Math.min(cur + step, target); el.textContent = Math.floor(cur) + suffix; if (cur >= target) clearInterval(t); }, 22); cio.unobserve(el); }); }, { threshold: 0.5 });
counters.forEach(el => cio.observe(el));

const secs = document.querySelectorAll('section[id]');
const nLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => { let cur = ''; secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; }); nLinks.forEach(a => { const href = a.getAttribute('href'); a.style.opacity = href === '#' + cur ? '1' : ''; }); });

window.addEventListener('scroll', () => { const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100; document.getElementById('progressBar').style.width = pct + '%'; });

const container = document.getElementById('particles');
for (let i = 0; i < 18; i++) { const p = document.createElement('div'); p.className = 'particle'; const size = Math.random() * 3 + 1; p.style.cssText = `left: ${Math.random() * 100}%; width: ${size}px; height: ${size}px; animation-duration: ${Math.random() * 20 + 15}s; animation-delay: ${Math.random() * -20}s; --drift: ${(Math.random() - 0.5) * 200}px; opacity: ${Math.random() * 0.5 + 0.1};`; container.appendChild(p); }

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => { const rect = card.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`; });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

function handleFormSubmit(e) { e.preventDefault(); const btn = e.target.querySelector('.form-submit-btn'); btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending…'; btn.disabled = true; setTimeout(() => { document.getElementById('contactForm').style.display = 'none'; document.querySelector('.form-contact-links').style.display = 'none'; document.getElementById('formSuccess').classList.add('show'); }, 1400); }