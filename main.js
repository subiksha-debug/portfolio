/* ===========================
   PORTFOLIO — main.js
   =========================== */

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on hoverable elements
document.querySelectorAll('a, button, .project-card, .tech-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.opacity = '0.5';
  });
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '0.5';
});


// --- Nav: Scroll Effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});


// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children reveals inside sections
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  revealObserver.observe(el);
});

// Stagger children in grids
document.querySelectorAll('.projects-grid .project-card, .skills-grid .skill-category, .tech-tags .tech-tag').forEach((el, i) => {
  el.dataset.delay = i;
});


// --- Skill Bars Animation ---
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const width = bar.dataset.width + '%';
        setTimeout(() => { bar.style.width = width; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});


// --- Counter Animation ---
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.counter-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) counterObserver.observe(heroSection);


// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));


// --- Smooth Scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// --- Contact Form ---
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    formStatus.textContent = '⚠ Please fill in all required fields.';
    formStatus.style.color = '#ff6b6b';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = '⚠ Please enter a valid email address.';
    formStatus.style.color = '#ff6b6b';
    return;
  }

  // Simulate sending (replace with your backend/EmailJS/Formspree)
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  submitBtn.disabled = true;

  await new Promise(r => setTimeout(r, 1500));

  formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
  formStatus.style.color = 'var(--accent)';
  submitBtn.textContent = 'Send Message →';
  submitBtn.style.opacity = '1';
  submitBtn.disabled = false;
  form.reset();

  setTimeout(() => { formStatus.textContent = ''; }, 5000);
});


// --- Tilt Effect on Project Cards ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 5;
    const rotX = -((y - cy) / cy) * 5;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// --- Typing Effect on Hero Eyebrow ---
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const originalText = eyebrow.textContent;
  eyebrow.textContent = '';
  let i = 0;
  setTimeout(() => {
    eyebrow.classList.add('visible');
    const typeTimer = setInterval(() => {
      eyebrow.textContent += originalText[i];
      i++;
      if (i >= originalText.length) clearInterval(typeTimer);
    }, 40);
  }, 300);
}
